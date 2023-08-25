import React, { useState } from "react";
import { AIButton } from "./AIButton";
import { SettingsSuggestRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AICreateMemoryModel from "./Profile/AICreateMemoryModel";

export const AIUpBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleModelClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        style={{
          borderBottom: 1,
          borderRadius: 10,
          borderBottomStyle: "solid",
          borderBottomColor: "lightBlue",
          width: "83.5%",
          marginLeft: "auto",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <span>
          <p
            style={{
              textAlign: "start",
              fontSize: 18,
              color: "black",
              fontWeight: "unset",
            }}
          >
            <b>JennaOrtega</b>
          </p>
        </span>
        <span>
          <p
            style={{
              marginLeft: 200,
              marginTop: 15,
            }}
          >
            <b>0</b> Followers
          </p>
        </span>
        <span>
          <p
            style={{
              marginLeft: 30,
              marginTop: 15,
            }}
          >
            <b>0</b> Followings
          </p>
        </span>
        <span>
          <p
            style={{
              marginLeft: 30,
              marginTop: 15,
            }}
          >
            <b>0</b> Memories
          </p>
        </span>
        <span>
          <AIButton
            content="Edit Profile"
            style={{
              marginLeft: 500,
              marginTop: 10,
            }}
            onClick={() => navigate("/environment/socialmedia/profile/edit")}
          />
        </span>
        <span>
          <AIButton
            content="Share Memory"
            style={{
              marginLeft: 40,
              marginTop: 10,
            }}
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </span>
        <span>
          <SettingsSuggestRounded
            style={{
              marginLeft: 40,
              marginTop: 14,
            }}
          />
        </span>
        <span>
          <AICreateMemoryModel
            isEmpty={true}
            isOpen={isOpen}
            isClose={handleModelClose}
          />
        </span>
      </div>
    </>
  );
};
