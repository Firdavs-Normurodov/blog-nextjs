import { Avatar, Box, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import { Sidebar } from "@/components";
import { BlogsType } from "@/interfaces/blog.interface";
import { CategoryType } from "@/interfaces/categories.interface";
import Layout from "@/layout/layout";
import SEO from "@/layout/seo/seo";
import { BlogService } from "@/services/blog.service";

const DetailedBlogsPage = ({
  blog,
  lastestBlogs,
  categories,
}: DetailedBlogsPageProps) => {
  return (
    <SEO metaTitle={blog.title}>
      <Layout>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            padding: "20px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box width={{ xs: "100%", md: "70%" }}>
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,.5)",
                padding: "20px",
                marginTop: "20px",
                borderRadius: "8px",
                boxShadow: "0px 8px 16px rgba(255,255,255,.1)",
                position: "relative",
                width: "100%",
                height: { xs: "65vh", md: "70vh" },
                overflow: "hidden",
              }}
            >
              <Image
                src={blog.image.url}
                alt={blog.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>

            <Box sx={{ marginTop: "20px", padding: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                marginTop={"20px"}
              >
                <Avatar alt={blog.author.name} src={blog.author.avatar.url} />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {blog.author.name}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {format(new Date(blog.createdAt), "dd MMM, yyyy")}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  marginTop: "20px",
                  fontWeight: "bold",
                  lineHeight: "1.5",
                }}
              >
                {blog.title}
              </Typography>

              <Typography
                color="gray"
                variant="body1"
                sx={{
                  marginTop: "10px",
                  fontStyle: "italic",
                  opacity: "0.7",
                }}
              >
                {blog.excerpt}
              </Typography>

              <Divider sx={{ marginTop: "20px" }} />

              <Box
                sx={{
                  marginTop: "20px",
                  opacity: 0.9,
                  lineHeight: "1.8",
                  fontSize: "16px",
                }}
                dangerouslySetInnerHTML={{ __html: blog.description.html }}
              ></Box>
            </Box>
          </Box>

          <Sidebar lastestBlogs={lastestBlogs} categories={categories} />
        </Box>
      </Layout>
    </SEO>
  );
};

export default DetailedBlogsPage;

export const getServerSideProps: GetServerSideProps<
  DetailedBlogsPageProps
> = async ({ query }) => {
  const lastestBlogs = await BlogService.getLatestBlog();
  const categories = await BlogService.getCategories();
  const blogData = await BlogService.getDetailBlogs(query.slug as string);

  // `blogData` massiv yoki obyekt ekanligini tekshiramiz
  const blog = Array.isArray(blogData) ? blogData[0] : blogData;

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
      lastestBlogs,
      categories,
    },
  };
};

interface DetailedBlogsPageProps {
  blog: BlogsType;
  lastestBlogs: BlogsType[];
  categories: CategoryType[];
}
