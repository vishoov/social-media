import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUploadProfilePics } from "../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";
import { useGetUserProfileInfo } from "../SocialMedia/APIs/SocialMediaSearchInterfaceApi";
import { useSelector } from "react-redux";

export const AvatarFileInput = ({ firstName, lastName }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const [cookies] = useCookies(["avt_token"]);
  const socialMediaUser = useSelector((state) => state.socialMediaUser);

  const { mutate, data } = useUploadProfilePics();

  const { mutate: mutateProfileInfo, data: profileInfoData } =
    useGetUserProfileInfo();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const profileData = {
        file: formData,
        Authorization: cookies?.avt_token,
      };
      mutate(profileData);
    }
  };

  useEffect(() => {
    if (
      data?.status === 200 &&
      data?.data?.data?.urls &&
      profileInfoData?.status !== 200
    ) {
      if ("caches" in window) {
        caches.open("my-cache").then((cache) => {
          // Store data in the cache
          const jsonData = {
            profilePicUrl: data?.data?.data?.urls,
          };

          const json = JSON.stringify(jsonData);

          const response = new Response(json, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          cache.put("/profilePics.json", response);
        });
      }
    } else {
      if ("caches" in window) {
        caches.open("my-cache").then((cache) => {
          cache.match("/profilePics.json").then((response) => {
            if (response) {
              return response.json().then((data) => {
                const jsonData = {
                  profilePicUrl: data?.profilePicUrl,
                };
                setSelectedImage(jsonData?.profilePicUrl?.[0]);
              });
            }
          });

          setShouldFetch(true);
        });
      }
    }
    setSelectedImage(data?.data?.data?.urls?.[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.data?.urls, profileInfoData?.data?.data]);

  useEffect(() => {
    if (profileInfoData?.status !== 200 && shouldFetch) {
      mutateProfileInfo({
        username: socialMediaUser?.value?.SocialMediaUserData?.userName,
        Authorization: cookies?.avt_token,
      });
      setShouldFetch(false);
    } else if (profileInfoData?.status === 200) {
      setSelectedImage(
        profileInfoData?.data?.data?.userProfilePics
          ?.at(0)
          ?.profile_details?.at(0)
          ?.urls?.at(0)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  const handleAvatarClick = () => {
    // Trigger the hidden file input
    document.getElementById("avatar-input").click();
  };

  return (
    <div>
      <input
        type="file"
        id="avatar-input"
        accept="image/*"
        style={{ display: "none", cursor: "pointer" }}
        onChange={handleImageChange}
      />
      <Avatar
        alt="Avatar"
        id="avatar"
        src={selectedImage && selectedImage}
        sx={{
          width: 280,
          height: 280,
          cursor: "pointer",
        }}
        style={{
          margin: 10,
        }}
        onClick={handleAvatarClick}
      />
      <p
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <b>
          {firstName} {lastName}
        </b>
      </p>
    </div>
  );
};
