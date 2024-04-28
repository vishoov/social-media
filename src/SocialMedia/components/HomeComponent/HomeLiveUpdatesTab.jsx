import { Avatar, Grid, List, Stack, Typography } from "@mui/material";
import React from "react";
import jen21 from "../../../static/images/avatar/Jen21.jpeg";
import jen22 from "../../../static/images/avatar/Jen22.jpeg";
import jen23 from "../../../static/images/avatar/Jen23.jpeg";
import jen24 from "../../../static/images/avatar/Jen24.jpeg";
import jen26 from "../../../static/images/avatar/jen26.jpeg";
import jen27 from "../../../static/images/avatar/jen27.jpeg";
import jen28 from "../../../static/images/avatar/jen28.jpeg";
import jen32 from "../../../static/images/avatar/jen32.jpeg";
// import jen20 from "../../../static/images/avatar/Jen20.jpeg";
<<<<<<< HEAD
import "./LiveUpdates.css"

=======
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8

export const HomeLiveUpdatesTab = () => {
  const data = [
    {
      pic: jen21,
    },
    {
      pic: jen22,
    },
    {
      pic: jen23,
    },
    {
      pic: jen24,
    },
    {
      pic: jen26,
    },
    {
      pic: jen27,
    },
    {
      pic: jen28,
    },
  ];

  // const data2 = [
  //   {
  //     pic: jen32,
  //   },
  //   {
  //     pic: jen20,
  //   },
  // ];

  return (
    <Grid
<<<<<<< HEAD
      className="grid-container"
    
      
    >
      <Grid className="grid-item-left"
=======
      container
      sx={{
        width: 1550,
        marginLeft: 38,
      }}
    >
      <Grid
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
        sx={{
          width: 400,
        }}
      >
        <Stack
<<<<<<< HEAD
         className="stack-icons"
=======
          direction="column"
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
          spacing={4}
          sx={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              width: "0.4em", // Adjust the width as needed
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent", // Hide the scrollbar thumb
            },
            maxHeight: 1000,
            position: "fixed",
          }}
        >
          {data?.map((item) => {
            return (
              <Stack
<<<<<<< HEAD
            className="avatar-container"
            
          >
=======
                sx={{
                  paddingLeft: 2,
                  paddingRight: 30,
                  paddingTop: 2,
                  paddingBottom: 2,
                  borderRadius: 4,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#EEEEEE",
                  },
                }}
                direction="row"
              >
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                <Avatar
                  src={item.pic}
                  srcSet={item.pic}
                  variant="circular"
                  alt="no image found!!!"
<<<<<<< HEAD
                 
=======
                  sx={{
                    width: 100,
                    height: 100,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)", // Scale up the element on hover
                    },
                  }}
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Jennaortega
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Grid>
<<<<<<< HEAD
      <Grid className="grid-item-right"
        sx={{
          // marginLeft: 60,
=======
      <Grid
        sx={{
          marginLeft: 60,
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
          // height: "calc(100vh - 100px)", // Calculate the remaining height for the content
          // overflowY: "scroll",
          // scrollbarWidth: "none",
          // "&::-webkit-scrollbar": {
          //   width: "0.4em", // Adjust the width as needed
          // },
          // "&::-webkit-scrollbar-thumb": {
          //   backgroundColor: "transparent", // Hide the scrollbar thumb
          // },
          position: "fixed",
        }}
      >
        <List>
          {/* {data2.map((data1, index) => {
            return (
              <ListItem key={index}> */}
          <Stack
<<<<<<< HEAD
              sx={{
                
                paddingTop:"10px",
                display: "flex",
              
                alignItems: "center",
              }}
=======
            sx={{
              width: 1100,
              height: 950,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
          >
            <img
              src={jen32}
              srcSet={jen32}
              alt="not found"
<<<<<<< HEAD
              className="banner"
=======
              style={{
                width: 600,
                height: 920,
                borderRadius: 12,
              }}
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
            />
          </Stack>
          {/* </ListItem>
            );
          })} */}
        </List>
      </Grid>
    </Grid>
  );
};
