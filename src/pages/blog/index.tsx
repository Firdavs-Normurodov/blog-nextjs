import { Box, Grid, Typography, Avatar } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { BlogService } from "@/services/blog.service";
import Layout from "@/layout/layout";
import SEO from "@/layout/seo/seo";
import { BlogsType } from "@/interfaces/blog.interface";
import { format } from "date-fns";
import { calculateEstimatedTimeToRead } from "@/helpers/time.format";

const BlogPage = ({ blogs }: BlogPageProps) => {
  const router = useRouter();

  return (
    <SEO metaTitle="All blog">
      <Layout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#141414", // Sahifa fonini qora qilib beramiz
            padding: "20px",
            color: "white",
          }}
        >
          <Grid
            container
            spacing={4}
            sx={{
              maxWidth: "1200px", // Katta ekranlar uchun maksimal kenglik
            }}
          >
            {blogs.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6} // Kichik ekranlarda 1 ustun, katta ekranlarda 2 ustun
                key={item.id}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0,0,0,.7)", // Qoraytirilgan fon
                    padding: "20px",
                    borderRadius: "8px",

                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between", // Kontentni vertikal yo'nalishda taqsimlash
                    height: "100%", // Barcha bloglar bir xil balandlikka ega bo'ladi
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.01)", // Hoverda kattalashish
                    },
                  }}
                  onClick={() => router.push(`/blog/${item.slug}`)} // Har bir blogga bosilganda uning detallari sahifasiga o'tish
                >
                  <Box
                    position="relative"
                    width="100%"
                    height="250px" // Rasmlar uchun maksimal balandlik
                    borderRadius="8px"
                    overflow="hidden"
                  >
                    <Image
                      src={item.image.url}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Typography variant="h5" marginTop="20px">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="gray" marginTop="10px">
                    {item.excerpt}
                  </Typography>

                  {/* Author Info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <Avatar
                      alt={item.author.name}
                      src={item.author.avatar.url}
                    />
                    <Box>
                      <Typography color="white">{item.author.name}</Typography>
                      <Typography variant="body2" color="gray">
                        {format(new Date(item.createdAt), "dd MMM, yyyy")} •{" "}
                        {calculateEstimatedTimeToRead(item.description.text)}{" "}
                        min read
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
    </SEO>
  );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps<
  BlogPageProps
> = async () => {
  const blogs = await BlogService.getAllBlogs();
  return {
    props: { blogs },
  };
};

interface BlogPageProps {
  blogs: BlogsType[];
}
