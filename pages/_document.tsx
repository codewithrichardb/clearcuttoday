import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="ClearCut - Your emotional detox and journaling companion" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ClearCut" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@clearcut" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
          onLoad={(e) => {
            const target = e.target as HTMLLinkElement;
            target.onload = null;
            target.rel = 'stylesheet';
          }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </Head>
      <body className="bg-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
