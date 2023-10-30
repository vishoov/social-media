import axios from "axios";
import { useMutation } from "react-query";

const spotify_auth_base_url = () => {
  axios.create({
    baseURL: "",
  });
};

const spotify_auth = () => {
  axios.post(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

export const useGetSpotifyAccessToken = () => {
  return useMutation(spotify_auth, {
    onSuccess: (data) => {
      console.log("access token :::", data);
    },
    onError: (error) => {
      console.log("something went wrong!!!", error);
    },
  });
};
