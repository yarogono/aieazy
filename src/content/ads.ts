export const adsenseConfig = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-5633731930294890",
  slots: {
    articleTop: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT || "",
    articleMiddle: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_MIDDLE_SLOT || "",
    articleBottom: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SLOT || "",
    feed: process.env.NEXT_PUBLIC_ADSENSE_FEED_SLOT || "",
  },
  feedLayoutKey: process.env.NEXT_PUBLIC_ADSENSE_FEED_LAYOUT_KEY || "",
};
