import { Box } from "@mui/material";
import React from "react";
import Logo from "./logo.png";
import logo2 from "../Images/V1_ITF_Sanitation-workers-toolkit-white-03.svg";

export const Header = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1d1737",
        color: "#fa501e",
      }}
    >
      <Box display="flex" alignItems="center">
        <a href="https://itf-sanitation-workers-toolkit.webflow.io/">
          <img
            style={{
              display: "inline",
              marginRight: "10px",
              width: "400px",
              maxWidth: "80%",
            }}
            src={logo2}
          />
        </a>
      </Box>
    </div>
  );
};
