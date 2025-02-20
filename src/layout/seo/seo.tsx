import Head from "next/head";
import { SeoProps } from "./seo.props";
import { siteConfig } from "@/config/site.config";

const SEO = ({
  children,
  author = siteConfig.author,
  metaDescription = siteConfig.metaDescription,
  metaKeywords = siteConfig.metaKeywords,
  metaTitle = siteConfig.metaTitle,
}: SeoProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{metaTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content={author} />
        <link rel="shortcut icon" href={"/favicon.ico"} type="image/x-icon" />{" "}
        {/* Corrected to use 'icon' for favicon */}
      </Head>
      {children}
    </>
  );
};

export default SEO;
