import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import completeImage from "../../static/images/utils/complete.svg";

export const ShareMemoryProgress = ({ upBar, isLoading, data, isSuccess }) => {
  useEffect(() => {}, [isLoading, data]);

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
        {isLoading && !isSuccess ? (
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
        ) : (
          <Box>
            {localStorage.setItem("memoryExist", 1)}
            {localStorage.setItem("done", false)}
            <img
              src={completeImage}
              alt="com"
              style={{
                marginTop: 250,
              }}
            />
          </Box>
        )}
      </div>
    </>
  );
};
