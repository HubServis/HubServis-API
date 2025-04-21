import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";

import { config } from "dotenv";

config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.REGION;

const s3 = new S3({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

export const upload = async (imageName, base64Image, type) => {
  const params = {
    Bucket: `${BUCKET_NAME}`,
    Key: imageName,
    Body: Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64",
    ),
    ContentType: type,
  };

  try {
    const result = await new Upload({
      client: s3,
      params,
    }).done();

    return result;
  } catch (err) {
    return new Error(`Error With Upload Images to S3: ${err}`);
  }
};
