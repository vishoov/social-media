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

export const AISideBar = () => {
  const navigate = useNavigate();

  const [IsModalOpenForSearch, setIsModalOpenForSearch] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
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
              paddingTop: 150,
              paddingBottom: 150,
            }}
          >
            <div>
              <div>
                <Button
                  size="medium"
                  style={{ width: 300, marginBottom: 10 }}
                  onClick={() => navigate("/environment/socialMedia/home")}
                  startIcon={<HomeRounded />}
                >
                  <p
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
                  style={{ width: 300, marginBottom: 10 }}
                  onClick={() => setIsModalOpenForSearch(true)}
                  startIcon={<SearchRounded />}
                >
                  <p
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
                  style={{ width: 300, marginBottom: 10 }}
                  startIcon={<ChatBubbleOutlineRounded />}
                  onClick={() => {
                    navigate("/environment/socialMedia/message");
                    dispatch(setCurrentInterface("MESSAGING_INTERFACE"));
                  }}
                  s
                >
                  <p
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
                  style={{
                    width: 300,
                    marginBottom: 10,
                  }}
                  startIcon={<FavoriteBorderRounded />}
                  onClick={() =>
                    navigate("/environment/socialMedia/Notifications")
                  }
                >
                  <p
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
                  style={{ width: 300, marginBottom: 10 }}
                  startIcon={<TvRounded />}
                >
                  <p
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
                  style={{ width: 300, marginBottom: 10 }}
                  onClick={() => navigate("/environment/socialMedia/home")}
                  startIcon={<InterestsRounded />}
                >
                  <p
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
                  style={{ width: 300, marginBottom: 10 }}
                  startIcon={<PublicRounded />}
                >
                  <p
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
                  style={{ width: 300, marginBottom: 10 }}
                  startIcon={<GroupsRounded />}
                >
                  <p
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
                  style={{ width: 300, marginBottom: 10 }}
                  onClick={() => navigate("/environment/socialMedia/profile")}
                  startIcon={<AccountCircleRounded />}
                >
                  <p
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
                  size="medium"
                  style={{ width: 300, marginBottom: 10 }}
                  startIcon={<MenuRounded />}
                >
                  <p
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
    </>
  );
};
