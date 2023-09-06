import React from "react";
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
import { useSelector } from "react-redux";
import { ShowMemoryBarOfAnotherUsers } from "../../../ReuseableComponents/Profile/ShowMemoryBarOfAnotherUsers";
import { useParams } from "react-router-dom";

export const AnotherUsersProfile = () => {
  const searchData = useSelector((state) => state?.search);
  const { username } = useParams();

  return (
    <>
      <div>
        <span>
          <AIUpBar
            follow={true}
            message={true}
            MoreButton={true}
            userName={
              searchData?.requestUserSearchData?.userPersonalDetails?.userName
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
              src={searchData?.requestUserSearchData?.userProfilePics
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
                {
                  searchData?.requestUserSearchData?.userPersonalDetails
                    ?.firstName
                }{" "}
                {
                  searchData?.requestUserSearchData?.userPersonalDetails
                    ?.lastName
                }
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
