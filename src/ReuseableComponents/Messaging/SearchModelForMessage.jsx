import { SearchRounded, VideocamRounded } from "@mui/icons-material";
import {
  Avatar,
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
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Context as SearchContext } from "../../context/SearchContext";
import { useCookies } from "react-cookie";
import { useGetUserBySearchForMessages } from "../../SocialMedia/APIs/SocialMediaSearchInterfaceApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedConversation } from "../../redux/MessageSlice";
<<<<<<< HEAD
import { Context as MessageContext } from "../../context/MessageContext";
=======
>>>>>>> defdabe (NEW)

export const SearchModelForMessage = ({ open, handleClose }) => {
  const {
    state: { searchDataForMessages },
  } = useContext(SearchContext);

<<<<<<< HEAD
  const { set_sent_messages } = useContext(MessageContext);

=======
>>>>>>> defdabe (NEW)
  const { mutate } = useGetUserBySearchForMessages();

  const [cookies] = useCookies(["avt_token"]);

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
<<<<<<< HEAD
    set_sent_messages({ should_be_empty: true });
=======
>>>>>>> defdabe (NEW)
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
