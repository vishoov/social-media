import React, { useEffect, useState } from "react";
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
import { useGetProfileDetails } from "../../APIs/SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export const AISocialMediaProfileInterface = () => {
  const [requiredData, setRequiredData] = useState(null);

  const { refetch } = useGetProfileDetails(requiredData);
  const [cookies] = useCookies(["avt_token"]);

  const userData = useSelector((state) => state.socialMediaUser);

  useEffect(() => {
    var isPresent = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root"))?.auth
    ).value?.signupData;

    if (isPresent === null) {
      const data = {
        Authorization: cookies?.avt_token,
      };

      if (requiredData) {
        console.log("Please provide a required data");
        refetch();
      } else {
        setRequiredData(data);
      }
    }
  }, [requiredData, cookies, refetch]);
  return (
    <>
      <div>
        <span>
          <AIUpBar
            editProfile={true}
            settingsSuggested={true}
            shareMemory={true}
            MoreButton={false}
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
