import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export function createMediaStorage(config) {
  if (!config.r2) return null;
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: config.r2.accessKeyId, secretAccessKey: config.r2.secretAccessKey },
  });
  const keyFor = name => [config.r2.prefix, name].filter(Boolean).join("/");
  return {
    async upload(name, body, contentType = "image/webp") {
      const key = keyFor(name);
      await client.send(new PutObjectCommand({ Bucket: config.r2.bucket, Key: key, Body: body, ContentType: contentType, CacheControl: "public, max-age=31536000, immutable" }));
      return config.r2.publicOrigin + "/" + key;
    },
    async remove(name) {
      await client.send(new DeleteObjectCommand({ Bucket: config.r2.bucket, Key: keyFor(name) }));
    },
  };
}
