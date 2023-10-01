import React, { useEffect, useState } from "react";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import {
  Avatar,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import jen2 from "../../../static/images/avatar/jen2.jpeg";
import {
  InsertPhotoRounded,
  MicRounded,
  MoreHorizRounded,
  PersonalVideoRounded,
  SentimentSatisfiedRounded,
  VideocamRounded,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import space5 from "../../../static/images/avatar/space5.jpeg";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const socket = new SockJS("http://localhost:9988/websocket");

// Create a Stomp client over the SockJS WebSocket connection
const stompClient = Stomp.over(socket);

const style = {
  recieverMessageStyle: {
    margin: 1.5,
    border: "1px solid white",
    borderRadius: "8px",
    backgroundColor: "rgb(238, 238, 238)",
    padding: 1.3, // Adjust padding as needed
    width: "auto", // This allows the width to expand with content
    display: "inline-block",
    maxWidth: 800,
  },
  senderMessageStyle: {
    margin: 1.5,
    border: "1px solid white",
    borderRadius: "8px",
    // backgroundColor: "rgb(238, 238, 238)",
    backgroundColor: "rgb(55, 151, 240,1)",
    color: "white",
    padding: 1.3, // Adjust padding as needed
    width: "auto", // This allows the width to expand with content
    display: "inline-block",
    maxWidth: 800, // This allows the width to expand with content
  },
};

export const MessagingComponent = () => {
  const [sendMessages, setSendMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const { conversationId } = useParams();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = (data) => {
    const buildMessage = {
      primaryKeys: {
        user_id: localStorage.getItem("sm_user_id"),
        visible_conversation_id: conversationId,
        type: "TEXT",
      },
      message: data?.message,
    };

    console.log("build message :", buildMessage);
    // setSendMessages((prevMessages) => [...prevMessages, data?.message]);

    stompClient.send(
      `/conversation/${conversationId}`,
      {},
      JSON.stringify(buildMessage)
    );
  };
  useEffect(() => {
    // Connect to the WebSocket server

    stompClient.connect({}, (frame) => {
      // Subscribe to the topic where Kafka messages are sent
      stompClient.subscribe(`/conversation/189`, (message) => {
        // Handle incoming messages here

        const data = JSON.parse(message?.body);
        console.log(data);

        setReceivedMessages((prevMessages) => [...prevMessages, data]);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataOfCommunication = [
    {
      username: "JennaOrtega",
      url: jen2,
      message: "hi om",
    },
    {
      username: "omshan0408",
      url: space5,
      message: "hi jenna",
    },
  ];

  const message = useSelector((state) => state.message);

  return (
    <>
      <Stack direction="row" spacing={37.5}>
        <AISideBar />
        <Stack
          direction="column"
          sx={{
            padding: 1.5,
          }}
        >
          <Stack
            sx={{
              padding: "7px",
            }}
            direction="row"
            spacing={123}
            alignItems="center"
          >
            <Chip
              onClick={handleOpen}
              avatar={
                <Avatar
                  src={message?.selectedConversation?.profilePic}
                  srcSet={message?.selectedConversation?.profilePic}
                  alt="not found!"
                />
              }
              label={message?.selectedConversation?.userName}
              variant="outlined"
              size="medium"
              sx={{
                paddingLeft: "5px",
                paddingRight: "300px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
              <PersonalVideoRounded
                sx={{
                  fontSize: "20px",
                }}
              />
              <VideocamRounded />
              <MoreHorizRounded />
            </Stack>
          </Stack>
          <Divider
            color="lightblue"
            sx={{
              width: 1540,
            }}
          />
          <div
            style={{
              height: 900,
              overflowY: "scroll", // Make the table body scrollable
              maxHeight: 900,
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: 1,
                    }}
                    variant="caption"
                    color="grey"
                  >
                    Sun 13:54
                  </Typography>
                </TableRow>
                {/* {sendMessages &&
                  sendMessages?.map((message) => {
                    return (
                      <TableRow>
                        <Typography
                          sx={style?.recieverMessageStyle}
                          variant="body1"
                        >
                          {message}
                        </Typography>
                      </TableRow>
                    );
                  })} */}
                {/* {receivedMessages &&
                  receivedMessages?.map((message) => {
                    return (
                      <TableRow
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <Typography
                          sx={style?.senderMessageStyle}
                          variant="body1"
                        >
                          {message}
                        </Typography>
                      </TableRow>
                    );
                  })} */}
                <TableRow>
                  <Typography sx={style?.recieverMessageStyle} variant="body1">
                    hi om
                  </Typography>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Typography sx={style?.senderMessageStyle} variant="body1">
                    hi jenna, how are you?
                  </Typography>
                </TableRow>
                <TableRow>
                  <Typography sx={style?.recieverMessageStyle} variant="body1">
                    i'm fine, how are you?
                  </Typography>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Typography sx={style?.senderMessageStyle} variant="body1">
                    i'm also fine!
                  </Typography>
                </TableRow>
                <TableRow>
                  <Typography sx={style?.recieverMessageStyle} variant="body1">
                    what's your plan for this cristmas?
                  </Typography>
                </TableRow>
                <TableRow>
                  <Typography sx={style?.recieverMessageStyle} variant="body1">
                    🎄🎄🎅
                  </Typography>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Typography sx={style?.senderMessageStyle} variant="body1">
                    i think we should go to the church or tample something, what
                    do you think
                  </Typography>
                </TableRow>
                <TableRow>
                  <Typography sx={style?.recieverMessageStyle} variant="body1">
                    i think that's a great idea!🤍🩷
                  </Typography>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <SentimentSatisfiedRounded
              sx={{
                fontSize: 30,
              }}
            />

            <Paper
              sx={{
                border: "1px solid white",
                borderRadius: "10px",
                padding: "4px",
              }}
              elevation={1}
            >
              <InputBase
                placeholder="send a message..."
                sx={{
                  width: 1300,
                  height: 40,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(submit)();
                    reset({ message: null });
                  }
                }}
                {...register("message", { required: true })}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </Paper>
            <InsertPhotoRounded
              sx={{
                fontSize: 30,
              }}
            />
            <MicRounded
              sx={{
                fontSize: 30,
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      {/* model for the choosing the person */}
      <Modal open={open} onClose={handleClose}>
        <Grid
          container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1250,
            height: 800,
            // bgcolor: "background.paper",
            bgcolor: "transparent",
            boxShadow: 10,
            // p: 1,
            borderRadius: 2,
          }}
        >
          <Grid
            sx={{
              width: 450,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                color: "white",
                padding: 1,
              }}
            >
              Send a message
            </Typography>
            <Divider color="white" />
            <List
              sx={{
                overflowY: "scroll", // Make the table body scrollable
                maxHeight: 730,
              }}
            >
              {dataOfCommunication.map((communications) => {
                return (
                  <ListItem key={communications?.username}>
                    <ListItemButton
                      disableTouchRipple
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={communications?.url}
                          srcSet={communications?.url}
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
                            color: "white",
                          }}
                        >
                          {communications?.username}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "white",
                          }}
                        >
                          You: {communications?.message}
                        </Typography>
                      </ListItemText>
                      <ListItemIcon>
                        <VideocamRounded htmlColor="white" />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Divider orientation="vertical" color="white" flexItem />
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
