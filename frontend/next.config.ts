import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL
  }
};

export default nextConfig;
