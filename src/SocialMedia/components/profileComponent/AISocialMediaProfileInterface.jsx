import React, { useEffect } from "react";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import { AIUpBar } from "../../../ReuseableComponents/AIUpBar";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import jenPic1 from "../../../static/images/avatar/jen1.jpeg";
import jenPic2 from "../../../static/images/avatar/jen2.jpeg";
import jenPic3 from "../../../static/images/avatar/jen3.jpeg";
import jenPic4 from "../../../static/images/avatar/jen4.jpeg";
import { AvatarFileInput } from "../../../ReuseableComponents/AvatarFileInput";
import TabsComponent from "../../../ReuseableComponents/Tabs";
import { ShowMemoryBar } from "../../../ReuseableComponents/Profile/ShowMemoryBar";
import { ShowSavedMemories } from "../../../ReuseableComponents/Profile/ShowSavedMemories";
import { ShowLinksBar } from "../../../ReuseableComponents/Profile/ShowLinksBar";
import { useDispatch, useSelector } from "react-redux";
import useGetFollowersAndFollowingHook from "../../../hooks/useGetFollowersAndFollowingHook";
import useGetMemoriesCountHook from "../../../hooks/useGetMemoriesCountHook";
import useGetProfileDetailsHook from "../../../hooks/useGetProfileDetailsHook";
import { setRequestedUserSearchDataForPersist } from "../../../redux/SearchSlice";

export const AISocialMediaProfileInterface = () => {
  // redux variables
  const userData = useSelector((state) => state.socialMediaUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRequestedUserSearchDataForPersist(null));
  }, []);

  useGetProfileDetailsHook();

  useGetMemoriesCountHook(localStorage.getItem("sm_user_id"));

  useGetFollowersAndFollowingHook(localStorage.getItem("sm_user_id"));

  return (
    <>
      <div>
        <span>
          <AIUpBar
            editProfile={true}
            settingsSuggested={true}
            shareMemory={true}
            userName={userData?.value?.SocialMediaUserData?.userName}
          />
        </span>
        <span>
          <AISideBar />
        </span>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                marginLeft: 40,
              }}
              position="fixed"
            >
              <Stack direction="row" spacing={3}>
                <Box alignItems="center" flexDirection="column">
                  <Avatar
                    alt="Jenna"
                    src={jenPic1}
                    sx={{
                      width: 100,
                      height: 100,
                    }}
                    style={{
                      marginTop: 15,
                    }}
                  />
                  <Typography variant="subtitle2">Holiday mood!</Typography>
                </Box>
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Avatar
                    alt="Jenna"
                    src={jenPic2}
                    sx={{
                      width: 100,
                      height: 100,
                    }}
                    style={{
                      marginTop: 15,
                    }}
                  />
                  <Typography variant="subtitle2">
                    Hello , Los angales
                  </Typography>
                </Box>
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Avatar
                    alt="Jenna"
                    src={jenPic3}
                    sx={{
                      width: 100,
                      height: 100,
                    }}
                    style={{
                      marginTop: 15,
                    }}
                  />
                  <Typography variant="subtitle2">Paris</Typography>
                </Box>
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Avatar
                    alt="Jenna"
                    src={jenPic4}
                    sx={{
                      width: 100,
                      height: 100,
                    }}
                    style={{
                      marginTop: 15,
                    }}
                  />
                  <Typography variant="subtitle2">work mood</Typography>
                </Box>
              </Stack>
              <Stack direction="column">
                <Box>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "black",
                      paddingLeft: 85,
                    }}
                  >
                    About Me
                  </p>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "black",
                      marginLeft: 10,
                      fontSize: "14px",
                      maxWidth: 500,
                    }}
                  >
                    🚀 🌎 Exploring the universe and our home planet.
                    Verification: nasa.gov/socialmedia
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
          <Box
            sx={{
              paddingRight: 3,
            }}
          >
            <AvatarFileInput
              firstName={userData?.value?.SocialMediaUserData?.firstName}
              lastName={userData?.value?.SocialMediaUserData?.lastName}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "fixed",
            }}
          >
            <TabsComponent
              firstTab={<ShowMemoryBar />}
              secondTab={<ShowLinksBar />}
              thirdTab={<ShowSavedMemories />}
            />
          </Box>
        </Stack>
      </div>
    </>
  );
};
