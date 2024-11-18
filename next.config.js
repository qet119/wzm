// const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
// import { NextConfig } from "next";
// import path from "path";
const path = require('path')

const nextConfig = {
      sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/wzm/home",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  transpilePackages: ["@package/bug"],
  experimental: {
    // instrumentationHook: true,
    // serverComponentsExternalPackages: ["ioredis","jsonwebtoken","jwa","crypto"],
    // serverComponentsExternalPackages: ["stream"],
  },
  webpack: (config, { isServer }) => {
    console.log("isServer =-------->", isServer);
    // if (dev && !isServer) {
    //   config.optimization.splitChunks.cacheGroups = {
    //     default: false,
    //   };
    // }

    config.resolve.alias["ui"] = path.resolve(__dirname, "../mylib/ui");

    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }

    //  console.log('config',config)

    // config.resolve.fallback = {
    //   // process: require.resolve('process/browser'),
    //   // zlib: require.resolve('browserify-zlib'),
    //   // stream: require.resolve('stream-browserify'),
    //   util: require.resolve("util"),
    //   buffer: require.resolve("buffer"),
    //   asset: require.resolve("assert"),
    // };

    // config.externals.push('canvas')

    Object.assign(config.resolve.alias, {
      "@mongodb-js/zstd": false,
      "@aws-sdk/credential-providers": false,
      snappy: false,
      aws4: false,
      "mongodb-client-encryption": false,
      kerberos: false,
      "supports-color": false,
      // "argon2":"node_modules/argon2",
      // "mongoose":false,

      // "argon2":path.resolve(__dirname, '../next')
      // canvas:false
    });

    return config;
  },
  // reactStrictMode: process.env.NODE_ENV === "development" ? false : true,
  reactStrictMode: false,
  
};

// module.exports = async ({ defaultConfig }:NextConfig) => {
//   //mongoose在npm模塊中會報錯 ，所以加這段配置
//   // defaultConfig.typescript = {
//   //   ignoreBuildErrors: true,
//   // };

//   const append = {
//     // sassOptions: {
//     //   includePaths: [path.join(__dirname, 'styles')],
//     // },
//     // 启用SWC编译器以提高性能
//     // swcMinify: true,
//     async redirects() {
//       return [
//         {
//           source: "/",
//           destination: "/wzm/home",
//           permanent: true,
//         },
//       ];
//     },
//     async headers() {
//       return [
//         {
//           source: "/api/:path*",
//           headers: [
//             {
//               key: "Access-Control-Allow-Origin",
//               value: "*", // Set your origin
//             },
//             {
//               key: "Access-Control-Allow-Methods",
//               value: "GET, POST, PUT, DELETE, OPTIONS",
//             },
//             {
//               key: "Access-Control-Allow-Headers",
//               value: "Content-Type, Authorization",
//             },
//           ],
//         },
//       ];
//     },
//     transpilePackages: ["@package/bug"],
//     experimental: {
//       // instrumentationHook: true,
//       // serverComponentsExternalPackages: ["ioredis","jsonwebtoken","jwa","crypto"],
//       // serverComponentsExternalPackages: ["stream"],
//     },
//     webpack: (config:NextConfig, { isServer }: { isServer: boolean }) => {
//       console.log("isServer =-------->", isServer);
//       // if (dev && !isServer) {
//       //   config.optimization.splitChunks.cacheGroups = {
//       //     default: false,
//       //   };
//       // }

//       config.resolve.alias["ui"] = path.resolve(__dirname, "../mylib/ui");

//       if (!isServer) {
//         config.resolve.fallback.fs = false;
//         config.resolve.fallback.dns = false;
//         config.resolve.fallback.net = false;
//         config.resolve.fallback.tls = false;
//       }

//       //  console.log('config',config)

//       // config.resolve.fallback = {
//       //   // process: require.resolve('process/browser'),
//       //   // zlib: require.resolve('browserify-zlib'),
//       //   // stream: require.resolve('stream-browserify'),
//       //   util: require.resolve("util"),
//       //   buffer: require.resolve("buffer"),
//       //   asset: require.resolve("assert"),
//       // };

//       // config.externals.push('canvas')

//       Object.assign(config.resolve.alias, {
//         "@mongodb-js/zstd": false,
//         "@aws-sdk/credential-providers": false,
//         snappy: false,
//         aws4: false,
//         "mongodb-client-encryption": false,
//         kerberos: false,
//         "supports-color": false,
//         // "argon2":"node_modules/argon2",
//         // "mongoose":false,

//         // "argon2":path.resolve(__dirname, '../next')
//         // canvas:false
//       });

//       return config;
//     },
//     // reactStrictMode: process.env.NODE_ENV === "development" ? false : true,
//     reactStrictMode: true,
//   };

//   Object.assign(defaultConfig, append);

//   //  console.log(defaultConfig)

//   return defaultConfig;
// };

module.exports=nextConfig