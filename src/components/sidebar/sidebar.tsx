import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { Fragment } from "react";
import { format } from "date-fns";
import { SidebarProps } from "./sidebar.props";
import { useRouter } from "next/router";

const Sidebar = ({ lastestBlogs, categories }: SidebarProps) => {
  const router = useRouter();
  return (
    <>
      <Box width={{ xs: "100%", md: "30%" }} padding="20px">
        <Box
          position={"sticky"}
          top={"100px"}
          sx={{ transition: "all .3s ease" }}
        >
          {/* Latest Blog Section */}
          <Box
            marginTop={"20px"}
            padding={"20px"}
            borderRadius={"12px"}
            boxShadow={"0px 8px 16px rgba(0,0,0,.15)"}
            backgroundColor="rgba(0, 0, 0, 0.6)" // Darker background color
            color="white" // Text color changed to white
          >
            <Typography variant="h5" fontWeight="bold">
              Latest Blog
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              {lastestBlogs.map((item) => (
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                  key={item.id}
                  onClick={() => router.push(`/blog/${item.slug}`)}
                >
                  <Image
                    src={item.image.url}
                    alt={item.title}
                    width={100}
                    height={100}
                    style={{ borderRadius: "8px" }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold" color="white">
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar
                        alt={item.author.name}
                        src={item.author.avatar.url}
                      />
                      <Box>
                        <Typography variant="body2" color="gray">
                          {item.author.name}
                        </Typography>
                        <Typography variant="body2" color="gray">
                          {format(new Date(item.createdAt), "dd MMM, yyyy")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Category Section */}
          <Box
            sx={{
              marginTop: "40px",
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker background color
              color: "white", // White text for better contrast
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Categories
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              {categories.map((nav) => (
                <Fragment key={nav.slug}>
                  <Button
                    onClick={() => router.push(`/category/${nav.slug}`)}
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                      height: "50px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      color: "#fff", // White text for buttons
                      "&:hover": {
                        backgroundColor: "#f38d07",
                        color: "#fff", // Color stays white on hover
                      },
                    }}
                  >
                    {nav.label}
                  </Button>
                </Fragment>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
