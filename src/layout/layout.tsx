import React from "react";
import { LayoutProps } from "./layout.props";
import { Navbar, Footer } from "@/components";
import { Box } from "@mui/material";
import { JSX } from "@emotion/react/jsx-runtime";

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
