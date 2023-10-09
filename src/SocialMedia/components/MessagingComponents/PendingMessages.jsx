import React from "react";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { PersonOffRounded, VideocamRounded } from "@mui/icons-material";

export const PendingMessages = () => {
  const data = [
    {
      userName: "John Doe",
      profilePic: "https://i.pravatar.cc/150?img=1",
      message: "Hello John",
    },
    {
      userName: "alogue",
      profilePic: "https://i.pravatar.cc/150?img=2",
      message: "Hello another user",
    },
  ];

  return (
    <>
      <AISideBar />
      <Grid container>
        <Grid
          sx={{
            marginLeft: 36,
          }}
        >
          <Stack
            direction="row"
            marginLeft={3}
            spacing={40}
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              sx={{
                height: 43,
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              messages requests
            </Typography>
          </Stack>
          <Divider
            sx={{
              marginLeft: 2,
              width: 500,
            }}
            color="lightgrey"
          />
          <List
            sx={{
              overflowY: "scroll", // Make the table body scrollable
              maxHeight: 730,
            }}
          >
            {data?.map((items) => {
              return (
                <ListItem
                  key={items?.userName}
                  sx={{
                    width: 520,
                  }}
                >
                  <ListItemButton disableTouchRipple>
                    <ListItemAvatar>
                      <Avatar
                        src={items?.profilePic}
                        srcSet={items?.profilePic}
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                        alt="not found!"
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {items?.userName}
                      </Typography>
                      <Typography variant="caption">
                        You: {items?.message}
                      </Typography>
                    </ListItemText>
                    <ListItemIcon>
                      <VideocamRounded
                        sx={{
                          color: "black",
                        }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Divider
          orientation="vertical"
          color="lightgrey"
          sx={{
            height: 1040,
          }}
        />
        <Grid
          sx={{
            marginTop: 40,
            marginLeft: 38,
          }}
        >
          <div>
            <Stack
              direction="column"
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <PersonOffRounded
                sx={{
                  height: 100,
                  width: 100,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  maxWidth: 450,
                  maxHeight: 100,
                }}
              >
                These messages are from people who you've restricted or don't
                follow. They won't know that you've viewed their request until
                you allow them to message you.
              </Typography>
            </Stack>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
