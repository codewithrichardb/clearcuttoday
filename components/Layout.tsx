import Head from "next/head";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
