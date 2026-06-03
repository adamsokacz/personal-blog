import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import siteConfig from "../data/site-config";

export async function GET(context) {
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft);

  const items = posts.sort(
    (a, b) =>
      new Date(b.data.publishDate).valueOf() -
      new Date(a.data.publishDate).valueOf()
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.excerpt || "",
      pubDate: item.data.publishDate,
      link: `/blog/${item.id}/`,
    })),
  });
}
