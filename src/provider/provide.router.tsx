"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  ReactNode,
} from "react";

export type RouterContextType = {
  getRouter:  AppRouterInstance;
};

const RouterContext = createContext<RouterContextType|null>(null);
/**
 * 全局注入的dialog
 * @param param0 
 * @returns 
 */
export const RouterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const router = useRouter()

  const getRouter = ()=>router


  return (
    <RouterContext.Provider value={{ getRouter:getRouter() }}>
      {children}
    </RouterContext.Provider>
  );
};

export default function useRouterContext(): RouterContextType {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
}
