import React, { useCallback, useContext, useEffect } from "react";
import { Context as MessageContext } from "../../context/MessageContext";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Table, TableBody, TableRow, Typography } from "@mui/material";

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

export const RealMessageShowingPenal = () => {
  const {
    state: { sent_messages, received_messages },
    set_received_messages,
  } = useContext(MessageContext);

  const socket = new SockJS("http://localhost:9986/websocket");

  const stompClient = Stomp.over(socket);

  const callBack = useCallback(() => {
    stompClient.connect({}, (frame) => {
      // Subscribe to the topic where Kafka messages are sent
      stompClient.subscribe(
        `/push/notification/to/accepted/${localStorage.getItem("sm_user_id")}`,
        (message) => {
          // Handle incoming messages here

          const data = JSON.parse(message?.body);
          console.log(data);

          set_received_messages(data);
        }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    callBack();
  }, [callBack]);

  return (
    <>
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
            {sent_messages &&
              sent_messages?.map((message) => {
                return (
                  <TableRow
                    key={message?.message}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Typography sx={style?.senderMessageStyle} variant="body1">
                      {message?.message}
                    </Typography>
                  </TableRow>
                );
              })}
            {received_messages &&
              received_messages?.map((message) => {
                return (
                  <TableRow key={message}>
                    <Typography
                      sx={style?.recieverMessageStyle}
                      variant="body1"
                    >
                      {message}
                    </Typography>
                  </TableRow>
                );
              })}
            {/* <TableRow>
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
                </TableRow> */}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
