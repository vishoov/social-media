import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUploadProfilePics } from "../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";

export const AvatarFileInput = () => {
  const [selectedImage, setSelectedImage] = useState(undefined);

  const [cookies] = useCookies(["avt_token"]);

  const { mutate, data } = useUploadProfilePics();

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
    if (data?.data?.data?.urls?.length > 0) {
      if ("caches" in window) {
        caches.open("my-cache").then((cache) => {
          // Store data in the cache
          const jsonData = {
            profilePicUrl: data?.data?.data?.urls,
          };

          console.log("json data :", jsonData);
          const json = JSON.stringify(jsonData);
          cache.put("/profilePics.json", new Response(json));
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
        });
      }
    }
    setSelectedImage(data?.data?.data?.urls?.[0]);
  }, [data]);

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
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <Avatar
        alt="Avatar"
        id="avatar"
        src={selectedImage}
        sx={{
          width: 300,
          height: 300,
          cursor: "pointer",
        }}
        style={{
          margin: 15,
        }}
        onClick={handleAvatarClick}
      />
      <p
        style={{
          marginLeft: 100,
        }}
      >
        <b>Jenna Oretega</b>
      </p>
    </div>
  );
};
