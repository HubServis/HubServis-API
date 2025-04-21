namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        NODE_ENV: "production" | "development";
        JWT_SECRET: string;
        COOKIE_DOMAIN: string;
        SESSION_SECRET: string | CipherKey | CipherKey[];
        AUTHORIZED_ORIGINS: string[];

        REDIS_URI: string;

        DB_URL: string;
        DB_TYPE: string;

        S3_URL: string;
        S3_REGION: string;
        S3_ACCESS_KEY: string;
        S3_SECRET_KEY: string;
        S3_BUCKET_NAME: string;
    }
}
