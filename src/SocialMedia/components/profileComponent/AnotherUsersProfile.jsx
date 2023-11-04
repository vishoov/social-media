import React, { useCallback, useEffect, useState } from "react";

import { AIAnotherUserUpBar } from "../../../ReuseableComponents/AIAnotherUserUpBar";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { ShowLinksBar } from "../profileComponent/ShowLinksBar";
import { ShowSavedMemories } from "../profileComponent/ShowSavedMemories";
import TabsComponent from "../../../ReuseableComponents/Tabs";
import jenPic1 from "../../../static/images/avatar/jen1.jpeg";
import jenPic2 from "../../../static/images/avatar/jen2.jpeg";
import jenPic3 from "../../../static/images/avatar/jen3.jpeg";
import jenPic4 from "../../../static/images/avatar/jen4.jpeg";
import { ShowMemoryBarOfAnotherUsers } from "../profileComponent/ShowMemoryBarOfAnotherUsers";

import { useParams } from "react-router-dom";
import { useGetUserProfileInfo } from "../../APIs/SocialMediaSearchInterfaceApi";
import { useCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import useGetMemoriesCountHook from "../../../hooks/useGetMemoriesCountHook";
import { useGetAllMemoriesForOtherUser } from "../../APIs/SocialMediaMemoryInterfaceAPI";
import { AIShowFollowingList } from "../profileComponent/AIShowFollowingList";
import { setRequestUserSearchData } from "../../../reduxNonPersist/NonPersistSearchSlice";
import { AIShowFollowersList } from "../profileComponent/AIShowFollowersList";

const PAGE_SIZE = 12;

export const AnotherUsersProfile = () => {
  const [renderFollowingList, setRenderFollowingList] = useState(false);

  const [renderFollowersList, setRenderFollowersList] = useState(false);

  const { username } = useParams();

  const NonPersistSearch = useSelector((state) => state.NonPersistSearch);

  const dispatch = useDispatch();

  const search = useSelector((state) => state.search);

  const [cookies] = useCookies(["avt_token"]);

  const { mutate: mutateUserProfile, data } = useGetUserProfileInfo();

  useGetMemoriesCountHook(search?.requestedUserSearchdataForPersist?.userId);

  const callBack = useCallback(() => {
    if (data?.status === 200) {
      dispatch(setRequestUserSearchData(data?.data?.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);

  useEffect(() => {
    if (data?.data?.data === undefined || data?.data?.data === null) {
      mutateUserProfile({
        username: search?.requestedUserSearchdataForPersist?.userName,
        Authorization: cookies?.avt_token,
      });
    } else {
      if (data?.status === 200) {
        dispatch(setRequestUserSearchData(data?.data?.data));
      }
    }
    // callBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callBack, data?.status, data?.data?.data]);

  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);

  const [loading, setLoading] = useState(false);
  const [requiredData, setRequiredData] = useState(null);

  const { refetch } = useGetAllMemoriesForOtherUser(requiredData);

  const handleScroll = (e) => {
    const target = e.target;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    if (Math.round(scrollHeight - scrollTop) <= clientHeight && !loading) {
      // User has scrolled to the end of the ImageList.
      setLoading(true);

      const memoryData = {
        Authorization: cookies?.avt_token,
        userId:
          search?.requestedUserSearchdataForPersist?.userId ||
          NonPersistSearch?.requestUserSearchData?.userPersonalDetails?.userId,
        pageNumber:
          Math.ceil(
            NonPersistMemories?.socialMediaMemoriesOfAnotherUser?.length /
              PAGE_SIZE
          ) + 1,
      };
      setRequiredData(memoryData);
    }
  };

  const callBack1 = useCallback(() => {
    if (requiredData) {
      // Fetch more memories using your API and append them to socialMediaMemories
      refetch();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredData]);

  useEffect(() => {
    callBack1();
  }, [callBack1]);

  return (
    <>
      <AISideBar />
      <div
        onScroll={handleScroll}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <AIAnotherUserUpBar
          MoreButton={true}
          follow={true}
          message={true}
          userName={
            NonPersistSearch?.requestUserSearchData?.userPersonalDetails
              ?.userName || username
          }
          onClickOfFollowingList={() => setRenderFollowingList(true)}
          onClickOfFollowersList={() => setRenderFollowersList(true)}
        />
        {renderFollowingList && (
          <AIShowFollowingList
            closeEvent={() => setRenderFollowingList(false)}
            userId={search?.requestedUserSearchdataForPersist?.userId}
          />
        )}

        {renderFollowersList && (
          <AIShowFollowersList
            closeEvent={() => setRenderFollowersList(false)}
            userId={search?.requestedUserSearchdataForPersist?.userId}
          />
        )}

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
          <Box>
            <Avatar
              alt="Avatar"
              id="avatar"
              src={NonPersistSearch?.requestUserSearchData?.userProfilePics

                ?.at(0)
                ?.profile_details?.at(0)
                ?.urls?.at(0)}
              sx={{
                width: 280,
                height: 280,
                cursor: "pointer",
              }}
              style={{
                margin: 10,
              }}
            />
            <p
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <b>
                {
                  NonPersistSearch?.requestUserSearchData?.userPersonalDetails
                    ?.firstName
                }{" "}
                {
                  NonPersistSearch?.requestUserSearchData?.userPersonalDetails
                    ?.lastName
                }
              </b>
            </p>
          </Box>
        </Stack>
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <Box>
            <TabsComponent
              firstTab={<ShowMemoryBarOfAnotherUsers userName={username} />}
              secondTab={<ShowLinksBar />}
              thirdTab={<ShowSavedMemories />}
            />
          </Box>
        </Stack>
      </div>
    </>
  );
};
