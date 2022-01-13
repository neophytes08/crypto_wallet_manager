import { generateKeyPairSync, publicEncrypt, privateDecrypt } from 'crypto';

const passphrase = process.env.RSA_PASS_PHRASE || '';

const generateKeyPair = () => {
  return generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: passphrase,
    },
  });
};

const enc = (pubKey: string, data: any) => {
  const toSlice = JSON.stringify(data).match(/.{1,400}/g);
  const encDiced = [];
  for (let index = 0; index < toSlice.length; index++) {
    encDiced.push(_pubEncryption(pubKey, toSlice[index]));
  }
  return _toBase64(encDiced);
};

const dec = (pubKey: string, data: any) => {
  const dec = [];
  const fromB64 = _fromBase64(data);
  for (let index = 0; index < fromB64.length; index++) {
    const e = fromB64[index];
    dec.push(
      Buffer.from(_privateDecryption(pubKey, e), 'base64').toString('binary'),
    );
  }
  return JSON.parse(dec.join(''));
};

const _pubEncryption = (pubKey: string, data) => {
  return publicEncrypt(pubKey, Buffer.from(data));
};

const _privateDecryption = (pubKey: string, data: any) => {
  return privateDecrypt(
    { key: pubKey, passphrase: passphrase },
    Buffer.from(data),
  ).toString('base64');
};

const _toBase64 = (data) => {
  return Buffer.from(JSON.stringify(data)).toString('base64');
};

const _fromBase64 = (data) => {
  return JSON.parse(Buffer.from(data, 'base64').toString('binary'));
};

export { generateKeyPair, enc, dec };
