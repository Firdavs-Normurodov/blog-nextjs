import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { CategoryType } from "@/interfaces/categories.interface";
import Layout from "@/layout/layout";
import SEO from "@/layout/seo/seo";
import { BlogService } from "@/services/blog.service";
import { BlogsType } from "@/interfaces/blog.interface";

const CategoryPage = ({ categories, blogs }: CategoryPageProps) => {
  const router = useRouter();

  return (
    <SEO metaTitle="Categories">
      <Layout>
        <Box
          sx={{
            padding: "50px 20px",
            backgroundColor: "#121212", // Sizning original fon rangini ishlatdim
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
            Explore Categories
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.slug}>
                <Paper
                  sx={{
                    padding: "30px",
                    textAlign: "center",
                    backgroundColor: "#000", // Ko'proq qora fon
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#F38D07" }}
                  >
                    {category.label}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "20px",
                      backgroundColor: "#F38D07",
                      "&:hover": { backgroundColor: "#FF7744" },
                    }}
                    onClick={() => router.push(`/category/${category.slug}`)}
                  >
                    View Blogs
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ marginTop: "50px", width: "100%" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#fff", marginBottom: "20px" }}
            >
              Latest Blog Posts
            </Typography>

            <Grid container spacing={4}>
              {blogs.slice(0, 6).map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.slug}>
                  <Paper
                    sx={{
                      padding: "20px",
                      backgroundColor: "#000", // Endi qora fon rang
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "200px",
                        backgroundImage: `url(${blog.image.url})`, // Blog rasmiga URL qo'shish
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "8px",
                        marginBottom: "15px",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#fff",
                        marginBottom: "10px",
                      }}
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#bbb", marginBottom: "10px" }}
                    >
                      {blog.excerpt}
                    </Typography>
                    <Button
                      sx={{
                        marginTop: "10px",
                        backgroundColor: "#F38D07",
                        color: "#000",
                        "&:hover": { backgroundColor: "#F38D07" },
                      }}
                      onClick={() => router.push(`/blog/${blog.slug}`)}
                    >
                      Read More
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Layout>
    </SEO>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps<
  CategoryPageProps
> = async () => {
  const categories = await BlogService.getCategories();
  const blogs = await BlogService.getAllBlogs(); // Barcha bloglar
  return {
    props: {
      categories,
      blogs,
    },
  };
};

interface CategoryPageProps {
  categories: CategoryType[];
  blogs: BlogsType[];
}
