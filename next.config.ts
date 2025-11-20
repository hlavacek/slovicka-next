import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || ""
  /* config options here */ 
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
