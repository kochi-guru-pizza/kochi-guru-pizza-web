import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command
} from "@aws-sdk/client-s3";
import MenuItem, { IMenuItem } from "../models/MenuItem";
import config from "../config";
import dotenv from "dotenv";

dotenv.config();

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${config.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: config.R2_ACCESS_KEY_ID,
    secretAccessKey: config.R2_SECRET_ACCESS_KEY
  }
});

const BUCKET_NAME = config.R2_BUCKET_NAME;
const PUBLIC_DOMAIN = config.R2_PUBLIC_DOMAIN;

export const uploadToR2 = async (file: Express.Multer.File) => {
  const now = new Date();
  const slTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const timestamp = slTime
    .toISOString()
    .replace(/T/, "_")
    .replace(/\..+/, "")
    .replace(/[-:]/g, "");
  const extension = file.originalname.split(".").pop();
  const fileName = `uploads/menu_image_${timestamp}.${extension}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    })
  );

  return `${PUBLIC_DOMAIN}/${fileName}`;
};

export const deleteFromR2 = async (url: string) => {
  const key = url.replace(`${PUBLIC_DOMAIN}/`, "");

  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    })
  );

  return { success: true };
};

export const reconcileStorage = async (dryRun: boolean = false) => {
  const listedObjects = await r2Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET_NAME
    })
  );

  const bucketKeys = (
    listedObjects.Contents?.map((obj) => obj.Key) || []
  ).filter((key): key is string => !!key);
  const menuItems = (await MenuItem.find()) as IMenuItem[];

  const activeImages = new Set<string>();
  menuItems.forEach((item: IMenuItem) => {
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach((imgUrl) => {
        const key = imgUrl.replace(`${PUBLIC_DOMAIN}/`, "");
        activeImages.add(key);
      });
    }
  });

  const orphanedKeys = bucketKeys.filter((key) => !activeImages.has(key));
  const deletedCount: string[] = [];

  if (!dryRun) {
    for (const key of orphanedKeys) {
      if (!key) continue;
      await r2Client.send(
        new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key
        })
      );
      deletedCount.push(key);
    }
  }

  return {
    orphanedCount: orphanedKeys.length,
    deletedCount: deletedCount.length,
    orphanedFiles: dryRun ? orphanedKeys : deletedCount,
    dryRun
  };
};
