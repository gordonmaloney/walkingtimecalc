import { Box } from "@mui/material";
import React from "react";
import Logo from "./logo.png";

export const Header = () => {
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "black",
        color: "yellow",
      }}
    >
      <Box display="flex" alignItems="center">
        <img
          style={{ display: "inline", marginRight: "10px" }}
          src={Logo}
          width="100px"
        />
        <h1 style={{ display: "inline" }}>
          DEMAND SAFE ACCESS TO SANITATION FOR TRANSPORT WORKERS
        </h1>
      </Box>
    </div>
  );
};
