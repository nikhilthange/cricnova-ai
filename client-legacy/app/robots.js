export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://cricnova-ai.vercel.app/sitemap.xml",
  };
}