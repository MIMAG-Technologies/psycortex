import CryptoJS from "crypto-js";

// Encrypt function
export const encrypt = (data, key) => {
  // Ensure data is a string before encryption
  const stringData = typeof data === "string" ? data : JSON.stringify(data);
  const ciphertext = CryptoJS.AES.encrypt(stringData, key).toString();
  return ciphertext;
};

// Decrypt function
export const decrypt = (ciphertext, key) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
