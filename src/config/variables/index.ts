import { config } from "dotenv";

config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_SECRET = process.env.JWT_SECRET;
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const AUTORIZED_ORIGINS = ["http://localhost:3000", "http://localhost:4000", "http://localhost:5173"];

export const REDIS_URI = process.env.REDIS_URI;

export const DB_URL = process.env.DB_URL;
export const DB_TYPE = process.env.DB_TYPE;

export const S3_URL = process.env.S3_URL;
export const S3_REGION = process.env.S3_REGION;
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
