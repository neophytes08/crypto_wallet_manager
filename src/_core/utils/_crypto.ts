import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.CRYPTO_ENCRYPTION_KEY;
const iv = crypto.randomBytes(16);

interface Hash {
  iv: string;
  content: string;
}

const encrypt = (text: string): Hash => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

const decrypt = (hash: Hash): string => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex'),
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

export { encrypt, decrypt };
