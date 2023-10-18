import { CircleOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserBySearchForMessages } from "../../SocialMedia/APIs/SocialMediaSearchInterfaceApi";
import { useCookies } from "react-cookie";
import { useSaveGroupDetails } from "../../SocialMedia/APIs/SocialMediaMessageInterfaceAPI";

export const SearchModelForMessageInGroup = ({
  openGroupModel,
  handleCloseForGroupModel,
}) => {
  const NonPersistSearch = useSelector((state) => state.NonPersistSearch);

  const { mutate } = useGetUserBySearchForMessages();

  const [cookies] = useCookies(["avt_token"]);

  const handleChange = (search) => {
    const data = {
      search: search,
      Authorization: cookies?.avt_token,
    };
    mutate(data);
  };

  const [chipData, setChipData] = React.useState([]);
  const [groupName, setGroupName] = React.useState("");
  const socialMediaUser = useSelector((state) => state.socialMediaUser);
  const auth = useSelector((state) => state.auth);

  const {
    mutate: mutateForSaveGroupDetails,
    isLoading,
    isSuccess,
  } = useSaveGroupDetails();

  // const [callBack, profilePicUrl] = useGetProfilePicFromCacheHook();

  const handleDelete = (chipToDelete) => {
    setChipData((chips) =>
      chips.filter(
        (chip) =>
          chip?.groupParticipants?.userName !==
          chipToDelete?.groupParticipants?.userName
      )
    );
  };

  const generateUniqueNumber = () => {
    const timeStamp = Date.now();
    const uniqueNumber = timeStamp.toString().slice(-15);
    return parseInt(uniqueNumber);
  };

  const handleClick = () => {
    const defaultValue = {
      userName:
        auth?.value?.signinData?.userName ||
        socialMediaUser?.value?.SocialMediaUserData?.userName,
      userId: parseInt(localStorage.getItem("sm_user_id")),
      status_of_join_of_group: "JOINED",
      role: "ADMIN",
    };

    const generatedData = {
      groupParticipants: [
        defaultValue,
        ...chipData.map((chip) => ({
          userName: chip?.groupParticipants?.userName,
          userId: chip?.groupParticipants?.userId,
          status_of_join_of_group: "NOT_JOINED",
          role: "USER",
        })),
      ],
      visibleGroupConversationId: generateUniqueNumber(),
      groupName: groupName,
    };

    const requiredData = {
      group_details: generatedData,
      Authorization: cookies?.avt_token,
    };

    mutateForSaveGroupDetails(requiredData);
  };

  useEffect(() => {
    if (isLoading && isSuccess) {
      handleCloseForGroupModel();
    }
    // eslint-disable-next-line
  }, [isLoading]);

  const handleClickOfCheckbox = (conversations) => {
    const exist = chipData.filter(
      (chip) => chip?.groupParticipants?.userName === conversations?.userName
    );

    const group_build_data_array_data = {
      profilePic: conversations?.profilePic,
      groupParticipants: {
        userId: conversations?.userId,
        userName: conversations?.userName,
      },
    };

    if (exist.length > 0) {
      handleDelete(conversations);
    } else {
      setChipData([...chipData, group_build_data_array_data]);
    }
  };

  return (
    <>
      <Modal open={openGroupModel} onClose={handleCloseForGroupModel}>
        <Grid
          container
          sx={{
            position: "absolute",
            top: "50%",
            left: "55%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 700,
            bgcolor: "background.paper",
            boxShadow: 2,
            borderRadius: 3,
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
                padding: 2,
              }}
            >
              new group message
            </Typography>
            <Divider color="white" />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                variant="standard"
                placeholder="search..."
                size="small"
                sx={{
                  width: 470,
                  padding: 2,
                }}
                onChange={(data) => handleChange(data.target.value)}
              />
            </div>
            <List
              sx={{
                overflowY: "scroll", // Make the table body scrollable
                maxHeight: 730,
              }}
            >
              {NonPersistSearch?.searchDataForMessages?.length > 0 ? (
                NonPersistSearch?.searchDataForMessages?.map(
                  (communications) => {
                    return (
                      <ListItem key={communications?.profilePic}>
                        <ListItemButton
                          disableTouchRipple
                          // onClick={() => handleClick(communications)}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={communications?.profilePic}
                              srcSet={communications?.profilePic}
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
                              {communications?.userName}
                            </Typography>
                            <Typography variant="caption">
                              {communications?.userName}
                            </Typography>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <Checkbox
                              size="medium"
                              icon={<CircleOutlined />}
                              checkedIcon={<CircleOutlined />}
                              onClick={() => {
                                handleClickOfCheckbox(communications);
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItemButton>
                      </ListItem>
                    );
                  }
                )
              ) : (
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: 500,
                  }}
                >
                  results not found.
                </Typography>
              )}
            </List>
          </Grid>
          <Divider
            orientation="vertical"
            sx={{
              height: 700,
            }}
          />
          <Grid>
            <Stack spacing={2}>
              <TextField
                placeholder="enter a groupname..."
                sx={{
                  width: 280,
                  paddingTop: 2,
                  paddingLeft: 1,
                }}
                variant="standard"
                onChange={(data) => setGroupName(data.target.value)}
              />
              <List
                sx={{
                  paddingLeft: 7,
                  maxHeight: 600,
                  height: 550,
                  overflowY: "scroll", // Make the table body scrollable
                }}
              >
                {chipData.map((data) => {
                  return (
                    <ListItem key={data.groupParticipants?.userName}>
                      <Chip
                        key={data?.groupParticipants?.userName}
                        label={data?.groupParticipants?.userName}
                        onDelete={() => handleDelete(data)}
                        avatar={
                          <Avatar
                            src={data?.profilePic}
                            srcSet={data?.profilePic}
                          />
                        }
                        size="medium"
                        sx={{
                          color: "white",
                          backgroundColor: "rgb(55, 151, 240,1)",
                          paddingRight: 3,
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => handleClick()}
                  variant="contained"
                  sx={{
                    borderRadius: 5,
                    backgroundColor: "rgb(55, 151, 240,1)",
                    width: 260,
                  }}
                  disabled={chipData.length === 0 ? true : false}
                >
                  Group chat
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
