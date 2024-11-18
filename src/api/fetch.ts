import { encrypt_aes } from "@/lib/crypto";

export const post = async (url: string,data: any, secret?:string) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      // authorization: localStorage[StorageKey.ACCESS_TOKEN],
      secret:secret?encrypt_aes(
        secret!,
        process.env.NEXT_PUBLIC_UPLOAD_AES_KEY!
      ):"",
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return result;
};

export const get = async (url: string,data: any, secret?:string) => {
  const params  =  new  URLSearchParams(data)
  url= `${process.env.NEXT_PUBLIC_API_HOST}${url}?${params}`

  const result = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      // secret: secret?encrypt_aes(
      //   secret!,
      //   process.env.NEXT_PUBLIC_UPLOAD_AES_KEY!
      // ):"",
      // authorization: localStorage[StorageKey.ACCESS_TOKEN],
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return result;
};
