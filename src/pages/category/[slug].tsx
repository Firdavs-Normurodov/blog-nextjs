import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Content, Sidebar } from "@/components";
import { BlogsType } from "@/interfaces/blog.interface";
import { CategoryType } from "@/interfaces/categories.interface";
import Layout from "@/layout/layout";
import SEO from "@/layout/seo/seo";
import { BlogService } from "@/services/blog.service";

const CategoryDetailedPage = ({
  blogs,
  lastestBlogs,
  categories,
}: DetailedCategoriesPageProps) => {
  const router = useRouter();
  return (
    <SEO metaTitle={`${router.query.slug}-category`}>
      <Layout>
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

export default CategoryDetailedPage;
export const getServerSideProps: GetServerSideProps<
  DetailedCategoriesPageProps
> = async ({ query }) => {
  const lastestBlogs = await BlogService.getLatestBlog(); // ✅ Noto‘g‘ri nom to‘g‘irlandi
  const categories = await BlogService.getCategories();
  const blogs = await BlogService.getDetailCategoriesBlog(query.slug as string);
  return {
    props: {
      blogs,
      lastestBlogs, // ✅ Noto‘g‘ri nom to‘g‘irlandi
      categories,
    },
  };
};

interface DetailedCategoriesPageProps {
  blogs: BlogsType[];
  lastestBlogs: BlogsType[]; // ✅ Noto‘g‘ri nom to‘g‘irlandi
  categories: CategoryType[];
}
