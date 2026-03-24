export default function sitemap() {
  const baseUrl = "https://cricnova-ai.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/live`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/matches`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/predictions`,
      lastModified: new Date(),
    },
  ];
}