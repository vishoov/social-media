import React, { useCallback, useEffect, useState } from "react";

import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import { AIUpBar } from "../../../ReuseableComponents/AIUpBar";
import {
  Avatar,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import jenPic1 from "../../../static/images/avatar/jen2.jpeg";
import jenPic2 from "../../../static/images/avatar/jen3.jpeg";
import jenPic3 from "../../../static/images/avatar/jen4.jpeg";
import jenPic4 from "../../../static/images/avatar/jen5.jpeg";
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
import { AIShowFollowingList } from "../../../ReuseableComponents/Profile/AIShowFollowingList";
import { useCookies } from "react-cookie";
import { useGetAllMemories } from "../../APIs/SocialMediaMemoryInterfaceAPI";
import { AIShowFollowersList } from "../../../ReuseableComponents/Profile/AIShowFollowersList";

const PAGE_SIZE = 12;

export const AISocialMediaProfileInterface = () => {
  // redux variables
  const userData = useSelector((state) => state.socialMediaUser);

  const [renderFollowingList, setRenderFollowingList] = useState(false);
  const [renderFollowersList, setRenderFollowersList] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRequestedUserSearchDataForPersist(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGetProfileDetailsHook();

  useGetMemoriesCountHook(localStorage.getItem("sm_user_id"));

  useGetFollowersAndFollowingHook(localStorage.getItem("sm_user_id"));

  const [loading, setLoading] = useState(false);
  const [requiredData, setRequiredData] = useState(null);

  const [cookies] = useCookies();

  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);

  const { refetch } = useGetAllMemories(requiredData);

  const handleScroll = (e) => {
    const target = e.target;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    if (Math.round(scrollHeight - scrollTop) - 1 <= clientHeight && !loading) {
      console.log("reached end");
      // User has scrolled to the end of the ImageList.
      setLoading(true);

      const memoryData = {
        Authorization: cookies?.avt_token,
        userId: localStorage.getItem("sm_user_id"),

        pageNumber:
          Math.ceil(
            NonPersistMemories?.socialMediaMemories?.length / PAGE_SIZE
          ) + 1,
      };
      setRequiredData(memoryData);
    }
  };

  const callBack = useCallback(() => {
    if (requiredData && loading === true) {
      // Fetch more memories using your API and append them to socialMediaMemories
      refetch();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredData]);

  useEffect(() => {
    callBack();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callBack]);

  return (
    <>
      <AISideBar />
      <div
        onScroll={handleScroll}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <AIUpBar
          editProfile={true}
          settingsSuggested={true}
          shareMemory={true}
          userName={userData?.value?.SocialMediaUserData?.userName}
          onClickOfFollowingList={() => setRenderFollowingList(true)}
          onClickOfFollowersList={() => setRenderFollowersList(true)}
        />
        {/* components which should be render on some event */}
        {renderFollowingList && (
          <AIShowFollowingList
            closeEvent={() => setRenderFollowingList(false)}
            userId={localStorage.getItem("sm_user_id")}
          />
        )}

        {renderFollowersList && (
          <AIShowFollowersList
            closeEvent={() => setRenderFollowersList(false)}
            userId={localStorage.getItem("sm_user_id")}
          />
        )}

        {loading && <CircularProgress />}
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
              spacing={8}
              sx={{
                marginLeft: 40,
              }}
            >
              <Stack direction="row" spacing={3}>
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Avatar
                    alt="Jenna"
                    src={jenPic1}
                    sx={{
                      width: 100,
                      height: 100,
                    }}
                    style={{
                      marginTop: 12,
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
                      marginTop: 12,
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
                      marginTop: 12,
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
                      marginTop: 12,
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
          <Box>
            <AvatarFileInput
              firstName={userData?.value?.SocialMediaUserData?.firstName}
              lastName={userData?.value?.SocialMediaUserData?.lastName}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <TabsComponent
            firstTab={<ShowMemoryBar />}
            secondTab={<ShowLinksBar />}
            thirdTab={<ShowSavedMemories />}
          />
        </Stack>
      </div>
    </>
  );
};
