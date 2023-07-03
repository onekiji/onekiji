import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://onekiji.com/",
  integrations: [sitemap(), compress()]
});