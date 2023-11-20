import { NavigateNextRounded } from "@mui/icons-material";
import { Avatar, Box, IconButton } from "@mui/material";
import React, { cloneElement, useCallback, useEffect, useState } from "react";
import { AIAddMemoryContent } from "./AIAddMemoryContent";

export const AIAddFilter = ({ updatedCroppedPic, upBarNext }) => {
  const [newUpBarCom1, setNewUpBarCom1] = useState(null);
  const [nextStep, setNextStep] = useState(false);
  const [newUpBarCom2, setNewUpBarCom2] = useState(null);
  const [profilePicForFilter, setProfilePicForFilter] =
    useState(updatedCroppedPic);

  var handleCallBack1 = useCallback(() => {
    if (upBarNext?.props?.backArrowOnClick) {
      upBarNext.props.backArrowOnClick();
    }
  }, [upBarNext?.props]);

  const callBackToAddFilter = () => {
    setNextStep(false);
  };

  useEffect(() => {
    const newUpBarComp1 = cloneElement(upBarNext, {
      nextButton: true,
      backArrow: true,
      backArrowOnClick: callBackToAddFilter,
    });

    const newUpBar1 = cloneElement(upBarNext, {
      nextButton: true,
      backArrow: true,
      nextVisibility: "hidden",
      renderMessage: "Filter",
      backArrowOnClick: handleCallBack1,
      // nextButtonOnClick: () => {
      //   setNextStep(true);
      // },
    });
    setNewUpBarCom2(newUpBarComp1);
    setNewUpBarCom1(newUpBar1);
    setProfilePicForFilter(updatedCroppedPic);
  }, [upBarNext, handleCallBack1, updatedCroppedPic]);

  return (
    <>
      {nextStep ? (
        <AIAddMemoryContent
          upBarNext1={newUpBarCom2}
          updatedCroppedPic={profilePicForFilter}
        />
      ) : (
        <>
          <div>
            <Box display="flex" position="relative">
              {newUpBarCom1}
              <Avatar
                srcSet={updatedCroppedPic}
                sx={{
                  marginTop: 5,
                  width: 832,
                  height: 726,
                  maxWidth: 832,
                  maxHeight: 726,
                  borderRadius: 2,
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  minHeight: 40,
                  backgroundColor: "transparent",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setNextStep(true);
                }}
              >
                <NavigateNextRounded />
              </IconButton>
            </Box>
          </div>
        </>
      )}
    </>
  );
};
