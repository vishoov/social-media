import React from "react";
import { TextField } from "@mui/material";

export const AIInput = ({
  type,
  placeholder,
  value,
  label,
  register,
  inputName,
  style,
  onChange,
}) => {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      type={type}
      placeholder={placeholder}
      value={value}
      style={style}
      onChange={onChange}
      {...register(inputName, { required: true })}
    />
  );
};
