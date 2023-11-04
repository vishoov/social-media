import { VideocamRounded } from "@mui/icons-material";
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
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";
import { useGetUserBySearchForMessages } from "../../../SocialMedia/APIs/SocialMediaSearchInterfaceApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedConversation } from "../../../redux/MessageSlice";
import { reset_all_messages } from "../../../reduxNonPersist/NonPersistMessages";

export const SearchModelForMessage = ({ open, handleClose }) => {
  const { mutate } = useGetUserBySearchForMessages();

  const [cookies] = useCookies(["avt_token"]);

  const handleChange = (search) => {
    const data = {
      search: search,
      Authorization: cookies?.avt_token,
    };
    mutate(data);
  };

  const NonPersistSearch = useSelector((state) => state.NonPersistSearch);

  const generateUniqueNumber = () => {
    const timeStamp = Date.now();
    const uniqueNumber = timeStamp.toString().slice(-15);
    return parseInt(uniqueNumber);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (communications) => {
    const generatedData = {
      userName: communications?.userName,
      profilePic: communications?.profilePic,
      conversationId: generateUniqueNumber(),
      userId: communications?.userId,
    };

    dispatch(setSelectedConversation(generatedData));

    dispatch(reset_all_messages());

    navigate(
      `/environment/socialMedia/message/${generatedData?.conversationId}`
    );
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Grid
          container
          sx={{
            position: "absolute",
            top: "50%",
            left: "55%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 700,
            bgcolor: "background.paper",
            boxShadow: 10,
            borderRadius: 2,
          }}
        >
          <Grid
            sx={{
              width: 500,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                justifyContent: "center",
                display: "flex",
                padding: 2,
              }}
            >
              new message
            </Typography>

            <Divider color="white" />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              <TextField
                variant="standard"
                placeholder="search..."
                size="small"
                onChange={(data) => handleChange(data.target.value)}
                sx={{
                  width: 470,
                  padding: 2,
                }}
              />
            </div>
            <List
              sx={{
                overflowY: "scroll", // Make the table body scrollable
                maxHeight: 730,
              }}
            >
              {NonPersistSearch?.searchDataForMessages?.length > 0 ? (
                NonPersistSearch?.searchDataForMessages?.map(
                  (communications) => {
                    return (
                      <ListItem key={communications?.profilePic}>
                        <ListItemButton
                          disableTouchRipple
                          onClick={() => handleClick(communications)}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={communications?.profilePic}
                              srcSet={communications?.profilePic}
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
                              {communications?.userName}
                            </Typography>
                            <Typography variant="caption">
                              {communications?.userName}
                            </Typography>
                          </ListItemText>
                          <ListItemIcon>
                            <VideocamRounded htmlColor="black" />
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    );
                  }
                )
              ) : (
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  results not found.
                </Typography>
              )}
            </List>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
