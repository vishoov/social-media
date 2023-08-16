import React from "react";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import { AIUpBar } from "../../../ReuseableComponents/AIUpBar";
import { Avatar, Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import jenPic1 from "../../../static/images/avatar/jen1.webp";
import jenPic2 from "../../../static/images/avatar/jen2.jpeg";
import jenPic3 from "../../../static/images/avatar/jen3.webp";
import jenPic4 from "../../../static/images/avatar/jen4.jpeg";
import { AddAPhotoRounded } from "@mui/icons-material";
import { AvatarFileInput } from "../../../ReuseableComponents/AvatarFileInput";

export const AISocialMediaProfileInterface = () => {
  return (
    <>
      <div>
        <span>
          <AIUpBar />
        </span>
        <span>
          <AISideBar />
        </span>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                marginLeft: 40,
              }}
            >
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  alt="Jenna"
                  src={jenPic1}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                  style={{
                    margin: 15,
                  }}
                />
                <Typography variant="subtitle2">Holiday mood!</Typography>
              </Box>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  alt="Jenna"
                  src={jenPic2}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                  style={{
                    margin: 15,
                  }}
                />
                <Typography variant="subtitle2">Hello , Los angales</Typography>
              </Box>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  alt="Jenna"
                  src={jenPic3}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                  style={{
                    margin: 15,
                  }}
                />
                <Typography variant="subtitle2">Paris</Typography>
              </Box>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  alt="Jenna"
                  src={jenPic4}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                  style={{
                    margin: 15,
                  }}
                />
                <Typography variant="subtitle2">work mood</Typography>
              </Box>
              <Box>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "black",
                    marginLeft: 60,
                    paddingBottom: 200,
                  }}
                >
                  About Me
                </p>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              paddingRight: 4,
            }}
          >
            <AvatarFileInput />
          </Box>
        </Stack>
        <hr
          style={{
            paddingLeft: 160,
            width: "50%",
            backgroundColor: "black",
          }}
        />
        <span>
          <p
            style={{
              marginTops: 10,
              marginLeft: 1600,
            }}
          >
            <b>Jenna Oretega</b>
          </p>
        </span>
        <span>
          <AddAPhotoRounded
            sx={{
              marginLeft: 115,
              height: 120,
              width: 60,
            }}
          />
          <Typography
            style={{
              marginLeft: 825,
              fontSize: 25,
              fontWeight: "bold",
              color: "black",
            }}
            variant="subtitle1"
          >
            Share your memories
          </Typography>
        </span>
        <span>
          <Typography
            style={{
              marginLeft: 700,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            when you share your memories, they will will appear on your profile.
          </Typography>
        </span>
        <span>
          <Tooltip
            title="Add"
            arrow
            sx={{
              marginLeft: 105,
            }}
          >
            <Button>share your first memory</Button>
          </Tooltip>
        </span>
      </div>
    </>
  );
};
