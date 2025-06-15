import { site } from "@wix/site";
import { createClient } from "@wix/sdk";
import { seo } from "@wix/site-seo";

const appId = "2b6a1f00-0341-451b-8e69-6dd2e20c409b"; // Замени на свой App ID

const client = createClient({
  host: site.host({ applicationId: appId }),
  modules: { seo }
});

client.seo.title()
  .then(title => console.log("✅ Site title:", title))
  .catch(err => console.error("❌ SEO error:", err));
