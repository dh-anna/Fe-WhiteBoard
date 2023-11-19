import { Box } from "@mui/material";
import React from "react";
import { AiFillHeart } from "react-icons/ai";

export const Footer = () => {
  return (
    <Box sx={footerStyle}>
      Made with <AiFillHeart style={heartStyle} /> by Anna & Bálint
    </Box>
  );
};

const footerStyle = {
  backgroundColor: "#ececec",
  color: "#282828",
  p: 2,
  textAlign: "center",
};

const heartStyle = {
  color: "red",
  verticalAlign: "middle",
};
