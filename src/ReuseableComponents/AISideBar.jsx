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
import "./AISideBarCSS.css"
export const AISideBar = () => {
  const navigate = useNavigate();

  const [IsModalOpenForSearch, setIsModalOpenForSearch] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
    <div className="sidebar">
       <span
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
             
            }}
             className="buttonContainer"
          >
            <div>
              <div>
                <Button
                  size="medium"
                  className="buttonContainer"
                  onClick={() => navigate("/environment/socialMedia/home")}
                  startIcon={<HomeRounded />}
                >
                  <p
                    className="button-text"
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
                  className="buttonContainer"
                  onClick={() => setIsModalOpenForSearch(true)}
                  startIcon={<SearchRounded />}
                >
                  <p  className="button-text"
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
                  className="buttonContainer"
                  startIcon={<ChatBubbleOutlineRounded />}
                  onClick={() => {
                    navigate("/environment/socialMedia/message");
                    dispatch(setCurrentInterface("MESSAGING_INTERFACE"));
                  }}
                  s
                >
                  <p  className="button-text"
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
                  className="buttonContainer"
                  startIcon={<FavoriteBorderRounded />}
                  onClick={() =>
                    navigate("/environment/socialMedia/Notifications")
                  }
                >
                  <p  className="button-text"
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
                  className="buttonContainer"
                  startIcon={<TvRounded />}
                >
                  <p  className="button-text"
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
                  className="buttonContainer"
                  onClick={() => navigate("/environment/socialMedia/home")}
                  startIcon={<InterestsRounded />}
                >
                  <p  className="button-text"
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
                  className="buttonContainer"
                  startIcon={<PublicRounded />}
                >
                  <p className="button-text"
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
                  className="buttonContainer"
                  startIcon={<GroupsRounded />}
                >
                  <p  className="button-text"
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
                  className="buttonContainer"
                  onClick={() => navigate("/environment/socialMedia/profile")}
                  startIcon={<AccountCircleRounded />}
                >
                  <p  className="button-text"
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
                className="menubutton"
                  size="medium"
                
                  startIcon={<MenuRounded />}
                >
                  <p  className="button-text"
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
      </div>
    </>
  );
};
