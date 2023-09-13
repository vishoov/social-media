import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import {
  AccountCircleRounded,
  ChatRounded,
  FavoriteBorderRounded,
  GroupsRounded,
  HomeRounded,
  MenuRounded,
  PublicRounded,
  SearchRounded,
  TvRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { SearchBarComponent } from "../SocialMedia/components/SearchComponents/SearchBarComponent";

export const AISideBar = () => {
  const navigate = useNavigate();

  const [IsModalOpenForSearch, setIsModalOpenForSearch] = useState(false);

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
              paddingTop: 200,
              paddingBottom: 150,
            }}
          >
            <div>
              <div>
                <Button
                  size="medium"
                  style={{ width: 300, marginBottom: 20 }}
                  onClick={() => navigate("/environment/socialMedia/home")}
                  startIcon={<HomeRounded />}
                >
                  <p
                    style={{
                      marginRight: 30,
                    }}
                  >
                    Home
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
                  style={{ width: 300, marginBottom: 20 }}
                  onClick={() => setIsModalOpenForSearch(true)}
                  startIcon={<SearchRounded />}
                >
                  <p
                    style={{
                      marginRight: 26,
                    }}
                  >
                    Search
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
                  style={{ width: 300, marginBottom: 20 }}
                  startIcon={<ChatRounded />}
                >
                  <p
                    style={{
                      marginRight: 25,
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
                    marginBottom: 20,
                  }}
                  startIcon={<FavoriteBorderRounded />}
                  onClick={() =>
                    navigate("/environment/socialMedia/Notifications")
                  }
                >
                  <p
                    style={{
                      marginRight: 10,
                    }}
                  >
                    Notification
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
                  style={{ width: 300, marginBottom: 20 }}
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
                  style={{ width: 300, marginBottom: 20 }}
                  startIcon={<PublicRounded />}
                >
                  <p
                    style={{
                      marginRight: 70,
                    }}
                  >
                    Meet
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
                  style={{ width: 300, marginBottom: 20 }}
                  startIcon={<GroupsRounded />}
                >
                  <p
                    style={{
                      marginRight: 60,
                    }}
                  >
                    Clubs
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
                  style={{ width: 300, marginBottom: 20 }}
                  onClick={() => navigate("/environment/socialMedia/profile")}
                  startIcon={<AccountCircleRounded />}
                >
                  <p
                    style={{
                      marginRight: 50,
                    }}
                  >
                    profile
                  </p>
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
                  style={{ width: 300, marginBottom: 20 }}
                  startIcon={<MenuRounded />}
                >
                  <p
                    style={{
                      marginRight: 70,
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
