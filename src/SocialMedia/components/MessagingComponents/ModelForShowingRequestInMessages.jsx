import {
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useUpdate_user_conversation_request_permissions } from "../../APIs/SocialMediaMessageInterfaceAPI";
import { useCookies } from "react-cookie";

export const ModelForShowingRequestInMessages = ({
  open,
  handleClose,
  message,
}) => {
  const { mutate } = useUpdate_user_conversation_request_permissions();

  const [cookies] = useCookies(["avt_token"]);

  const accepted = () => {
    const acceptedData = {
      visible_conversation_id: message?.selectedConversation?.conversationId,
      status: "ACCEPTED",
      Authorization: cookies?.avt_token,
      userId: message?.selectedConversation?.receiverUserId,
    };
    console.log("accepted data ::::", acceptedData);
    mutate(acceptedData);
    handleClose();
  };

  useEffect(() => {
    console.log("message :::", message);
  }, [message]);

  const rejected = () => {
    const rejectedData = {
      visible_conversation_id: message?.selectedConversation?.conversationId,
      status: "REJECTED",
      Authorization: cookies?.avt_token,
      userId: message?.selectedConversation?.receiverUserId,
    };
    console.log("rejected data ::::", rejectedData);
    mutate(rejectedData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid
        container
        sx={{
          position: "absolute",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Grid
          sx={{
            width: 500,
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              Message Request
            </Typography>
            <Divider
              color="lightblue"
              sx={{
                width: 500,
              }}
            />
            <div
              style={{
                padding: 10,
              }}
            >
              <Avatar
                src={message?.selectedConversation?.profilePic}
                srcSet={message?.selectedConversation?.profilePic}
                sx={{
                  width: 150,
                  height: 150,
                }}
              />
            </div>
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
              }}
            >
              {message?.selectedConversation?.userName} wants to chat with you.
            </Typography>
            <Typography
              variant="caption"
              sx={{
                marginTop: 5,
                width: 480,
                textAlign: "center",
              }}
            >
              If you accept, they will also be able to call you and see info,
              such as your activity status and when you've read messages.
            </Typography>
            <ButtonGroup
              size="medium"
              orientation="horizontal"
              sx={{
                marginTop: 5,
              }}
            >
              <Button
                size="medium"
                style={{ width: 250, height: 50, border: "none" }}
                onClick={() => accepted()}
              >
                <Typography variant="subtitle1">Accepted</Typography>
              </Button>
              <Button
                size="large"
                style={{ width: 250, height: 50, border: "none" }}
                onAbort={() => rejected()}
              >
                <Typography color="red" variant="subtitle1">
                  Rejected
                </Typography>
              </Button>
            </ButtonGroup>
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  );
};
