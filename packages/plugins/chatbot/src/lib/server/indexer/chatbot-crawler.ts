export function createChatbotCrawler() {
  return new ChatbotCrawler();
}

class ChatbotCrawler {
  async getSitemapLinks(url: string) {
    const { default: getSitemapLinks } = await import('get-sitemap-links');

    const sitemapUrl =
      process.env.CHATBOT_WEBSITE_SITEMAP_URL ??
      (await this.getSitemapUrl(url));

    if (!sitemapUrl) {
      throw new Error(
        'No sitemap found. Please provide a sitemap URL using the CHATBOT_WEBSITE_SITEMAP_URL environment variable.',
      );
    }

    return getSitemapLinks(sitemapUrl);
  }

  async crawl(url: string) {
    const response = await fetch(url);

    return await response.text();
  }

  filterLinks(
    sites: string[],
    {
      allow,
      disallow,
    }: {
      allow: string[];
      disallow: string[];
    },
  ) {
    const allowList = allow.filter(Boolean);
    const disallowList = disallow.filter(Boolean);

    return sites.filter((site) => {
      const isAllowed = allowList.length
        ? allowList.some((pattern) => site.includes(pattern))
        : true;

      const isDisallowed = disallowList.length
        ? disallowList.some((pattern) => site.includes(pattern))
        : false;

      return isAllowed && !isDisallowed;
    });
  }

  private async getSitemapUrl(websiteUrl: string) {
    const robotsTxtUrl = `${websiteUrl}/robots.txt`;
    const text = await fetch(robotsTxtUrl).then((response) => response.text());

    const sitemapDirective = text.match(/sitemap: (.*)/i);

    return sitemapDirective ? sitemapDirective[1] : `${websiteUrl}/sitemap.xml`;
  }
}
