import React, { useEffect } from "react";
import { RegularMessageShowingPanel } from "./RegularMessageShowingPanel";
import { useSelector } from "react-redux";
import { PendingMessageShowingPenal } from "./PendingMessageShowingPenal";
import { useParams } from "react-router-dom";
import useGetMessagesOfParticularConversationHook from "../../../hooks/useGetMessagesOfParticularConversationHook";
// const socketForSendMessage1 = new SockJS("http://localhost:9988/websocket");

// Create a Stomp client over the SockJS WebSocket connection
// const stompClientForSendMessage1 = Stomp.over(socketForSendMessage1);

// const RealMessageShowingPenalHandler = React.memo(() => {
//   return <RealMessageShowingPenal />;
// });

export const MessagingComponent = () => {
  // const { register, handleSubmit, reset } = useForm({
  //   defaultValues: {
  //     message: "",
  //   },
  // });

  // const { conversationId } = useParams();

  // const message = useSelector((state) => state.message);

  // const [open, setOpen] = useState(false);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const submit = (data) => {
  //   if (data && data?.message) {
  //     const buildMessage = {
  //       primaryKeys: {
  //         userId: parseInt(localStorage.getItem("sm_user_id")),
  //         type: "TEXT",
  //       },
  //       visibleConversationId: parseInt(
  //         message?.selectedConversation?.conversationId || conversationId
  //       ),
  //       message: data?.message,
  //       receiverUserId: message?.selectedConversation?.userId,
  //     };
  //     stompClientForSendMessage1.send(
  //       `/conversation/${
  //         message?.selectedConversation?.conversationId || conversationId
  //       }`,
  //       {},
  //       JSON.stringify(buildMessage)
  //     );
  //   }
  // };

  const messages = useSelector((state) => state.message);

  const { conversationId } = useParams();

  const MessageNonPersist = useSelector((state) => state.NonPersistMessage);

  const { callBack: callBackOfMessages } =
    useGetMessagesOfParticularConversationHook(conversationId, messages);

  useEffect(() => {
    if (MessageNonPersist?.all_messages?.length === 0) {
      callBackOfMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <Stack direction="row" spacing={37.5}>
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

            spacing={122}
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
                fontWeight: "bold",
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

          <RealMessageShowingPenalHandler />
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

 */}
      {/* model for the choosing the person */}
      {/* <ModelForMaintainingTheConversations
        open={open}
        handleClose={handleClose}
      /> */}

      {messages?.selectedConversation?.status === "ACCEPTED" ? (
        <RegularMessageShowingPanel />
      ) : (
        <PendingMessageShowingPenal />
      )}
    </>
  );
};
