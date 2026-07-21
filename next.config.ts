import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingExcludes: {
    "/*": ["./public/audio-cache/**/*", "./tts-service/**/*", "./uploads/**/*"],
  },
  turbopack: {
    root: projectRoot,
  },
  allowedDevOrigins: ["*.trycloudflare.com", "frame-wins-cancel-ghz.trycloudflare.com"],
};

export default nextConfig;
