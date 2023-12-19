import React, { useState } from "react";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";

import {
  AppsRounded,
  AutoAwesomeMotionRounded,
  AutoAwesomeRounded,
  Route
} from "@mui/icons-material";
import { useMediaQuery } from '@mui/material';  
import useMemoriesSubscribeHook from "../../../hooks/useMemoriesSubscribeHook";
import { HomeMemoriesTab } from "./HomeMemoriesTab";
import { HomeLiveUpdatesTab } from "./HomeLiveUpdatesTab";
import LiveUpdateWebCam from "./LiveUpdateWebCam";
import share from "../../../static/images/utils/share.png";
import frame from "../../../static/images/utils/frame.png";
import { UpdateModificationModel } from "./UpdateModificationModel";
import HomeJourneyTab from './HomeJourneyTab';
import BottomBar from "./BottomBar";

export const SocialMediaHome = () => {
  // live memories updates

  const isMobile = useMediaQuery('(max-width: 431px)');

  const { snackbarMessage, snackbarOpen } = useMemoriesSubscribeHook();

  const handleSnackbarClose = () => {};

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

  const [open, setOpen] = React.useState(false);

  const [openModelForUpdateCustom, setOpenModelForUpdateCustom] =
    useState(false);

  const [updateImageSrc, setUpdateImageSrc] = useState(null);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const [openWebCam, setOpenWebCam] = React.useState(false);

  return (
    <>
    
      <Box>
      {isMobile ? (
        <>
          <AISideBar />
          
          <div style={{ position: 'fixed', bottom: 0, maxWidth: '100vw', zIndex:9999 }}>
            <BottomBar />
          </div>
        </>
      ) : (
       
        <AISideBar />
      )}
      </Box>
      <Stack
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
    
        "@media (max-width: 480px)": {
        
         
          scale:"0.8"
        },
      }}

        direction="row"
        spacing={180}
      >
        <Stack
          direction="row"
          spacing={4}
          sx={{
            height: "62px",
            display: "flex",
            alignItems: "flex-start",
            position: "fixed",
            
          }}
        >
          <ThemeProvider theme={theme}>
          <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="primary"
              sx={{
                height: "60px", // Adjust the height as needed
              }}
            >
              <Tab
                label="Memories"
                icon={<AutoAwesomeRounded />}
                iconPosition="top"
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#EEEEEE",
                    borderRadius: "7px",
                    textTransform: "capitalize",
                  },
                  height:"100%",
                  textTransform: "capitalize",
                }}
              />
              <Tab
                label="Live updates"
                icon={<AutoAwesomeMotionRounded />}
                iconPosition="top"
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#EEEEEE",
                    borderRadius: "7px",
                  },
                  textTransform: "capitalize",
                }}
              />
              <Tab
                label="Journeys"
                icon={<Route />}
                iconPosition="top"
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#EEEEEE",
                    borderRadius: "7px",
                  },
                  textTransform: "capitalize",
                }}
              />
            </Tabs>
          </ThemeProvider>
        </Stack>
        <Stack
         direction={{ xs: 'column', md: 'row' }}
         spacing={1}
         sx={{ //responsive //
          
            position: 'fixed',
            top: 0,
            right: 10,
            display: 'flex',
            alignItems: 'center',
            zIndex: 999,
            paddingTop:1,
            paddingRight:1,

          }}
        >
 

          <Tooltip title="More">
            <Box
              sx={{
                background: "#EEEEEE",
                p: 1.5,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <AppsRounded />
            </Box>
          </Tooltip>
          <Tooltip title="share">
            <Box
              sx={{
                background: "#EEEEEE",
                p: 1.5,
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => handleClickOpen()}
            >
              <img
                style={{
                  height: 25,
                  width: 25,
                  cursor: "pointer",
                }}
                src={share}
                srcSet={share}
                alt="not found"
              />
            </Box>
          </Tooltip>
        </Stack>
      </Stack>
      <Divider
        sx={{
          width: 1555,
          marginLeft: 38,
          position: "fixed",
        }}
      />
      {selectedTab === 0 && <HomeMemoriesTab />}
      {selectedTab === 1 && <HomeLiveUpdatesTab />}
      {selectedTab === 2 && <HomeJourneyTab/>}

      <Box
        sx={{
          height: 200,
        }}
      >
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // Adjust as needed
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Box>
        <Modal open={open} onClose={handleClose}>
          <Grid
            container
            sx={{ 
              position: "absolute",
              top: "50%",
              left: "55%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 300,
              bgcolor: "background.paper",
              boxShadow: 10,
              borderRadius: 6,
            }}
          >
            <Stack
              sx={{
                width: 500,
              }}
              direction="column"
            >
              <Button
                sx={{
                  height: 60,
                  textTransform: "capitalize",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <img
                  style={{
                    height: 30,
                    width: 30,
                  }}
                  src={share}
                  srcSet={share}
                  alt="not found"
                />
                <Typography
                  sx={{
                    padding: 1,
                  }}
                >
                  Share memory
                </Typography>
              </Button>

              <Button
                sx={{
                  height: 60,
                  color: "black",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setOpen(false);
                  setOpenWebCam(true);
                }}
              >
                <img
                  style={{
                    height: 25,
                    width: 25,
                  }}
                  src={frame}
                  srcSet={frame}
                  alt="not found"
                />
                <Typography
                  sx={{
                    padding: 1,
                  }}
                >
                  Share updates
                </Typography>
              </Button>
            </Stack>
          </Grid>
        </Modal>
        {openWebCam && (
          <LiveUpdateWebCam
            open={openWebCam}
            handleClose={() => setOpenWebCam(false)}
            passImage={(imageSrc) => {
              setOpenModelForUpdateCustom(true);
              setUpdateImageSrc(imageSrc);
            }}
          />
        )}
        {openModelForUpdateCustom && (
          <UpdateModificationModel
            handleCustomClose={() => setOpenModelForUpdateCustom(false)}
            openModelForUpdateCustom={openModelForUpdateCustom}
            updateImageSrc={updateImageSrc}
          />
        )}
      </Box>
    </>
  );
};
