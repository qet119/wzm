import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
        preflight: false
      },
  important: '#app',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F8FE',
        secondary1: '#ffffff',
        secondary2: '#f9f9f9',
        secondary3: '#eeeeee',
        secondary4: '#cccccc',
        secondary5: '#999999',
        secondary6: '#666666',
        secondary7: '#333333',
        secondary8: '#60a5fa',
        secondary9: '#353535',
        secondary10: '#437EC7',
        secondary11: '#32496C',
        secondary12: '#F3F2F7',

      },
    },
    screens: {
      sm: '430px',  // 手机尺寸断点
      md: '768px',  // 平板尺寸断点
      lg: '1024px', // 桌面尺寸断点
      xl: '1280px', // 大桌面尺寸断点
    },
  },
  plugins: [],
};
export default config;
