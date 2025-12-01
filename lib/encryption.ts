import crypto from "crypto";

const KEY = Buffer.from(process.env.SALES_ENCRYPT_KEY!, "base64");

export const encrypt = (obj: any): string => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const data = Buffer.from(JSON.stringify(obj), "utf8");
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
};
