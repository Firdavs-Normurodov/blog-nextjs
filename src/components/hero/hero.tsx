import { Avatar, Box, Typography } from "@mui/material";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { format } from "date-fns";
import { HeroProps } from "./hero.props";
import { calculateEstimatedTimeToRead } from "@/helpers/time.format";
import { motion } from "framer-motion";

const Hero = ({ blogs }: HeroProps) => {
  return (
    <Box width="100%" height="75vh">
      <Carousel
        responsive={{
          mobile: { breakpoint: { max: 4000, min: 0 }, items: 1 },
        }}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        transitionDuration={1000}
      >
        {blogs.map((item) => (
          <Box key={item.id}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "80vh",
                overflow: "hidden",
              }}
            >
              <Image
                src={item.image.url}
                alt={item.title}
                fill
                style={{ objectFit: "cover", filter: "brightness(0.5)" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              />

              {/* **Animatsiya qismi** */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "90%", md: "70%" },
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {/* **Sarlavha animatsiyasi** */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "28px", md: "48px" },
                      fontWeight: "bold",
                      color: "#F38D07",
                      textShadow: "2px 2px 10px rgba(143, 114, 63, 0.6)",
                    }}
                  >
                    {item.title}
                  </Typography>
                </motion.div>

                {/* **Izoh matni animatsiyasi** */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "16px", md: "22px" },
                      marginTop: "10px",
                      opacity: 0.9,
                    }}
                  >
                    {item.excerpt}
                  </Typography>
                </motion.div>

                {/* **Muallif va vaqt animatsiyasi** */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "15px",
                      marginTop: "25px",
                    }}
                  >
                    <Avatar
                      alt={item.author.name}
                      src={item.author.avatar.url}
                      sx={{
                        width: 50,
                        height: 50,
                        border: "2px solid #F38D07",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {item.author.name}
                      </Typography>
                      <Typography sx={{ fontSize: "14px", opacity: 0.7 }}>
                        {format(new Date(), "dd MMM, yyyy")} •{" "}
                        {calculateEstimatedTimeToRead(item.description.text)}{" "}
                        min read
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Hero;
