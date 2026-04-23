import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com", "frame-wins-cancel-ghz.trycloudflare.com"],
};

export default withNextIntl(nextConfig);
