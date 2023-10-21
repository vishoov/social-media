import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { MarkChatUnreadOutlined } from "@mui/icons-material";

import { SearchModelForMessage } from "./SearchModelForMessage";
import messages from "../../static/images/utils/messages (1).png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSelectedConversation,
  setSelectedGroup,
} from "../../redux/MessageSlice";
import { setCurrentInterface } from "../../redux/UtilitiesSlice";
import { reset_all_messages } from "../../reduxNonPersist/NonPersistMessages";
import infinity from "../../static/images/utils/status.png";
import group from "../../static/images/utils/group.png";
import { SearchModelForMessageInGroup } from "./SearchModelForMessageInGroup";
import { useGetAllGroupConversation } from "../../SocialMedia/APIs/SocialMediaMessageInterfaceAPI";
import { useCookies } from "react-cookie";
import jen24 from "../../static/images/avatar/Jen24.jpeg";

export const RegularMessageChatComponent = ({
  all_conversations,
  all_group_conversations,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openForGroup, setOpenForGroup] = useState(false);
  const handleOpenForGroup = () => setOpenForGroup(true);
  const handleCloseForGroup = () => setOpenForGroup(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (communications, communicationData) => {
    const generatedData = {
      userName: communications?.userName,
      profilePic: communications?.profilePic?.at(0),
      conversationId: communicationData?.at(0)?.visibleConversationId,
      userId: communications?.userId,
      status: communicationData?.at(0)?.status,
    };

    dispatch(setSelectedConversation(generatedData));

    dispatch(reset_all_messages());

    navigate(
      `/environment/socialMedia/message/${generatedData?.conversationId}`
    );

    dispatch(setCurrentInterface("REGULAR_MESSAGE_CHAT"));
  };

  const [cookies] = useCookies(["avt_token"]);

  const [requiredData, setRequiredData] = useState({
    userId: localStorage.getItem("sm_user_id"),
    Authorization: cookies?.avt_token,
  });

  const { refetch } = useGetAllGroupConversation(requiredData);

  useEffect(() => {
    if (requiredData) {
      refetch();
    } else {
      setRequiredData({
        userId: localStorage.getItem("sm_user_id"),
        Authorization: cookies?.avt_token,
      });
    }
    // eslint-disable-next-line
  }, [requiredData]);

  return (
    <>
      <Grid container>
        <Grid
          sx={{
            marginLeft: 36,
          }}
        >
          <Stack
            direction="row"
            marginLeft={4}
            spacing={40}
            alignItems="center"
          >
            <Typography
              variant="overline"
              sx={{
                height: 43,
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                // fontSize: 16,
              }}
            >
              messages
            </Typography>
            <Stack direction="row" spacing={3}>
              {/* <Tooltip title="create new groups">
                <img
                  src={group}
                  srcSet={group}
                  alt="not found!"
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenForGroup}
                />
              </Tooltip> */}
              <Tooltip title="groups">
                <img
                  src={group}
                  srcSet={group}
                  alt="not found!"
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenForGroup}
                />
              </Tooltip>
              <Tooltip title="conversation requests">
                <MarkChatUnreadOutlined
                  onClick={() =>
                    navigate("/environment/socialMedia/message/pending")
                  }
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Stack>
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
              maxHeight: 480,
              height: 480,
            }}
          >
            {all_conversations?.length !== 0 ? (
              all_conversations?.at(0)?.map((items) => {
                return (
                  <ListItem
                    key={items?.userName}
                    sx={{
                      width: 520,
                    }}
                  >
                    <ListItemButton
                      disableTouchRipple
                      onClick={() => {
                        handleClick(
                          items,
                          items?.conversationDetails?.filter(
                            (conversationData) =>
                              conversationData?.receiverUserId === items?.userId
                          )
                        );
                      }}
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
              })
            ) : (
              <div>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    marginLeft: 25,
                    marginTop: 25,
                  }}
                >
                  No messages yet.
                </Typography>
              </div>
            )}
          </List>
          <Typography
            variant="overline"
            sx={{
              fontWeight: "bold",
              marginLeft: 4,
              // marginTop: 50,
            }}
          >
            Groups
          </Typography>
          <Divider
            sx={{
              marginLeft: 2,
              width: 500,
            }}
            color="lightgrey"
          />
          <List
            sx={{
              maxHeight: 445,
              overflowY: "scroll", // Make
            }}
          >
            {all_group_conversations?.length > 0 ? (
              all_group_conversations?.at(0)?.map((items) => {
                return (
                  <ListItem>
                    <ListItemButton
                      disableTouchRipple
                      onClick={() => {
                        navigate(
                          `/environment/socialMedia/message/group/${items?.visibleGroupConversationId}`
                        );
                        dispatch(setSelectedGroup(items));
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={jen24}
                          srcSet={jen24}
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
                          {items?.groupName}
                        </Typography>
                        <Typography variant="caption">
                          You:{items?.groupName}
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
              })
            ) : (
              <div>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    marginLeft: 25,
                    marginTop: 25,
                  }}
                >
                  No group messages yet.
                </Typography>
              </div>
            )}
          </List>
        </Grid>
        <Divider
          orientation="vertical"
          color="lightgrey"
          sx={{
            height: 1044,
          }}
        />
        <Grid>
          <div>
            {/* <Stack direction="row" margin={1} spacing={5}>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  alt="Jenna"
                  src={jen23}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                  // style={{
                  //   marginTop: 12,
                  // }}
                />
              </Box>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  alt="Jenna"
                  src={jen24}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                  // style={{
                  //   marginTop: 12,
                  // }}
                />
              </Box>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  alt="Jenna"
                  src={jen25}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                  // style={{
                  //   marginTop: 12,
                  // }}
                />
              </Box>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  alt="Jenna"
                  src={jen26}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                  // style={{
                  //   marginTop: 12,
                  // }}
                />
              </Box>
            </Stack> */}
            {/* <Divider
              sx={{
                width: 1050,
              }}
            /> */}
            <Stack
              marginTop={40}
              marginLeft={45}
              direction="column"
              spacing={2}
              alignItems="center"
            >
              <img
                src={messages}
                srcSet={messages}
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
          <SearchModelForMessage open={open} handleClose={handleClose} />
          <SearchModelForMessageInGroup
            openGroupModel={openForGroup}
            handleCloseForGroupModel={handleCloseForGroup}
          />
        </Grid>
      </Grid>
    </>
  );
};
