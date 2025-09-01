import { google, oauth2_v2 } from "googleapis";

import { randomBytes } from "crypto";

import { logger } from "@tsed/di";

import { GCP_ID, GCP_REDIRECT, GCP_SECRET } from "../config/variables";

const oauth2Client = new google.auth.OAuth2(GCP_ID, GCP_SECRET, GCP_REDIRECT);

export const oAuthGetUrl = async (): Promise<string | Error> => {
    try {
        const scopes = ["openid", "email", "profile"];

        const state = randomBytes(32).toString("hex");

        // Generate a url that asks permissions the scope mentioned.
        const authorizationUrl = oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: "offline",
            prompt: "consnet",
            /** Pass in the scopes array defined above.
             * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
            scope: scopes,
            // Enable incremental authorization. Recommended as a best practice.
            include_granted_scopes: true,
            // Include the state parameter to reduce the risk of CSRF attacks.
            state: state,
        });

        return authorizationUrl;
    } catch (error) {
        logger().error("Error generating OAuth URL:", error);

        return error;
    }
};

export const oAuthGetToken = async (code: string): Promise<oauth2_v2.Schema$Userinfo | Error> => {
    try {
        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: "v2",
        });

        const { data } = await oauth2.userinfo.get();

        return data;
    } catch (error) {
        logger().error("Error retrieving access token:", error);

        return error;
    }
};

export const oAuthRefreshToken = async (refreshToken: string): Promise<oauth2_v2.Schema$Userinfo | Error> => {
    try {
        oauth2Client.setCredentials({ refresh_token: refreshToken });

        const { credentials } = await oauth2Client.refreshAccessToken();

        oauth2Client.setCredentials(credentials);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: "v2",
        });

        const { data } = await oauth2.userinfo.get();

        return data;
    } catch (error) {
        logger().error("Error refreshing access token:", error);

        return error;
    }
};
