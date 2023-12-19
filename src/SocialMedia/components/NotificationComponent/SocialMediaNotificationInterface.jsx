import React, { useEffect, useState } from "react";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import jen18 from "../../../static/images/avatar/jen18.jpeg";
import useMemoriesSubscribeHook from "../../../hooks/useMemoriesSubscribeHook";
import { useSelector } from "react-redux";
import useReceiveGroupCreationNotificationHook from "../../../hooks/useReceiveGroupCreationNotificationHook";
import { useCookies } from "react-cookie";
import { useUpdateGroupDetails } from "../../APIs/SocialMediaMessageInterfaceAPI";
import { useGetAllNotifications } from "../../APIs/SocialMediaNotificationInterfaceAPI";
import localStorage from "redux-persist/es/storage";

export const SocialMediaNotificationInterface = () => {
  useMemoriesSubscribeHook();

  const NonPersistNotification = useSelector(
    (state) => state.NonPersistNotification
  );

  const [cookies] = useCookies(["avt_token"]);

  const [requiredData, setRequiredData] = useState(null);

  const { refetch } = useGetAllNotifications(requiredData);

  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (requiredData) {
      refetch();
    } else {
      async function fetchNotification() {
        setRequiredData({
          Authorization: cookies?.avt_token,
          userId: await localStorage.getItem("sm_user_id"),
        });
      }
      fetchNotification();
    }
    // eslint-disable-next-line
  }, [requiredData]);

  const getTime = (created) => {
    const nowTimestamp = Date.now();

    const timeDifference = Math.abs(nowTimestamp - Date.parse(created));

    var time = `${Math.floor(timeDifference / 3600000)} hr ago`; // 1 hour = 3600000 milliseconds

    if (Math.floor(timeDifference / 3600000) < 1) {
      time = `${Math.floor((timeDifference % 3600000) / 60000)} minutes ago`; // 1 minute = 60000 milliseconds
    }
    return time;
  };

  const { mutate: mutateForJoinGroup } = useUpdateGroupDetails();

  const join = (visibleGroupConversationId) => {
    const requiredData1 = {
      data: {
        groupParticipants: [
          {
            userId: requiredData?.userId,
            status_of_join_of_group: "JOINED",
          },
        ],
        visibleGroupConversationId: visibleGroupConversationId,
      },
      Authorization: cookies?.avt_token,
    };

    mutateForJoinGroup(requiredData1);
  };

  const { callBack } = useReceiveGroupCreationNotificationHook();

  useEffect(() => {
    callBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box>
        <AISideBar />
      </Box>
      {/*  upbar stack */}

      <Stack>
        <Stack
          sx={{
            marginLeft: 40,
            height: 40,
            alignItems: "center",
          }}
          direction="row"
          spacing={2}
        >
          <Avatar
            src={jen18}
            srcSet={jen18}
            alt="no image found!!!"
            sx={{
              width: 30,
              height: 30,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
            }}
          >
            JennaOrtega
          </Typography>
        </Stack>

        <Divider
          sx={{
            width: 1555,
            marginLeft: 38,
          }}
          color="lightblue"
        />

        <Grid
          container
          sx={{
            width: 1550,
            marginLeft: 38,
          }}
        >
          <Grid
            sx={{
              width: 1000,
              maxHeight: 1000,
              overflowY: "scroll",
            }}
          >
            {NonPersistNotification?.notifications?.map((notifications) => {
              console.log("notifications", notifications);
              return notifications?.notificationType ===
                "MESSAGE_GROUP_CREATION_NOTIFICATION" ? (
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    boxShadow: 4,
                    borderRadius: 2,
                    height: 50,
                    margin: 4,
                    p: 0.2,
                  }}
                  direction="row"
                  spacing={35}
                >
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Avatar
                      src={notifications?.senderProfilePic}
                      srcSet={notifications?.senderProfilePic}
                      alt="not found"
                    />
                    <Typography variant="caption">
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {notifications?.senderUserName}
                      </span>
                      <span
                        style={{
                          paddingLeft: 4,
                        }}
                      >
                        created a group{" "}
                        {
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {notifications?.groupName}
                          </span>
                        }{" "}
                        and you're one of the member of the group.
                      </span>
                    </Typography>
                  </Stack>
                  {notifications?.receiverUserDetails
                    ?.filter(
                      (user) => user?.userId === parseInt(requiredData?.userId)
                    )
                    .at(0)?.status_of_join_of_group === "JOINED" ? (
                    <Button
                      size="medium"
                      style={{
                        width: 100,
                        border: "none",
                        backgroundColor: "rgb(238, 238, 238)",
                        color: "black",
                        height: 35,
                        textTransform: "capitalize",
                        borderRadius: 8,
                      }}
                    >
                      <span>
                        <Typography variant="subtitle1">Joined</Typography>
                      </span>
                    </Button>
                  ) : (
                    <Button
                      size="medium"
                      style={
                        joined
                          ? {
                              width: 100,
                              border: "none",
                              backgroundColor: "rgb(238, 238, 238)",
                              color: "black",
                              height: 35,
                              textTransform: "capitalize",
                              borderRadius: 8,
                            }
                          : {
                              width: 100,
                              border: "none",
                              backgroundColor: "rgb(55, 151, 240,1)",
                              height: 35,
                              textTransform: "capitalize",
                              borderRadius: 8,
                            }
                      }
                      onClick={
                        joined
                          ? null
                          : () => {
                              join(notifications?.visibleGroupConversationId);
                              setJoined(true);
                            }
                      }
                      variant="contained"
                    >
                      <span>
                        {joined ? (
                          <Typography variant="subtitle1">Joined</Typography>
                        ) : (
                          <Typography variant="subtitle1">Join</Typography>
                        )}
                      </span>
                    </Button>
                  )}
                </Stack>
              ) : notifications?.notificationType ===
                "MEMORY_CREATION_NOTIFICATION" ? (
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    boxShadow: 4,
                    borderRadius: 2,
                    height: 50,
                    margin: 4,
                    p: 0.2,
                  }}
                  direction="row"
                  spacing={35}
                >
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Avatar
                      src={notifications?.senderProfilePic}
                      srcSet={notifications?.senderProfilePic}
                      alt="not found"
                    />
                    <Typography variant="caption">
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {notifications?.senderUserName}
                      </span>
                      <span
                        style={{
                          paddingLeft: 4,
                        }}
                      >
                        just shared a memory
                      </span>
                    </Typography>
                  </Stack>
                </Stack>
              ) : null;
            })}
          </Grid>
          <Divider
            orientation="vertical"
            sx={{
              height: 1000,
            }}
            color="lightblue"
          />
          <Grid>
            {/* below upbar stack */}
            <Stack direction="row">
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  marginTop: 5,
                  marginLeft: 40,
                }}
              >
                <List>
                  {NonPersistNotification?.memoriesNotification?.length > 0 &&
                    NonPersistNotification?.memoriesNotification?.map(
                      (data) => {
                        return (
                          <ListItem key={data?.created}>
                            <Box
                              sx={{
                                paddingTop: 3,
                              }}
                            >
                              <Stack
                                sx={{
                                  border: "1px solid lightBlue",
                                  borderRadius: "8px", // Add rounded corners
                                  padding: "8px", // Add some padding for spacing
                                  width: "auto",
                                  maxWidth: 600, // Set a maximum width
                                  wordWrap: "break-word", // Wrap long words to the next line
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                                direction="row"
                              >
                                {/* most inner stack */}
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    alt="Natacha"
                                    srcSet={data?.profileUrl}
                                    src={data?.profileUrl}
                                  />
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        marginRight: 5,
                                      }}
                                    >
                                      {data?.userName} just shared a memory
                                    </Typography>
                                  </Box>
                                </Stack>
                                <Typography variant="caption">
                                  {getTime(data?.created)}
                                </Typography>
                              </Stack>
                            </Box>
                          </ListItem>
                        );
                      }
                    )}
                </List>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
