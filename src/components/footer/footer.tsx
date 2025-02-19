import { Box, ButtonGroup, Typography } from "@mui/material";
import { format } from "date-fns";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      sx={{
        padding: "30px 20px", // Ko'proq joy beradi
        backgroundColor: "#141414",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" }, // Mobilda vertikal, katta ekranda gorizontal
        textAlign: { xs: "center", md: "left" }, // Mobilda markazlashtirish
        borderTop: "2px solid rgba(255, 255, 255, 0.1)", // Yo'l chizig'ini qo'shish
      }}
    >
      <Typography variant="body1">
        &copy; {format(new Date(), "yyyy")} Firdavs. All rights reserved.
      </Typography>

      <ButtonGroup
        disableElevation
        variant="text"
        aria-label="social media buttons"
        sx={{
          display: "flex",
          gap: "15px",
          justifyContent: { xs: "center", md: "flex-start" }, // Mobilda markazlashtirish
          marginTop: { xs: "15px", md: "0" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            "& svg": {
              fontSize: "30px",
              color: "white",
              transition: "transform 0.3s ease, color 0.3s ease", // Hover effekti
              "&:hover": {
                transform: "scale(1.1)", // Ikonani kattalashtirish hoverda
                color: "#f38d07", // Hoverda rangni o'zgartirish
              },
            },
          }}
        >
          <TelegramIcon sx={{ cursor: "pointer" }} />
          <InstagramIcon sx={{ cursor: "pointer" }} />
          <YouTubeIcon sx={{ cursor: "pointer" }} />
        </Box>
      </ButtonGroup>
    </Box>
  );
};

export default Footer;
