import React, { useEffect } from "react";
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

import { ArrowBackRounded, PersonOffRounded } from "@mui/icons-material";
import useReceivePushNotificationHook from "../../../hooks/useReceivePushNotificationHook";
import { useNavigate } from "react-router-dom";
import { useGet_all_conversations_request_of_specific_user } from "../../APIs/SocialMediaMessageInterfaceAPI";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../../redux/MessageSlice";
import { setCurrentInterface } from "../../../redux/UtilitiesSlice";
import { reset_all_messages } from "../../../reduxNonPersist/NonPersistMessages";
import infinity from "../../../static/images/utils/status.png";
export const PendingMessages = () => {
  const { callBack } = useReceivePushNotificationHook();

  const [cookies] = useCookies(["avt_token"]);

  useEffect(() => {
    callBack();
    // eslint-disable-next-line
  }, []);

  const { refetch } = useGet_all_conversations_request_of_specific_user({
    Authorization: cookies?.avt_token,
    userId: localStorage.getItem("sm_user_id"),
  });

  const NonPersistConversations = useSelector(
    (state) => state.NonPersistConversations
  );

  useEffect(() => {
    if (NonPersistConversations?.all_conversation_requests?.length === 0) {
      refetch();
    }
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (communications, communicationData) => {
    const generatedData = {
      userName: communications?.userName,
      profilePic: communications?.profilePic?.at(0),
      conversationId:
        communications?.conversationDetails?.at(0)?.visibleConversationId,
      userId: communications?.userId,
      status: communications?.conversationDetails?.at(0)?.status,
      receiverUserId:
        communications?.conversationDetails?.at(0)?.receiverUserId,
    };

    dispatch(setSelectedConversation(generatedData));

    dispatch(reset_all_messages());

    navigate(
      `/environment/socialMedia/message/${generatedData?.conversationId}`
    );

    dispatch(setCurrentInterface("REGULAR_MESSAGE_CHAT"));
  };

  return (
    <>
      <AISideBar />
      <Grid container>
        <Grid
          sx={{
            marginLeft: 36,
          }}
        >
          <Stack direction="row" marginLeft={3} spacing={3} alignItems="center">
            <ArrowBackRounded
              onClick={() => navigate("/environment/socialMedia/message")}
              sx={{
                cursor: "pointer",
              }}
            />
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
              message requests
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
            {NonPersistConversations?.all_conversation_requests
              ?.at(0)
              ?.map((items) => {
                return (
                  <ListItem
                    key={items?.userName}
                    sx={{
                      width: 520,
                    }}
                  >
                    <ListItemButton
                      disableTouchRipple
                      onClick={() =>
                        handleClick(
                          items,
                          items?.conversationDetails?.filter(
                            (conversationData) =>
                              conversationData?.receiverUserId === items?.userId
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
                          You: {items?.message}
                        </Typography>
                      </ListItemText>
                      <ListItemIcon>
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
