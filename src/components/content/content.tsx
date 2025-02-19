import { Avatar, Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { format } from "date-fns";
import { ContentProps } from "./content.props";
import { calculateEstimatedTimeToRead } from "@/helpers/time.format";
import { useRouter } from "next/router";

const Content = ({ blogs }: ContentProps) => {
  const router = useRouter();

  return (
    <Box width={{ xs: "100%", md: "70%" }} minHeight="100vh" padding="20px">
      {blogs.map((item) => (
        <Box
          key={item.id}
          sx={{
            backgroundColor: "rgba(0,0,0,.5)",
            padding: "30px",
            marginTop: "20px",
            borderRadius: "12px",
            boxShadow: "0px 12px 24px rgba(0,0,0,.3)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0px 16px 32px rgba(0,0,0,.5)",
            },
          }}
          onClick={() => router.push(`/blog/${item.slug}`)}
        >
          {/* Image */}
          <Box
            position="relative"
            width="100%"
            height={{ xs: "40vh", md: "50vh" }}
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

          {/* Blog Title */}
          <Typography
            variant="h4"
            marginTop="20px"
            fontWeight="bold"
            color="white"
          >
            {item.title}
          </Typography>

          {/* Excerpt */}
          <Typography variant="body1" color="gray" marginTop="10px">
            {item.excerpt}
          </Typography>

          <Divider sx={{ marginTop: "20px", backgroundColor: "gray" }} />

          {/* Author Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Avatar alt={item.author.name} src={item.author.avatar.url} />
            <Box>
              <Typography color="white">{item.author.name}</Typography>
              <Typography variant="body2" color="gray">
                {format(new Date(item.createdAt), "dd MMM, yyyy")} •{" "}
                {calculateEstimatedTimeToRead(item.description.text)} min read
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Content;
