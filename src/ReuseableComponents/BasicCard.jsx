import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, Stack, TextareaAutosize, Typography } from "@mui/material";
import AIModel from "./AIModel";
import { useForm } from "react-hook-form";

export default function BasicCard() {
  const { register } = useForm();

  return (
    <Card
      sx={{
        width: 700,
        height: 400,
        marginLeft: 45,
        marginTop: 10,
        justifyContent: "center",

        display: "flex",
      }}
    >
      <CardContent>
        <Stack direction="row">
          <Typography
            fontSize="20"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              marginRight: 5,
            }}
          >
            About Me
          </Typography>
          <Box>
            <TextareaAutosize
              rowsMin={4}
              style={{ width: 400, height: 40 }}
              placeholder="Enter about your self"
            />
          </Box>
        </Stack>
        <Box></Box>
      </CardContent>
      <CardActions>
        <AIModel register={register} inputName="Gender" />
      </CardActions>
    </Card>
  );
}
