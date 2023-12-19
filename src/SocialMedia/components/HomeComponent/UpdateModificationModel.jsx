import {
  Box,
  Grid,
  Modal,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import music from "../../../static/images/utils/music.png";
import creative from "../../../static/images/utils/digital-product.png";
import { Tracks } from "./Tracks";
import mentions from "../../../static/images/utils/mention.png";
import locations from "../../../static/images/utils/maps-and-flags.png";
import questions from "../../../static/images/utils/question.png";
import smile from "../../../static/images/utils/smiley.png";

export const UpdateModificationModel = ({
  openModelForUpdateCustom,
  updateImageSrc,
  handleCustomClose,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000", // Set the primary color to black
      },
    },
  });

  return (
    <Modal
      open={openModelForUpdateCustom}
      onClose={handleCustomClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1300,
          height: 750,
          bgcolor: "background.paper",
          p: 1,
          borderRadius: 4,
        }}
      >
        <Grid container>
          <Grid
            sx={{
              width: 750,
            }}
          >
            <img
              style={{
                height: 750,
                width: 750,
                objectFit: "contain",
                objectPosition: "center",
                borderRadius: 10,
              }}
              src={updateImageSrc}
              srcSet={updateImageSrc}
              alt="not found"
            />
          </Grid>
          <Grid
            sx={{
              width: 550,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack>
              <ThemeProvider theme={theme}>
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  textColor="inherit"
                  indicatorColor="none"
                >
                  <Tab
                    icon={
                      <img
                        style={{
                          height: 20,
                          width: 20,
                        }}
                        src={music}
                        srcSet={music}
                        alt="not found"
                      />
                    }
                    iconPosition="top"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#EEEEEE",
                        borderRadius: "7px",
                        textTransform: "capitalize",
                      },
                      textTransform: "capitalize",
                    }}
                  />
                  <Tab
                    icon={
                      <img
                        style={{
                          height: 20,
                          width: 20,
                        }}
                        src={creative}
                        srcSet={creative}
                        alt="not found"
                      />
                    }
                    iconPosition="top"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#EEEEEE",
                        borderRadius: "7px",
                        textTransform: "capitalize",
                      },
                      textTransform: "capitalize",
                    }}
                  />
                  <Tab
                    icon={
                      <img
                        style={{
                          height: 27,
                          width: 27,
                        }}
                        src={mentions}
                        srcSet={mentions}
                        alt="not found"
                      />
                    }
                    iconPosition="top"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#EEEEEE",
                        borderRadius: "7px",
                        textTransform: "capitalize",
                      },
                      textTransform: "capitalize",
                    }}
                  />
                  <Tab
                    icon={
                      <img
                        style={{
                          height: 20,
                          width: 20,
                        }}
                        src={locations}
                        srcSet={locations}
                        alt="not found"
                      />
                    }
                    iconPosition="top"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#EEEEEE",
                        borderRadius: "7px",
                        textTransform: "capitalize",
                      },
                      textTransform: "capitalize",
                    }}
                  />
                  <Tab
                    icon={
                      <img
                        style={{
                          height: 20,
                          width: 20,
                        }}
                        src={smile}
                        srcSet={smile}
                        alt="not found"
                      />
                    }
                    iconPosition="top"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#EEEEEE",
                        borderRadius: "7px",
                        textTransform: "capitalize",
                      },
                      textTransform: "capitalize",
                    }}
                  />
                  <Tab
                    icon={
                      <img
                        style={{
                          height: 20,
                          width: 20,
                        }}
                        src={questions}
                        srcSet={questions}
                        alt="not found"
                      />
                    }
                    iconPosition="top"
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#EEEEEE",
                        borderRadius: "7px",
                        textTransform: "capitalize",
                      },
                      textTransform: "capitalize",
                    }}
                  />
                </Tabs>
              </ThemeProvider>
              <Box
                sx={{
                  marginTop: 2,
                }}
              >
                {selectedTab === 0 && <Tracks />}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
