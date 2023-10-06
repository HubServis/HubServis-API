import uploader from "express-fileupload";

import { S3Client, S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

interface IBucketConfig {
  BucketName: string;
  Key: string;
  ACL: string;
}

const accessKeyID = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const Bucket = process.env.AWS_BUCKET_NAME;

export class ImageUploaderConnector {
  parameters: IBucketConfig;

  constructor() {}

  public async execute(file: any) {
    new Upload({
      client: new S3Client({
        credentials: {
          accessKeyID,
          secretAccessKey
        },
        region,
      }),
      params: {
        ACL: "public-read",
        Bucket,
        Key: `${Date.now().toString()}-${file}`,
        Body: file,
      },
	  tags: [],
	  queueSize: 4,
	  partSize: 1024 * 1024 * 5,
	  leavePartsOnError: false
    });
  }
}
