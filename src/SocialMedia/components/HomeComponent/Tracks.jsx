import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
// import { useSearchTracksOnSpotify } from "../../APIs/SpotifyInterfaceApi";
// import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
// import SpotifyWebPlayer from "react-spotify-web-playback";
import { useGetAllTracks } from "../../APIs/SocialMediaHomeInterfaceAPI";
import { useCookies } from "react-cookie";

export const Tracks = () => {
  // const { mutate } = useSearchTracksOnSpotify();

  const [cookies] = useCookies(["avt_token"]);

  // const [audioUri, setAudioUri] = useState(null);
  // const [play, setPlay] = useState(false);

  const NonPersistForHome = useSelector((state) => state.NonPersistForHome);

  const { refetch } = useGetAllTracks({
    Authorization: cookies?.avt_token,
    pageNumber: 1,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("NonPersistForHome", NonPersistForHome?.tracks);
  }, [NonPersistForHome?.tracks]);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{
            width: 500,
          }}
          placeholder="search music..."
          variant="standard"
          // onChange={(e) => handleChange(e.target.value)}
        />
        <List
          sx={{
            maxHeight: 620,
            overflowY: "scroll",
            cursor: "pointer",
            width: 500,
          }}
        >
          {NonPersistForHome?.tracks?.map((track) => {
            return (
              <ListItem
                key={track?.trackAudioUrl}
                // onClick={() => setAudioUri(track.uri)}
              >
                <ListItemIcon>
                  <Avatar
                    src={track?.trackImageUrls?.at(0)}
                    srcSet={track?.trackImageUrls?.at(0)}
                    alt="not found!"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={track.trackName}
                  secondary={track?.artistName
                    ?.map((artist) => artist)
                    ?.join(", ")}
                />
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </>
  );
};
