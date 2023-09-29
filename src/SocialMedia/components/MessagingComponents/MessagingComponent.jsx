import React, { useEffect, useState } from "react";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import {
  Avatar,
  InputAdornment,
  InputBase,
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
} from "@mui/icons-material";
import videoPic from "../../../static/images/utils/video.png";
import { useForm } from "react-hook-form";

const socket = new SockJS("http://localhost:9988/websocket");

// Create a Stomp client over the SockJS WebSocket connection
const stompClient = Stomp.over(socket);

export const MessagingComponent = () => {
  const [sendMessages, setSendMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const submit = (data) => {
    console.log(data);
    setSendMessages((prevMessages) => [...prevMessages, data?.message]);
    stompClient.send("/conversation/189", {}, JSON.stringify(data?.message));
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

  const style = {
    recieverMessageStyle: {
      margin: 2.5,
      border: "1px solid white",
      borderRadius: "8px",
      backgroundColor: "rgb(238, 238, 238)",
      padding: 1.5, // Adjust padding as needed
      width: "auto", // This allows the width to expand with content
      display: "inline-block",
      maxWidth: 800,
    },
    senderMessageStyle: {
      margin: 2.5,
      border: "1px solid white",
      borderRadius: "8px",
      backgroundColor: "rgb(238, 238, 238)",
      padding: 1.5, // Adjust padding as needed
      width: "auto", // This allows the width to expand with content
      display: "inline-block",
      maxWidth: 800, // This allows the width to expand with content
    },
  };

  return (
    <>
      <Stack direction="row" spacing={38}>
        <AISideBar />
        <Stack
          direction="column"
          sx={{
            padding: 1.5,
          }}
        >
          <Stack
            sx={{
              border: "1px solid lightblue",
              borderRadius: "10px",
              padding: "8px",
            }}
            direction="row"
            spacing={155}
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={3}>
              <Avatar src={jen2} srcSet={jen2} alt="no image found!" />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                }}
              >
                JennaOrtega
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <PersonalVideoRounded />
              <img
                src={videoPic}
                srcSet={videoPic}
                style={{
                  width: "30px",
                  height: "30px",
                  alignItems: "center",
                }}
                alt="not found!!!"
              />
              <MoreHorizRounded />
            </Stack>
          </Stack>
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
                {sendMessages &&
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
                  })}
                {receivedMessages &&
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
                  })}
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
    </>
  );
};
