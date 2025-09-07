import { google, oauth2_v2 } from "googleapis";

import { randomBytes } from "crypto";

import { logger } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { GCP_ID, GCP_REDIRECT, GCP_SECRET } from "../config/variables";

import { redisClient } from "../config/cache";

type providers = "google" | "facebook" | "github" | "linkedin";

interface googleCredentials {
    userData: oauth2_v2.Schema$Userinfo;
    token: {
        client_id: string;
        project_id: string;
        expiry_date: number;
        refresh_token: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_secret: string;
        redirect_uris: string[];
        javascript_origins: string[];
    };
}

interface facebookCredentials {
    userData: any;
    token: {
        client_id: string;
        client_secret: string;
        redirect_uris: string[];
        javascript_origins: string[];
        auth_uri: string;
        expiry_date: number;
        refresh_token: string;
    };
}

type providerCredentialMap = {
    google: googleCredentials;
    facebook: facebookCredentials;
    github: Error;
    linkedin: Error;
};

interface IOAuthProviderStrategy<P extends providers> {
    getUrl(): Promise<string | Error>;
    getToken(code: string): Promise<providerCredentialMap[P] | Error>;
    refreshToken(refreshToken: string): Promise<providerCredentialMap[P] | Error>;
}

class GoogleOAuthProvider implements IOAuthProviderStrategy<"google"> {
    private readonly scopes = ["openid", "email", "profile"];
    private readonly state = randomBytes(32).toString("hex");
    private readonly oauth2Client = new google.auth.OAuth2(GCP_ID, GCP_SECRET, GCP_REDIRECT);

    constructor() {}

    async getUrl(): Promise<string | Error> {
        try {
            const authorizationUrl = this.oauth2Client.generateAuthUrl({
                // 'online' (default) or 'offline' (gets refresh_token)
                access_type: "offline",
                prompt: "consent",
                /** Pass in the scopes array defined above.
                 * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
                scope: this.scopes,
                // Enable incremental authorization. Recommended as a best practice.
                include_granted_scopes: true,
                // Include the state parameter to reduce the risk of CSRF attacks.
                state: `auth_state_${this.state}`,
            });

            await redisClient.set(`auth_state_${this.state}`, "valid", "EX", 60);

            return authorizationUrl;
        } catch (error) {
            logger().error("Error generating OAuth URL:", error);

            throw new InternalServerError("Error generating OAuth URL");
        }
    }

    async getToken(code: string): Promise<providerCredentialMap["google"] | Error> {
        try {
            const { tokens } = await this.oauth2Client.getToken(code);

            this.oauth2Client.setCredentials(tokens);

            const oauth2 = google.oauth2({
                auth: this.oauth2Client,
                version: "v2",
            });

            const { data } = await oauth2.userinfo.get();

            return {
                userData: data,
                token: { ...(tokens as googleCredentials["token"]) },
            };
        } catch (error) {
            logger().error("Error retrieving access token:", error);

            return error;
        }
    }

    async refreshToken(refreshToken: string): Promise<providerCredentialMap["google"] | Error> {
        try {
            this.oauth2Client.setCredentials({ refresh_token: refreshToken });

            const { credentials } = await this.oauth2Client.refreshAccessToken();

            this.oauth2Client.setCredentials(credentials);

            const oauth2 = google.oauth2({
                auth: this.oauth2Client,
                version: "v2",
            });

            const { data } = await oauth2.userinfo.get();

            return {
                userData: { ...data },
                token: { ...(credentials as googleCredentials["token"]) },
            };
        } catch (error) {
            logger().error("Error refreshing access token:", error);

            return error;
        }
    }
}

// class FacebookOAuthProvider implements OAuthProvider {};

export class OAuthService<P extends providers> {
    private provider: IOAuthProviderStrategy<P>;

    constructor(provider: providers) {
        if (provider === "google") {
            this.provider = new GoogleOAuthProvider() as IOAuthProviderStrategy<P>;

            return;
        }

        if (provider === "linkedin") throw new Error("Linkedin OAuth not implemented");

        if (provider === "facebook") {
            throw new Error("Facebook OAuth not implemented");
        }

        if (provider === "github") throw new Error("Github OAuth not implemented");
    }

    async getUrl(): Promise<string | Error> {
        return await this.provider.getUrl();
    }

    async getToken(code: string): Promise<providerCredentialMap[P] | Error> {
        return await this.provider.getToken(code);
    }

    async refreshToken(refreshToken: string): Promise<providerCredentialMap[P] | Error> {
        return await this.provider.refreshToken(refreshToken);
    }
}
