import { SearchRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import jen1 from "../../../static/images/avatar/jen.jpeg";
import {
  useGetUserBySearch,
  useGetUserProfileInfo,
} from "../../APIs/SocialMediaSearchInterfaceApi";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export const SearchBarComponent = ({ onClose, open }) => {
  const [cookies] = useCookies(["avt_token"]);
  const [token, setToken] = useState(null);

  const { mutate } = useGetUserBySearch();

  const { mutate: mutateUserProfile } = useGetUserProfileInfo();

  const search = useSelector((state) => state.search);

  const handleChange = (search) => {
    const data = {
      search: search,
      Authorization: token,
    };
    mutate(data);
  };

  useEffect(() => {
    if (token === null) {
      setToken(cookies?.avt_token);
    }
  }, [cookies.avt_token, token, search]);

  const handleNavigate = (username) => {
    if (username !== null) {
      mutateUserProfile({
        username: username,
        Authorization: token,
      });

      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1500,
          height: 900,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 1,
          borderRadius: 2,
        }}
      >
        <Stack
          sx={{
            justifyContent: "start",
          }}
          direction="row"
        >
          <Box>
            <TextField
              variant="outlined"
              label="Search"
              size="small"
              sx={{
                width: 500,
              }}
              onChange={(data) => handleChange(data.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchRounded />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>
        <Stack direction="row">
          <Box>
            <List>
              {search?.searchData?.length > 0 ? (
                search?.searchData?.map((searchResults) => {
                  return (
                    <ListItem disablePadding key={searchResults?.userName}>
                      <ListItemButton
                        sx={{
                          width: 500,
                          flexDirection: "row",
                        }}
                        onClick={() => handleNavigate(searchResults?.userName)}
                      >
                        <Stack
                          spacing={2}
                          direction="row"
                          sx={{
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            srcSet={jen1}
                            sx={{
                              width: 50,
                              height: 50,
                            }}
                            alt="userNotFound"
                          />
                          <Typography>{searchResults?.userName}</Typography>
                        </Stack>
                      </ListItemButton>
                    </ListItem>
                  );
                })
              ) : (
                <Typography
                  variant="subtitle2"
                  sx={{
                    paddingLeft: 25,
                  }}
                >
                  No results found
                </Typography>
              )}
            </List>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
