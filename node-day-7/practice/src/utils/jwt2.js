const crypto = require("crypto");

const toBase64URL = (obj) => {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
};

const sign = (payload, secret) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  
  const base64Header = toBase64URL(header);
  const base64Payload = toBase64URL(payload);

  const dataToSign = `${base64Header}.${base64Payload}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(dataToSign)
    .digest("base64url");

  const token = `${dataToSign}.${signature}`;

  return token;
};

const verify = (accessToken, secret) => {
  if (!accessToken || typeof accessToken !== "string") {
    throw new Error("invalid token format");
  }

  const parts = accessToken.split(".");
  if (parts.length !== 3) {
    throw new Error("invalid token format");
  }

  const [headerBase64, payloadBase64, originalSignature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${headerBase64}.${payloadBase64}`)
    .digest("base64url");

  const bufferOriginal = Buffer.from(originalSignature);
  const bufferExpected = Buffer.from(expectedSignature);

  if (
    bufferOriginal.length !== bufferExpected.length ||
    !crypto.timingSafeEqual(bufferOriginal, bufferExpected)
  ) {
    throw new Error("invalid signature");
  }

  let payload;
  try {
    const decodedStr = Buffer.from(payloadBase64, "base64url").toString(
      "utf-8",
    );
    payload = JSON.parse(decodedStr);
  } catch (err) {
    throw new Error("invalid token payload");
  }

  if (payload.exp && payload.exp < Date.now() / 1000) {
    throw new Error("jwt expired");
  }

  return payload;
};

module.exports = { sign, verify };
