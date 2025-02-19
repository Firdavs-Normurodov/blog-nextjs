import React from "react";
import { LayoutProps } from "./layout.props";
import { Navbar, Footer } from "@/components";
import { Box } from "@mui/material";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <Box minHeight={"90vh"}>{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
