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

import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AIButton } from "../../../ReuseableComponents/AIButton";
import { useGetFollowersWithProfilePics } from "../../../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import { useSelector } from "react-redux";

export const AIShowFollowersList = ({ closeEvent, userId }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [requiredData, setRequiredData] = useState(null);

  const [cookies] = useCookies(["avt_token"]);

  const NonPersistProfile = useSelector((state) => state.NonPersistProfile);

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
            {NonPersistProfile?.Followers?.map((items) => {
              return (
                <ListItem disableGutters key={items?.at(0)?.userName}>
                  <Stack direction="row" spacing={15} alignItems="center">
                    <Box flexDirection="row" display="flex" alignItems="center">
                      <Avatar
                        src={items?.at(0)?.profileUrl}
                        srcSet={items?.at(0)?.profileUrl}
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
                        width={120}
                      >
                        {items?.at(0)?.userName}
                      </Typography>
                    </Box>
                    <AIButton content="Follow" />
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
