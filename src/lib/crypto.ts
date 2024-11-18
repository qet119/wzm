import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

export function encrypt_aes_to_hex(data: string, key: string): string {
  const encrypted = AES.encrypt(data, key);
  const words = encrypted.ciphertext.words;
  const bytes = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    for (let j = 3; j >= 0; --j) {
      bytes.push((word >> (8 * j)) & 0xff);
    }
  }

  const hexString = bytes
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hexString;
}

export function encrypt_aes(data: string, key: string) {
//   const result = AES.encrypt(data, key).toString(CryptoJS.format.Hex);
//   alert(result);

//   var bytes = CryptoJS.AES.decrypt(
//     { ciphertext: CryptoJS.enc.Hex.parse(result) },
//     key,
//     { format: CryptoJS.format.Hex }
//   );
//   var plaintext = bytes.toString();
//   alert(plaintext);

var newKey = CryptoJS.enc.Utf8.parse(key);

        var plaintText = data; 
        //encrypt
        var encryptedData = CryptoJS.AES.encrypt(plaintText, newKey, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });

        var encryptedDataHexStr = encryptedData.toString(CryptoJS.format.Hex);


  return encryptedDataHexStr;
}
