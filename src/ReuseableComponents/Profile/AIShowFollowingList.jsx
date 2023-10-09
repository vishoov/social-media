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
<<<<<<< HEAD
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AIButton } from "../AIButton";
import { useGetFollowingsWithProfilePics } from "../../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";
import { Context as profileContext } from "../../context/ProfileContext";
=======
import React, { useCallback, useEffect, useState } from "react";
import { AIButton } from "../AIButton";
import { useGetFollowingsWithProfilePics } from "../../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
>>>>>>> defdabe (NEW)

export const AIShowFollowingList = ({ closeEvent, userId }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [requiredData, setRequiredData] = useState(null);

  const { refetch } = useGetFollowingsWithProfilePics(requiredData);
  const [cookies] = useCookies(["avt_token"]);

<<<<<<< HEAD
  const {
    state: { Followings },
  } = useContext(profileContext);
=======
  const NonPersistProfile = useSelector((state) => state.NonPersistProfile);
>>>>>>> defdabe (NEW)

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
          Followings
        </DialogTitle>
        <DialogContent>
          <List>
<<<<<<< HEAD
            {Followings?.at(0)?.map((items) => {
=======
            {NonPersistProfile?.Followings?.at(0)?.map((items) => {
>>>>>>> defdabe (NEW)
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
                    <AIButton content="Following" />
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
