import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: "https://onekiji.com/",
  adapter: vercel({
    analytics: true,
  }),
  integrations: [
    astroI18next(),
    sitemap({
      changefreq: "daily",
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          ja: "ja-JP",
        },
      },
    }),
    mdx(),
    react(),
    compress(),
  ],
});
