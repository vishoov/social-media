import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import completeImage from "../../../static/images/utils/381607_complete_icon.png";
import errorImage from "../../../static/images/utils/error.png";

import { setMemoryNotFoundError } from "../../../redux/SocialMediaMemoriesSlice";

export const ShareMemoryProgress = ({
  upBar,
  isLoading,
  data,
  isSuccess,
  isError,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setMemoryNotFoundError(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data, isSuccess]);

  return (
    <>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 18,
          }}
        >
          {upBar}
        </Box>
      </div>
      <div>
        {isLoading ? (
          <Box>
            <CircularProgress
              variant="indeterminate"
              color="inherit"
              size={80}
              sx={{
                marginTop: 35,
              }}
            />
          </Box>
        ) : isError ? (
          <Box>
            <img
              src={errorImage}
              alt="something went wrong!"
              style={{
                marginTop: 250,
                height: 200,
                width: 200,
              }}
            />
          </Box>
        ) : (
          <Box>
            {/* {localStorage.setItem("memoryExist", 1)}
            {localStorage.setItem("done", false)} */}
            <img
              src={completeImage}
              alt="com"
              style={{
                marginTop: 250,
                height: 200,
                width: 200,
              }}
            />
          </Box>
        )}
      </div>
    </>
  );
};
