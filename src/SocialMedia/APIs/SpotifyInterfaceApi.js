import axios from "axios";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { setTracksFromSpotify } from "../../reduxNonPersist/NonPersistForHomeSlice";
import { useDispatch } from "react-redux";

const spotify_auth_base_url = () => {
  return axios.create({
    baseURL: "https://api.spotify.com/v1",
  });
};

const spotify_auth = () => {
  return axios.post(
    "https://accounts.spotify.com/api/token",
    `grant_type=client_credentials&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&client_secret=${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}&scope=streaming%20user-read-private%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

const stream_songs_url = () => {
  return axios.create({
    baseURL: "http://localhost:9982/ai/socialmedia/api/v1/private/tracks",
  });
};

const search_tracks_on_spotify = (query) => {
  if (query?.query && query?.offset && query?.Authorization) {
    return spotify_auth_base_url().get(
      `/search?q=${query?.query}&type=track,artist,album&limit=50&offset=${query?.offset}&include_external=audio`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${query?.Authorization}`,
        },
      }
    );
  }
};

const stream_songs = (query) => {
  if (query?.audioUri && query?.Authorization) {
    return stream_songs_url().get("/stream/music", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${query?.Authorization}`,
      },
      params: {
        audioUri: query?.audioUri,
      },
    });
  }
};

export const useGetSpotifyAccessToken = () => {
  const [, setCookie] = useCookies(["sat_token"]);

  return useMutation(spotify_auth, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        setCookie("sat_token", data?.data?.access_token, {
          expires: new Date(Date.now() + 1000 * 60 * 58),
        });
      }
    },
    onError: (error) => {
      console.log("something went wrong!!!", error);
    },
  });
};

export const useSearchTracksOnSpotify = (query) => {
  const dispatch = useDispatch();

  return useMutation(search_tracks_on_spotify, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        console.log("proxy url :", data?.data?.tracks);

        const whole_data = data?.data?.tracks?.items?.map((tracks_item) => {
          return {
            trackName: tracks_item.name,
            artistName: tracks_item?.artists
              ?.map((artist) => artist.name)
              ?.join(", "),
            albumName: tracks_item.album.name,
            albumUri: tracks_item.album.images[0].url,
            uri: tracks_item.uri,
          };
        });

        console.log("whole_data", whole_data);
        dispatch(setTracksFromSpotify(whole_data));
      } else {
        dispatch(setTracksFromSpotify(null));
      }
    },
    onError: (error) => {
      console.log("something went wrong!!!", error);
    },
  });
};

export const useStreamSongs = () => {
  return useMutation(stream_songs, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        console.log("proxy url :", data?.data);
      }
    },
    onError: (error) => {
      console.log("something went wrong!!!", error);
    },
  });
};
