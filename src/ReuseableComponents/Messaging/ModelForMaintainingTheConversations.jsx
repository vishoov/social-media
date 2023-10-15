import React, { useEffect } from "react";
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
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { reset_all_messages } from "../../reduxNonPersist/NonPersistMessages";
import { setSelectedConversation } from "../../redux/MessageSlice";
import { setCurrentInterface } from "../../redux/UtilitiesSlice";
import infinity from "../../static/images/utils/status.png";
import { useCookies } from "react-cookie";
import { useGet_all_conversations_of_specific_user } from "../../SocialMedia/APIs/SocialMediaMessageInterfaceAPI";

export const ModelForMaintainingTheConversations = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { conversationId } = useParams();

  const handleClick = (communications, communicationData) => {
    const generatedData = {
      userName: communications?.userName,
      profilePic: communications?.profilePic.at(0),
      conversationId: communicationData?.at(0)?.visibleConversationId,
      userId: communications?.userId,
      status: communicationData?.at(0)?.status,
    };

    if (generatedData?.conversationId !== parseInt(conversationId)) {
      console.log("Generated conversation");
      dispatch(setSelectedConversation(generatedData));
      dispatch(reset_all_messages());
      navigate(
        `/environment/socialMedia/message/${generatedData?.conversationId}`
      );
    }
    dispatch(setCurrentInterface("REGULAR_MESSAGE_CHAT"));
    handleClose();
  };

  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGet_all_conversations_of_specific_user({
    Authorization: cookies?.avt_token,
    userId: localStorage.getItem("sm_user_id"),
  });

  const NonPersistConversations = useSelector(
    (state) => state.NonPersistConversations
  );

  useEffect(() => {
    if (NonPersistConversations?.all_conversations?.length === 0) {
      refetch();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Grid
          container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 800,
            bgcolor: "background.paper",
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
                padding: 1,
              }}
            >
              Send a message
            </Typography>
            <Divider />
            <List
              sx={{
                overflowY: "scroll", // Make the table body scrollable
                maxHeight: 730,
              }}
            >
              {NonPersistConversations?.all_conversations
                ?.at(0)
                ?.map((items) => {
                  return (
                    <ListItem
                      key={items?.userName}
                      sx={{
                        width: 500,
                      }}
                    >
                      <ListItemButton
                        disableTouchRipple
                        onClick={() =>
                          handleClick(
                            items,
                            items?.conversationDetails?.filter(
                              (conversationData) =>
                                conversationData?.receiverUserId ===
                                items?.userId
                            )
                          )
                        }
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={items?.profilePic?.at(0)}
                            srcSet={items?.profilePic?.at(0)}
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
                            You: {items?.userName}
                          </Typography>
                        </ListItemText>
                        <ListItemIcon onClick={() => alert("hello world!")}>
                          <img
                            src={infinity}
                            srcSet={infinity}
                            alt="not found!"
                            style={{
                              height: 30,
                              width: 30,
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
            sx={{
              height: 800,
            }}
            flexItem
          />
          <Grid
            sx={{
              width: 775,
            }}
          ></Grid>
        </Grid>
      </Modal>
    </>
  );
};
