/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Grid, Box, Typography, Avatar, IconButton } from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline, Share } from "@mui/icons-material";
import "./Journey.css"; // Your CSS file for styling

const PlacesGallery = () => {
    const placesData = [
        {
          name: "Beach Paradise",
          photo: "https://thumbs.dreamstime.com/b/sunrise-over-beach-cancun-beautiful-mexico-40065727.jpg",
          userPhotos: [
            "user1.jpg",
            "user2.jpg",
            "user3.jpg",
            "user4.jpg", // Added the provided image link here
          ],
        },
        {
            name: "Mountain View",
            photo: "https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg",
            userPhotos: ["user4.jpg", "user5.jpg", "user6.jpg"],
          },
          {
            name: "Mountain View",
            photo: "https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg",
            userPhotos: ["user4.jpg", "user5.jpg", "user6.jpg"],
          },
          {
            name: "Mountain View",
            photo: "https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg",
            userPhotos: ["user4.jpg", "user5.jpg", "user6.jpg"],
          },
          {
            name: "Mountain View",
            photo: "https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg",
            userPhotos: ["user4.jpg", "user5.jpg", "user6.jpg"],
          },
          {
            name: "Mountain View",
            photo: "https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg",
            userPhotos: ["user4.jpg", "user5.jpg", "user6.jpg"],
          },
          {
            name: "Mountain View",
            photo: "https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg",
            userPhotos: ["user4.jpg", "user5.jpg", "user6.jpg"],
          },
          {
            name: "Mountain View",
            photo: "https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg",
            userPhotos: ["user4.jpg", "user5.jpg", "user6.jpg"],
          },
          {
            name: "Mountain View",
            photo: "https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg",
            userPhotos: ["user4.jpg", "user5.jpg", "user6.jpg"],
          },
          {
            name: "Mountain View",
            photo: "https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg",
            userPhotos: ["user4.jpg", "user5.jpg", "user6.jpg"],
          },
          
        // Add more places data as needed
      ];

  return (
    <Grid container spacing={3} className="places-container">
      {placesData.map((place, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box className="place-item">
            <img
              src={place.photo}
              alt={`Photo of ${place.name}`}
              className="place-image"
            />
            <Typography variant="h6" className="place-name">
              {place.name}
            </Typography>
            <div className="user-photos">
              {place.userPhotos.map((userPhoto, photoIndex) => (
                <Avatar
                  key={photoIndex}
                  src={userPhoto}
                  alt={`User ${photoIndex + 1}`}
                  className="user-avatar"
                />
              ))}
            </div>
            <div className="card-icons">
              <IconButton>
                <FavoriteBorder />
              </IconButton>
              <IconButton>
                <ChatBubbleOutline />
              </IconButton>
              <IconButton>
                <Share />
              </IconButton>
            </div>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlacesGallery;
