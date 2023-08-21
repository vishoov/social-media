import { NavigateNextRounded } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
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
      renderMessage: "Filter",
      backArrowOnClick: handleCallBack1,
    });

    setNewUpBarCom2(newUpBarComp1);
    setNewUpBarCom1(newUpBar1);
    setProfilePicForFilter(updatedCroppedPic);
  }, [upBarNext, handleCallBack1, updatedCroppedPic]);

  return (
    <>
      {nextStep ? (
        <div>
          <AIAddMemoryContent
            upBarNext1={newUpBarCom2}
            updatedCroppedPic={profilePicForFilter}
          />
        </div>
      ) : (
        <>
          {newUpBarCom1}
          <div>
            <Box display="flex">
              <Avatar
                srcSet={updatedCroppedPic}
                sx={{
                  marginTop: 5,
                  width: 832,
                  height: 726,
                  maxWidth: 832,
                  maxHeight: 726,
                  border: 1,
                  borderRadius: 4,
                }}
              />
              <NavigateNextRounded
                sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setNextStep(true);
                }}
              />
            </Box>
          </div>
        </>
      )}
    </>
  );
};
