import { Avatar, Box, Button } from "@mui/material";
import React, { cloneElement, useCallback, useEffect, useState } from "react";
import { ShareMemoryProgress } from "./ShareMemoryProgress";
import axios from "axios";
import { useShareMemory } from "../../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

export const AIAddMemoryContent = ({ updatedCroppedPic, upBarNext1 }) => {
  const [newUpBarNext2, setNewUpBarNext2] = useState(null);
  const [redirectNewPage, setRedirectNewPage] = useState(false);
  const [newUpBarNext3, setNewUpBarNext3] = useState(null);

  var callBackToAddFilter = useCallback(() => {
    if (upBarNext1?.props?.backArrowOnClick) {
      upBarNext1.props.backArrowOnClick();
    }
  }, [upBarNext1?.props]);

  // use cookies hook

  const [cookies] = useCookies("avt_token");

  // use form hooks
  const { register, handleSubmit } = useForm();

  //use share memory hook
  const { data, isLoading, mutate , isSuccess } = useShareMemory();

  const downloadImage = async () => {
    try {
      const response = await axios.get(updatedCroppedPic, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.log("somthing went wrong!!!", error);
    }
  };

  const submit = async (newMemorydata) => {
    const image = await downloadImage();

    if (image) {
      const memoryPredata = {
        userId: parseInt(localStorage.getItem("sm_user_id")),
        feelings: newMemorydata.feelings,
      };

      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "data",
        new Blob([JSON.stringify(memoryPredata)], { type: "application/json" })
      );

      const memoryData = {
        fileData: formData,
        Authorization: cookies?.avt_token,
      };
      mutate(memoryData);
      setRedirectNewPage(true);
    }
  };

  // useEffect hook
  useEffect(() => {
    const newUpBar = cloneElement(upBarNext1, {
      nextButton: false,
      backArrow: true,
      ShareButton: true,
      renderMessage: "Make new memory",
      backArrowOnClick: callBackToAddFilter,
      shareButtonOnClick: () => {
        document.getElementById("submit").click();
      },
    });

    const newUpBarNext2 = cloneElement(upBarNext1, {
      nextButton: false,
      backArrow: false,
      ShareButton: false,
      renderMessage: "Memory shared",
      justifyContent: "center",
    });

    setNewUpBarNext2(newUpBar);
    setNewUpBarNext3(newUpBarNext2);
  }, [upBarNext1, callBackToAddFilter, isLoading, data]);

  return (
    <>
      {redirectNewPage ? (
        <div>
          <ShareMemoryProgress
            upBar={newUpBarNext3}
            isLoading={isLoading}
            data={data}
            isSuccess  = {isSuccess}
          />
        </div>
      ) : (
        <>
          {newUpBarNext2}
          {/* <Stack
            sx={{
              paddingRight: 20,
            }}
            direction="row"
          >
            <Box>
              <Avatar
                variant="square"
                sx={{
                  width: 200,
                  height: 50,
                }}
              />
            </Box>
          </Stack> */}
          <div>
            <Box
              sx={{
                marginTop: 8,
              }}
            >
              <Avatar
                srcSet={updatedCroppedPic}
                variant="square"
                sx={{
                  width: 400,
                  height: 400,
                  border: 1,
                  borderRadius: 4,
                }}
              />
            </Box>
          </div>
          <div>
            <form onSubmit={handleSubmit(submit)}>
              <Box
                sx={{
                  marginTop: 2,
                }}
              >
                <textarea
                  style={{
                    width: 400,
                    height: 100,
                    border: 1,
                    borderRadius: 4,
                    borderColor: "grey",
                    borderStyle: "solid",
                  }}
                  placeholder="share your feelings..."
                  maxLength={2000}
                  {...register("feelings", { required: true })}
                />
              </Box>
              <Box>
                <Button
                  variant="text"
                  sx={{
                    visibility: "hidden",
                  }}
                  id="submit"
                  type="submit"
                >
                  share
                </Button>
              </Box>
            </form>
          </div>
        </>
      )}
    </>
  );
};
