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
import React, { useContext, useEffect, useState } from "react";
import jen1 from "../../../static/images/avatar/jen.jpeg";
import {
  useCheckIsUserFollowingTheOtherUser,
  useGetUserBySearch,
  useGetUserProfileInfo,
} from "../../APIs/SocialMediaSearchInterfaceApi";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsFollowing,
  setRequestedUserSearchDataForPersist,
} from "../../../redux/SearchSlice";
import { useNavigate } from "react-router-dom";
import { Context as SearchContext } from "../../../context/SearchContext";
import useGetFollowersAndFollowingHook from "../../../hooks/useGetFollowersAndFollowingHook";
import useGetMemoriesCountHook from "../../../hooks/useGetMemoriesCountHook";

export const SearchBarComponent = ({ onClose, open }) => {
  const [cookies] = useCookies(["avt_token"]);
  const [token, setToken] = useState(null);
  const [called, setCalled] = useState(false);

  const { mutate } = useGetUserBySearch();

  const { mutate: mutateUserProfile, data } = useGetUserProfileInfo();

  const { mutate: mutateIsFollowing, data: responseData } =
    useCheckIsUserFollowingTheOtherUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = useSelector((state) => state.search);

  const {
    state: { searchData },
    setSearchData,
  } = useContext(SearchContext);

  useGetMemoriesCountHook(search.requestedUserSearchdataForPersist?.userId);

  useGetFollowersAndFollowingHook(
    search.requestedUserSearchdataForPersist?.userId
  );

  const { setRequestUserSearchData } = useContext(SearchContext);

  const socialMediaUser = useSelector((state) => state.socialMediaUser);

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
  }, [cookies.avt_token, token]);

  useEffect(() => {
    if (data?.status === 200) {
      setRequestUserSearchData(data?.data?.data);

      if (called === false) {
        dispatch(
          setRequestedUserSearchDataForPersist(
            data?.data?.data?.userPersonalDetails
          )
        );
        mutateIsFollowing({
          Authorization: token,
          followingdata: {
            userId: localStorage.getItem("sm_user_id"),
            followingId: data?.data?.data?.userPersonalDetails?.userId,
          },
        });
      } else {
        setCalled(true);
      }
    }
    // eslint-disable-next-line
  }, [
    data?.status,
    data?.data?.data,
    socialMediaUser?.value?.SocialMediaUserData?.userName,
    mutateIsFollowing,
    navigate,
    token,
    called,
  ]);

  useEffect(() => {
    if (responseData?.status === 200) {
      dispatch(setIsFollowing(true));
      navigate(
        `/environment/socialMedia/profile/${data?.data?.data?.userPersonalDetails?.userName}`
      );
    } else if (responseData?.status === 202) {
      dispatch(setIsFollowing(false));
      navigate(
        `/environment/socialMedia/profile/${data?.data?.data?.userPersonalDetails?.userName}`
      );
    }
  }, [
    responseData?.data?.data,
    responseData?.status,
    data?.data?.data?.userPersonalDetails?.userName,
    dispatch,
    navigate,
  ]);

  // useFetchAnotherUsersMemoryHook(data?.data?.data?.userPersonalDetails?.userId);

  const handleNavigate = (username) => {
    if (username !== null) {
      if (username === socialMediaUser?.value?.SocialMediaUserData?.userName) {
        navigate("/environment/socialMedia/profile");
      } else {
        mutateUserProfile({
          username: username,
          Authorization: token,
        });
        dispatch(setIsFollowing(false));
      }
      setSearchData([]);
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
              {searchData?.length > 0 ? (
                searchData?.map((searchResults) => {
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
