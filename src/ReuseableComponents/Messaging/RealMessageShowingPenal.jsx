import React, { useCallback, useEffect } from "react";
import { Table, TableBody, TableRow, Typography } from "@mui/material";
import useReceiverMessageHook from "../../hooks/useReceiverMessageHook";
import useGetMessagesOfParticularConversationHook from "../../hooks/useGetMessagesOfParticularConversationHook";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
    cursor: "pointer",
  },
  senderMessageStyle: {
    margin: 1.5,
    border: "1px solid white",
    borderRadius: "8px",
    backgroundColor: "rgb(55, 151, 240,1)",
    color: "white",
    padding: 1.3, // Adjust padding as needed
    width: "auto", // This allows the width to expand with content
    display: "inline-block",
    maxWidth: 800, // This allows the width to expand with content
    cursor: "pointer",
  },
};

export const RealMessageShowingPenal = () => {
  const { conversationId } = useParams();

  const message = useSelector((state) => state.message);

  const MessageNonPersist = useSelector((state) => state.NonPersistMessage);

  // message subscription hook
  const { callBack } = useReceiverMessageHook(
    conversationId,
    message,
    MessageNonPersist?.all_messages
  );

  const newCallBackForRenderingMessages = useCallback(() => {
    callBack();
    // eslint-disable-next-line
  }, []);

  // hooks for getting messages of particular conversation
  // const { callBack: callBackOfMessages } =
  //   useGetMessagesOfParticularConversationHook(conversationId, message);

  // const newCallBackForMessages = useCallback(() => {
  //   callBackOfMessages();
  //   // eslint-disable-next-line
  // }, []);

  // receive messages from the server
  useEffect(() => {
    newCallBackForRenderingMessages();

    // if (MessageNonPersist?.all_messages?.length === 0) {
    //   console.log("all messages is empty");
    //   newCallBackForMessages();
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("message not persist:", MessageNonPersist?.all_messages);
  }, [MessageNonPersist]);

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

            {MessageNonPersist &&
              MessageNonPersist?.all_messages?.map((message) => {
                return message?.userId ===
                  parseInt(localStorage.getItem("sm_user_id")) ||
                  message?.primaryKeys?.userId ===
                    parseInt(localStorage.getItem("sm_user_id")) ? (
                  <TableRow
                    key={message?.message}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    {message?.primaryKeys?.type === "IMAGE" ? (
                      <img
                        src={message?.message}
                        alt="not found!"
                        style={style.recieverMessageStyle}
                        width={500}
                        height={500}
                      />
                    ) : (
                      <Typography
                        sx={style?.senderMessageStyle}
                        variant="body1"
                      >
                        {message?.message}
                      </Typography>
                    )}
                  </TableRow>
                ) : (
                  <TableRow key={message}>
                    {message?.primaryKeys?.type === "IMAGE" ? (
                      <img
                        src={message?.message}
                        alt="not found!"
                        style={style.recieverMessageStyle}
                        width={500}
                        height={500}
                      />
                    ) : (
                      <Typography
                        sx={style?.recieverMessageStyle}
                        variant="body1"
                      >
                        {message?.message}
                      </Typography>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
