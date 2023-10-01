import React, { useContext } from "react";
import message from "../../static/images/utils/messages (1).png";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useGetUserBySearchForMessages } from "../../SocialMedia/APIs/SocialMediaSearchInterfaceApi";
import { useCookies } from "react-cookie";
import { Context as SearchContext } from "../../context/SearchContext";
import { SearchRounded, VideocamRounded } from "@mui/icons-material";
import { AISideBar } from "../AISideBar";
import { setSelectedConversation } from "../../redux/MessageSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const WelcomeMessaging = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // end point for searching user by name
  const { mutate } = useGetUserBySearchForMessages();

  // context store for searched results
  const {
    state: { searchDataForMessages },
  } = useContext(SearchContext);

  const [cookies] = useCookies(["avt_token"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (search) => {
    const data = {
      search: search,
      Authorization: cookies?.avt_token,
    };
    mutate(data);
  };

  const generateUniqueNumber = () => {
    const timeStamp = Date.now();
    const uniqueNumber = timeStamp.toString().slice(-15);
    return parseInt(uniqueNumber);
  };

  const handleClick = (communications) => {
    const generatedData = {
      userName: communications?.userName,
      profilePic: communications?.profilePic,
      conversationId: generateUniqueNumber(),
    };

    dispatch(setSelectedConversation(generatedData));
    navigate(
      `/environment/socialMedia/message/${generatedData?.conversationId}`
    );
  };

  return (
    <>
      <AISideBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          width: "110vw",
        }}
      >
        <Stack direction="column" spacing={2} alignItems="center">
          <img
            src={message}
            srcSet={message}
            style={{
              height: 150,
              width: 150,
            }}
            alt="not found!"
          />
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
            }}
          >
            Send a message to your friends and all you love.
          </Typography>
          <Button onClick={handleOpen}>send message</Button>
        </Stack>
      </div>

      {/* message search user model */}
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
                display: "flex",
                justifyContent: "center",
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
                label="Search..."
                size="small"
                onChange={(data) => handleChange(data.target.value)}
                sx={{
                  width: 470,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchRounded />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <List
              sx={{
                overflowY: "scroll", // Make the table body scrollable
                maxHeight: 730,
              }}
            >
              {searchDataForMessages?.length > 0 ? (
                searchDataForMessages?.map((communications) => {
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
                })
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
