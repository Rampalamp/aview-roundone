This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Approach / Thoughts

I opted to use NextJS for two main reasons, it handles caching fetches nicely (so switching between the two same languages will only have load times on the initial swap to said language), and the general setup is fast and easy allowing me to get to work fast.

The App itself is very simple, it takes advantage of the default page.tsx and uses only one extra component Translator.tsx. Had I noticed that the coding challenge was sitting in my spam box for the majority of the 72 hours, I would have made the translator using a useContext, due to the number of parameters it ended up using for my desired user experience.

Originally I had a "Translate" button, but opted to scrap it entirely and just handle the translate on change of the <selction> options.

I decied to use a mapping to handle the fact that the language codes that LibreTranslate uses in the API aren't exactly user readable/friendly. So each language Code has a link to the more user friendly language Name.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## LibreTranslate (REQUIRED FOR FULL FUNCTIONALITY)

I developed this on a Windows 10 environment, running a local [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) node via the following commands was proving difficult (errors during installation of certain py packages...) :

```bash
pip install -e .
libretranslate [args]

# Or
python main.py [args]
```

However, using Docker proved much more effective. Once you have installed [Docker](https://docs.docker.com/get-docker/) - run the following commands to obtain, and run your image/container...

```bash
docker pull libretranslate/libretranslate

docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

If successful, you should now have a local LibreTranslate server running on port 5000. This will give you full functionality of the web application allowing for live text translations.
