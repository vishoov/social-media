import React from "react";
import Slide from "@mui/material/Slide";
import { Snackbar } from "@mui/material";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export const AISnakeBar = () => {
  return <Snackbar TransitionComponent={TransitionLeft} />;
};
