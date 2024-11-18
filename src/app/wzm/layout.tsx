"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppProvider } from "@/provider/provider.app";
import { DialogProvider, ThemeProvider } from "ui";
// import { ThemeSelect } from "base";
import { FetchProvider } from "@/provider/provider.fetch";
// import { RouterProvider } from "@/provider/provide.router";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          {/* <ThemeProvider themeSelect={ThemeSelect.LIGHT}> */}
          <DialogProvider>
            <AppProvider>
              <FetchProvider>
                {children}
              </FetchProvider>
              </AppProvider>
          </DialogProvider>
          {/* </ThemeProvider> */}
        </AntdRegistry>
      </body>
    </html>
  );
}
