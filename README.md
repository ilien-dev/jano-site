# jano-site

The product page for [Jano](https://github.com/ilien-dev/jano), live at **https://jano.ilien.dev**.

Built with Astro and Tailwind CSS, served as static assets by a Cloudflare Worker. Every push to
`main` builds and deploys through Cloudflare Workers Builds.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

## Deploy

Pushing to `main` deploys. To deploy by hand: `npm run deploy` (needs `wrangler login`).

## Performance

```sh
npm run lighthouse   # Unlighthouse against https://jano.ilien.dev
```

## Assets

`public/banners/` holds the real heroes from the Jano repository (`examples/*` and `assets/`).
`public/` icons come from Jano's `brand/web`. Fonts are Space Grotesk and JetBrains Mono,
under the SIL Open Font License.
