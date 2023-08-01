import React from "react";
import { Button } from "@mui/material";

export const AIButton = ({ type, onClick, content, style }) => {
  return (
    <Button variant="outlined" type={type} onClick={onClick} style={style}>
      {content}
    </Button>
  );
};
