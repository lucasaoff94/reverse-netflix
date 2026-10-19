import type { NextConfig } from "next";
const pages = process.env.PAGES_BUILD === "1";
const basePath = pages ? process.env.PAGES_BASE_PATH || "/reverse-netflix" : "";
const config: NextConfig = {
  devIndicators: false,
  ...(pages
    ? { output: "export" as const, trailingSlash: true, basePath }
    : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default config;
