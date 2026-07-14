This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Production builds require the public site URL:

```env
NEXT_PUBLIC_SITE_URL=https://aieazy.com
```

AdSense Auto ads are loaded globally. Manual ad placements render only when the related AdSense slot IDs are set:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-5633731930294890
NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT=
NEXT_PUBLIC_ADSENSE_ARTICLE_MIDDLE_SLOT=
NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SLOT=
NEXT_PUBLIC_ADSENSE_FEED_SLOT=
NEXT_PUBLIC_ADSENSE_FEED_LAYOUT_KEY=
```

Recommended slot mapping:

- `ARTICLE_TOP_SLOT`: article page, below the table of contents
- `ARTICLE_MIDDLE_SLOT`: article page, before the third H2 section
- `ARTICLE_BOTTOM_SLOT`: article page, before FAQ
- `FEED_SLOT`: home, topic, compare, and tool article lists

Keep Auto ads enabled in AdSense, then compare manual slot performance in AdSense reports before increasing ad density.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details
