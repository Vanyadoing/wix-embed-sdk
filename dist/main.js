// src/embed.ts
import { site } from "@wix/site";
import { createClient } from "@wix/sdk";
import { seo } from "@wix/site-seo";
var client = createClient({
  host: site.host({ applicationId: "2b6a1f00-0341-451b-8e69-6dd2e20c409b" }),
  modules: { seo }
});
client.seo.title().then((title) => console.log("\u2705 Site title:", title)).catch((err) => console.error("\u274C SEO error:", err));
