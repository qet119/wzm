"use client";
import { post as httpPost, get as httpGet } from "../api/fetch";
import { createContext, ReactNode, useContext, useEffect } from "react";

import { encrypt_aes, encrypt_aes_to_hex } from "@/lib/crypto";
import useAppContext from "./provider.app";
import { Result } from "base";

type RequestMethod = {
  post: (data: any, url: string) => void;
  get: (data: any, url: string) => void;
  actionWrap: <T,D={}>(
    action: (data: any, idCard?: string) => Promise<Result<T>>,
    data: D
  ) => Promise<Result<T>>;
};

const FetchContext = createContext<RequestMethod | null>(null);

//为需要身份证的action或者接口
export const FetchProvider = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useAppContext();

  useEffect(() => {}, []);

  async function actionWrap<T>(
    action: (data: any, idCard?: string) => Promise<Result<T>>,
    data: any
  ) {
    return await action(data, userInfo?.idCardNo);
  }

  const post = () => {
    return async (data: any, url: string) => {
      const secret = encrypt_aes_to_hex(
        userInfo?.idCardNo!,
        process.env.NEXT_PUBLIC_UPLOAD_AES_KEY!
      );
      return await httpPost(data, url, secret);
    };
  };
  const get = () => {
    return async (data: any, url: string) => {
      const secret = encrypt_aes_to_hex(
        userInfo?.idCardNo!,
        process.env.NEXT_PUBLIC_UPLOAD_AES_KEY!
      );
      return await httpGet(data, url, secret);
    };
  };

  return (
    <FetchContext.Provider value={{ post: post(), get: get(), actionWrap }}>
      {children}
    </FetchContext.Provider>
  );
};

export default function useRequestMethodContext(): RequestMethod {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error("useFetchContext must be used within a FetchProvider");
  }
  return context;
}
