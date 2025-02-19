import Head from "next/head";
import { SeoProps } from "@/layout/seo/seo.props";
import Layout from "@/layout/layout";
import { Content, Hero, Sidebar } from "@/components";
import { Box } from "@mui/material";
import { BlogService } from "@/services/blog.service";
import { GetServerSideProps } from "next";
import { BlogsType } from "@/interfaces/blog.interface";
import { CategoryType } from "@/interfaces/categories.interface";
import SEO from "@/layout/seo/seo";
import { siteConfig } from "@/config/site.config";

const Index = ({ blogs, lastestBlogs, categories }: HomePageProps) => {
  return (
    <SEO
      metaTitle={siteConfig.metaTitle}
      metaDescription={siteConfig.metaDescription}
      metaKeywords={siteConfig.metaKeywords}
      author={siteConfig.author}
    >
      <Layout>
        <Hero blogs={blogs.slice(0, 3)} />
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            padding: "20px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Sidebar lastestBlogs={lastestBlogs} categories={categories} />
          <Content blogs={blogs} />
        </Box>
      </Layout>
    </SEO>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  query,
}) => {
  const { category } = query as { category?: string }; // Type assertion for query

  let blogs = await BlogService.getAllBlogs();
  let lastestBlogs = await BlogService.getLatestBlog();
  let categories = await BlogService.getCategories();

  // If a specific category slug is provided, fetch blogs for that category
  if (category) {
    const categoryBlogs = await BlogService.getDetailCategoriesBlog(category);
    blogs = categoryBlogs;
  }

  return {
    props: {
      blogs,
      lastestBlogs,
      categories,
    },
  };
};

interface HomePageProps {
  blogs: BlogsType[];
  lastestBlogs: BlogsType[];
  categories: CategoryType[];
}
