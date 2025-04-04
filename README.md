This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploying

```bash
npm run build
npm run deploy
```

Sometimes you'll need to clear the cache in cloudfront to see your changes.

To do that, go to [Cloudfront](https://console.aws.amazon.com/cloudfront).

* Click on the cloudfront distribution **Personal Nextjs Website**.  The one that says production.

* Click on the Invalidations tab

* Create an invalidation with `/*`.  If deploying a new blog article, just enter `/blog/*`