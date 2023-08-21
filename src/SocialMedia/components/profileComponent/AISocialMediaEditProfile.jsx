import React from "react";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import jenPic1 from "../../../static/images/avatar/jen1.webp";
import jenPic3 from "../../../static/images/avatar/jen3.webp";
import jenPic4 from "../../../static/images/avatar/jen4.jpeg";
import { AIProfileEditUpBar } from "../../../ReuseableComponents/AIProfileEditUpBar";

export const AISocialMediaEditProfile = () => {
  return (
    <>
      <div>
        <span>
          <AISideBar />
        </span>
        <div>
          <AIProfileEditUpBar />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            width: "80%",
            marginLeft: 40,
          }}
        >
          <Stack
            direction="row"
            sx={{
              marginLeft: 60,
              paddingTop: 5,
              justifyContent: "space-between",
            }}
            spacing={20}
          >
            <Box>
              <Avatar
                alt="Jenna"
                src={jenPic1}
                sx={{
                  width: 200,
                  height: 200,
                }}
                style={{
                  margin: 15,
                }}
              />
            </Box>
            <Box>
              <Avatar
                alt="Jenna"
                src={jenPic3}
                sx={{
                  width: 200,
                  height: 200,
                }}
                style={{
                  margin: 15,
                }}
              />
            </Box>
            <Box>
              <Avatar
                alt="Jenna"
                src={jenPic4}
                sx={{
                  width: 200,
                  height: 200,
                }}
                style={{
                  margin: 15,
                }}
              />
            </Box>
          </Stack>
        </div>
        <div>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
              marginLeft: 200,
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                JennaOrtega
              </Typography>
            </Box>
          </span>
        </div>
      </div>
    </>
  );
};
