import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useSearchTracksOnSpotify } from "../../APIs/SpotifyInterfaceApi";
// import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
// import SpotifyWebPlayer from "react-spotify-web-playback";
import { useGetAllTracks } from "../../APIs/SocialMediaHomeInterfaceAPI";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useStreamSongs } from "../../APIs/SpotifyInterfaceApi";

export const Tracks = () => {
  // const { mutate } = useSearchTracksOnSpotify();

  const [cookies] = useCookies(["avt_token"]);

  // const [audioUri, setAudioUri] = useState(null);
  // const [play, setPlay] = useState(false);

  const NonPersistForHome = useSelector((state) => state.NonPersistForHome);

  const [requiredData, setRequiredData] = useState(null);

  const { refetch } = useGetAllTracks(requiredData);

  useEffect(() => {
    if (requiredData) {
      refetch();
    } else {
      setRequiredData({
        Authorization: cookies?.avt_token,
        pageNumber: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [audioUrl, setAudioUrl] = useState(null);

  const { mutate } = useStreamSongs();

  const handlePlay = async (audioUri) => {
    // Make an HTTP request to your Spring Boot endpoint

    console.log("audio uri ", audioUri);

    mutate({
      audioUri: audioUri,
      Authorization: cookies?.avt_token,
    });

    // .then((response) => console.log("response body", response?.body))
    // .then((body) => {
    //   console.log("body:::::", body);
    //   const reader = body?.getReader();
    //   const stream = new ReadableStream({
    //     start(controller) {
    //       return pump();
    //       function pump() {
    //         return reader?.read().then(({ done, value }) => {
    //           if (done) {
    //             controller?.close();
    //             return;
    //           }
    //           controller?.enqueue(value);
    //           return pump();
    //         });
    //       }
    //     },
    //   });
    //   return new Response(stream, {
    //     headers: { "Content-Type": "audio/mpeg" },
    //   });
    // })
    // .then((response) => response?.blob())
    // .then((blob) => {
    //   // Create a Blob URL from the audio data
    //   const url = URL.createObjectURL(blob);
    //   setAudioUrl(url);
    // });

    // return () => {
    //   // Clean up resources when the component unmounts
    //   if (audioUrl) {
    //     URL.revokeObjectURL(audioUrl);
    //   }
    // };
  };

  useEffect(() => {
    console.log("audio url ------>", audioUrl);
  }, [audioUrl]);

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
                onClick={() => handlePlay(track?.trackAudioUrl)}
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
                <ListItemIcon>
                  <audio controls>
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </>
  );
};
