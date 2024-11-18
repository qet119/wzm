"use client";
import { TabType } from "@/components/tab";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "@/nativ_interface/api";
import { UserInfo } from "@/entity/entity.userinfo";
import { DialogComponent, useDialogContext } from "ui";
import Script from "next/script";

type GlobalState = {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  userInfo?: UserInfo;
};

const AppContext = createContext<GlobalState | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.HOME);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { showDialog, hideDialog } = useDialogContext();
  const [mchildren, setMChildren] = useState<ReactNode>(<></>);

  useEffect(() => {
  }, []);

  return (
    <AppContext.Provider value={{ currentTab, setCurrentTab, userInfo }}>
      <Script
        src="/dsbridge.js"
        // strategy="lazyOnload"
        onReady={() => {
          async function exec() {
            await API.setTitle("首页");

            // const result = await API.userInfo();

            const result: any = {
              code: "0000",
              data: {
                authToken: "e2a39fe9a0d34eabb7c45e7240ef6a33",
                headImg:
                  "https://file.mylyg.net/header/5745ed45b27e4d6bb63c329a71b0510c.jpg",
                idCardNo: "320281199304161298",
                nickName: "用户0106",
                phoneNo: "15161600106",
                socialSecurityCardNo: "1072362470",
                userId: "13687838",
                userRealName: "谢星宇",
              },
              msg: "请求成功",
            };
            if (!result || result.code !== "0000") {
              //宿主没登录成功
              showDialog(DialogComponent, {
                title: "提示",
                children: result.msg,
                width: "65%",
                closable: false,
                okText: "确定",
                onOk: () => {
                  hideDialog();
                  API.close();
                },
              });
              return;
            }

            // prompt('请复制以下内容:', JSON.stringify(result));

            const a = await API.setOnBackClickListener();

            window?.dsBridge?.register(
              "onBackClickListener",
              function (r: boolean) {
                if (location.pathname === "/wzm/home") {
                  API.close();
                } else {
                  // history.go(-1)
                  history.back();
                  // router.back()
                }
                console.log("返回键监听事件：：" + r);
                return r;
              }
            );

            
            //通过登录
            // setIsLogin(true);
            setUserInfo(result.data);

            // setMChildren(children)
          }
          exec();
        }}
      />
      {
        //未登录则白屏
        //   isLogin?<div
        //   id="app"
        //   style={{ height: "100vh", width: "100vw", overflowX: "hidden"}}>
        //   {children}
        // </div>:<></>
        <div
          id="app"
          style={{ height: "100vh", width: "100vw", overflowX: "hidden" }}
        >
          {children}
        </div>
      }
    </AppContext.Provider>
  );
};

export default function useAppContext(): GlobalState {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
