import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Context as profileContext } from "../../context/ProfileContext";
import { AIButton } from "../AIButton";
import { useGetFollowersWithProfilePics } from "../../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";

export const AIShowFollowersList = ({ closeEvent, userId }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [requiredData, setRequiredData] = useState(null);

  const [cookies] = useCookies(["avt_token"]);

  const {
    state: { Followers },
  } = useContext(profileContext);

  const { refetch } = useGetFollowersWithProfilePics(requiredData);

  const handleClose = () => {
    setOpen(false);
    closeEvent();
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const callBack = useCallback(() => {
    if (requiredData) {
      refetch();
    } else {
      setRequiredData({
        Authorization: cookies?.avt_token,
        userId: userId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredData]);

  useEffect(() => {
    callBack();
  }, [callBack]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullScreen={fullScreen}
      >
        <DialogTitle
          id="responsive-dialog-title"
          textAlign="center"
          borderBottom="1px solid lightblue"
          fontWeight="bold"
          fontSize="15px"
        >
          Followers
        </DialogTitle>
        <DialogContent>
          <List>
            {Followers?.at(0)?.map((items) => {
              return (
                <ListItem disableGutters key={items?.userName}>
                  <Stack direction="row" spacing={15} alignItems="center">
                    <Box flexDirection="row" display="flex" alignItems="center">
                      <Avatar
                        src={items?.profileUrl}
                        srcSet={items?.profileUrl}
                        alt="not found"
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        paddingLeft={1}
                      >
                        {items?.userName}
                      </Typography>
                    </Box>
                    <AIButton content="Follower" />
                  </Stack>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};
