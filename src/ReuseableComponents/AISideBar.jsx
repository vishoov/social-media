import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import {
  AccountCircleRounded,
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  GroupsRounded,
  HomeRounded,
  InterestsRounded,
  MenuRounded,
  PublicRounded,
  SearchRounded,
  TvRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { SearchBarComponent } from "../SocialMedia/components/SearchComponents/SearchBarComponent";
import { useDispatch } from "react-redux";
import { setCurrentInterface } from "../redux/UtilitiesSlice";
<<<<<<< HEAD
import "./AISideBarCSS.css"
=======

>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
export const AISideBar = () => {
  const navigate = useNavigate();

  const [IsModalOpenForSearch, setIsModalOpenForSearch] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
<<<<<<< HEAD
    <div className="sidebar">
       <span
=======
      <span
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <span>
          <ButtonGroup
            size="small"
            orientation="vertical"
            variant="text"
            style={{
              borderRight: "1px solid lightBlue",
<<<<<<< HEAD
             
            }}
             className="buttonContainer"
=======
              paddingTop: 150,
              paddingBottom: 150,
            }}
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
          >
            <div>
              <div>
                <Button
                  size="medium"
<<<<<<< HEAD
                  className="buttonContainer"
=======
                  style={{ width: 300, marginBottom: 10 }}
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                  onClick={() => navigate("/environment/socialMedia/home")}
                  startIcon={<HomeRounded />}
                >
                  <p
<<<<<<< HEAD
                    className="button-text"
=======
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 33,
                    }}
                  >
                    Home
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
<<<<<<< HEAD
                  className="buttonContainer"
                  onClick={() => setIsModalOpenForSearch(true)}
                  startIcon={<SearchRounded />}
                >
                  <p  className="button-text"
=======
                  style={{ width: 300, marginBottom: 10 }}
                  onClick={() => setIsModalOpenForSearch(true)}
                  startIcon={<SearchRounded />}
                >
                  <p
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 28,
                    }}
                  >
                    Search
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
<<<<<<< HEAD
                  className="buttonContainer"
=======
                  style={{ width: 300, marginBottom: 10 }}
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                  startIcon={<ChatBubbleOutlineRounded />}
                  onClick={() => {
                    navigate("/environment/socialMedia/message");
                    dispatch(setCurrentInterface("MESSAGING_INTERFACE"));
                  }}
                  s
                >
<<<<<<< HEAD
                  <p  className="button-text"
=======
                  <p
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 28,
                    }}
                  >
                    Message
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
<<<<<<< HEAD
                  className="buttonContainer"
=======
                  style={{
                    width: 300,
                    marginBottom: 10,
                  }}
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                  startIcon={<FavoriteBorderRounded />}
                  onClick={() =>
                    navigate("/environment/socialMedia/Notifications")
                  }
                >
<<<<<<< HEAD
                  <p  className="button-text"
=======
                  <p
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 7,
                    }}
                  >
                    Notification
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
<<<<<<< HEAD
                  className="buttonContainer"
                  startIcon={<TvRounded />}
                >
                  <p  className="button-text"
=======
                  style={{ width: 300, marginBottom: 10 }}
                  startIcon={<TvRounded />}
                >
                  <p
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 50,
                    }}
                  >
                    Glance
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
<<<<<<< HEAD
                  className="buttonContainer"
                  onClick={() => navigate("/environment/socialMedia/home")}
                  startIcon={<InterestsRounded />}
                >
                  <p  className="button-text"
=======
                  style={{ width: 300, marginBottom: 10 }}
                  onClick={() => navigate("/environment/socialMedia/home")}
                  startIcon={<InterestsRounded />}
                >
                  <p
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 10,
                    }}
                  >
                    Interestings
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
<<<<<<< HEAD
                  className="buttonContainer"
                  startIcon={<PublicRounded />}
                >
                  <p className="button-text"
=======
                  style={{ width: 300, marginBottom: 10 }}
                  startIcon={<PublicRounded />}
                >
                  <p
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 80,
                    }}
                  >
                    Meet
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
<<<<<<< HEAD
                  className="buttonContainer"
                  startIcon={<GroupsRounded />}
                >
                  <p  className="button-text"
=======
                  style={{ width: 300, marginBottom: 10 }}
                  startIcon={<GroupsRounded />}
                >
                  <p
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 72,
                    }}
                  >
                    Clubs
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
<<<<<<< HEAD
                  className="buttonContainer"
                  onClick={() => navigate("/environment/socialMedia/profile")}
                  startIcon={<AccountCircleRounded />}
                >
                  <p  className="button-text"
=======
                  style={{ width: 300, marginBottom: 10 }}
                  onClick={() => navigate("/environment/socialMedia/profile")}
                  startIcon={<AccountCircleRounded />}
                >
                  <p
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 62,
                    }}
                  >
                    profile
                  </p>
                </Button>
              </div>
              <div>
                <Button
<<<<<<< HEAD
                className="menubutton"
                  size="medium"
                
                  startIcon={<MenuRounded />}
                >
                  <p  className="button-text"
=======
                  size="medium"
                  style={{ width: 300, marginBottom: 10 }}
                  startIcon={<MenuRounded />}
                >
                  <p
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                    style={{
                      marginRight: 80,
                    }}
                  >
                    Menu
                  </p>
                </Button>
              </div>
            </div>
          </ButtonGroup>
        </span>
        <SearchBarComponent
          open={IsModalOpenForSearch}
          onClose={() => setIsModalOpenForSearch(false)}
        />
      </span>
<<<<<<< HEAD
      </div>
=======
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
    </>
  );
};
