import React, { useCallback, useContext, useEffect, useState } from "react";
import { AIUpBar } from "../../../ReuseableComponents/AIUpBar";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { ShowLinksBar } from "../../../ReuseableComponents/Profile/ShowLinksBar";
import { ShowSavedMemories } from "../../../ReuseableComponents/Profile/ShowSavedMemories";
import TabsComponent from "../../../ReuseableComponents/Tabs";
import jenPic1 from "../../../static/images/avatar/jen1.jpeg";
import jenPic2 from "../../../static/images/avatar/jen2.jpeg";
import jenPic3 from "../../../static/images/avatar/jen3.jpeg";
import jenPic4 from "../../../static/images/avatar/jen4.jpeg";
import { ShowMemoryBarOfAnotherUsers } from "../../../ReuseableComponents/Profile/ShowMemoryBarOfAnotherUsers";
import { Context as SearchContext } from "../../../context/SearchContext";

import { useParams } from "react-router-dom";
import { useGetUserProfileInfo } from "../../APIs/SocialMediaSearchInterfaceApi";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useGetMemoriesCount } from "../../APIs/SocialMediaMemoryInterfaceAPI";

export const AnotherUsersProfile = () => {
  const { username } = useParams();

  const {
    state: { requestUserSearchData },
    setRequestUserSearchData,
  } = useContext(SearchContext);

  const [requiredData1, setRequiredData1] = useState(null);
  const search = useSelector((state) => state.search);

  const [cookies] = useCookies(["avt_token"]);

  const { mutate: mutateUserProfile, data } = useGetUserProfileInfo();

  const callBack = useCallback(() => {
    if (data?.status === 200) {
      setRequestUserSearchData(data?.data?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);

  useEffect(() => {
    if (data?.data?.data === undefined || data?.data?.data === null) {
      mutateUserProfile({
        username: username,
        Authorization: cookies?.avt_token,
      });
    } else {
      if (data?.status === 200) {
        setRequestUserSearchData(data?.data?.data);
      }
    }
    // callBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callBack, data?.status, data?.data?.data]);

  const { refetch: refetchMemoryCount } = useGetMemoriesCount(requiredData1);

  useEffect(() => {
    if (requiredData1 === null) {
      const requestedData = {
        userId: search?.searchData?.at(0)?.userId,
        Authorization: cookies.avt_token,
      };

      setRequiredData1(requestedData);
    } else {
      refetchMemoryCount();
    }
  }, [
    cookies.avt_token,
    refetchMemoryCount,
    requiredData1,
    search?.searchData,
  ]);

  return (
    <>
      <div>
        <span>
          <AIUpBar
            follow={true}
            message={true}
            MoreButton={true}
            userName={
              requestUserSearchData?.userPersonalDetails?.userName || username
            }
            otherUser={true}
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
            paddingBottom: 30,
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
                <Box alignItems="center" display="flex" flexDirection="column">
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

              <Box>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "black",
                    marginLeft: 60,
                    paddingBottom: 200,
                  }}
                >
                  About Me
                </p>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              paddingRight: 4,
            }}
          >
            <Avatar
              alt="Avatar"
              id="avatar"
              src={requestUserSearchData?.userProfilePics
                ?.at(0)
                ?.profile_details?.at(0)
                ?.urls?.at(0)}
              sx={{
                width: 300,
                height: 300,
                cursor: "pointer",
              }}
              style={{
                margin: 15,
              }}
            />
            <p
              style={{
                marginLeft: 110,
              }}
            >
              <b>
                {requestUserSearchData?.userPersonalDetails?.firstName}{" "}
                {requestUserSearchData?.userPersonalDetails?.lastName}
              </b>
            </p>
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
              firstTab={<ShowMemoryBarOfAnotherUsers username={username} />}
              secondTab={<ShowLinksBar />}
              thirdTab={<ShowSavedMemories />}
            />
          </Box>
        </Stack>
      </div>
    </>
  );
};
