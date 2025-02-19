import { AppBar, Box, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useState } from "react";
import { navItems } from "@/config/constants";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public"; // Yer shari icon
import { useRouter } from "next/router";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box
      sx={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#000000", // Mobil menyu fon qop-qora
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <Box
          onClick={() => router.push("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <PublicIcon sx={{ color: "#F38D07", fontSize: 32 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#F38D07" }}
          >
            IT Blog
          </Typography>
        </Box>
        <CloseIcon
          sx={{ cursor: "pointer", color: "#F38D07" }}
          onClick={handleDrawerToggle}
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.route} disablePadding>
            <ListItemButton onClick={() => router.push(item.route)}>
              <ListItemText
                primary={item.label}
                sx={{ color: "#F38D07", textAlign: "center" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "10vh" }}>
      <AppBar
        component="nav"
        sx={{
          height: "10vh",
          background: "rgba(0, 0, 0, 0.7)", // Shaffof qora
          backdropFilter: "blur(10px)", // Biroz blur effekti
          boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.1)", // Oltin rangli glow
        }}
      >
        <Toolbar>
          {/* Mobil menyu tugmasi */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "#F38D07" }} />
          </IconButton>

          {/* Logo va ism */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          >
            <PublicIcon sx={{ color: "#F38D07", fontSize: 30 }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#F38D07" }}
            >
              IT Blog
            </Typography>
          </Box>

          {/* Navigatsiya tugmalari */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "20px" }}>
            {navItems.map((item) => (
              <Button
                key={item.route}
                onClick={() => router.push(item.route)}
                sx={{
                  color: "#F38D07",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  position: "relative",
                  transition: "0.3s ease",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "0",
                    left: "0",
                    backgroundColor: "#F38D07",
                    transform: "scaleX(0)",
                    transition: "transform 0.3s ease-in-out",
                  },
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobil menyu */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": { width: "100%", backgroundColor: "#000000" },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
