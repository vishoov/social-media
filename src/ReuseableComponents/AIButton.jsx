import React from "react";
import { Button } from "@mui/material";

export const AIButton = ({
  type,
  onClick,
  content,
  style,
  variant = "outlined",
}) => {
  return (
    <Button variant={variant} type={type} onClick={onClick} style={style}>
      {content}
    </Button>
  );
};
