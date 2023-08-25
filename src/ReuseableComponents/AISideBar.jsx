import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import {
  AccountCircleRounded,
  ChatRounded,
  FavoriteBorderRounded,
  GroupsRounded,
  HomeRounded,
  MenuRounded,
  SearchRounded,
  TvRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const AISideBar = () => {
  const navigate = useNavigate();

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
                  style={{ width: 300, marginBottom: 25 }}
                  onClick={() => navigate("/environment/socialMedia/home")}
                >
                  <HomeRounded
                    style={{
                      marginRight: 12,
                    }}
                  />
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
                <Button size="medium" style={{ width: 300, marginBottom: 25 }}>
                  <SearchRounded
                    style={{
                      marginRight: 12,
                    }}
                  />
                  <p
                    style={{
                      marginRight: 25,
                    }}
                  >
                    Search
                  </p>
                </Button>
              </div>
              <div>
                <Button size="medium" style={{ width: 300, marginBottom: 25 }}>
                  <ChatRounded
                    style={{
                      marginRight: 15,
                    }}
                  />
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
                    marginBottom: 25,
                  }}
                >
                  <FavoriteBorderRounded
                    style={{
                      marginRight: 10,
                    }}
                  />
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
                <Button size="medium" style={{ width: 300, marginBottom: 25 }}>
                  <TvRounded
                    style={{
                      marginRight: 15,
                    }}
                  />
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
                <Button size="medium" style={{ width: 300, marginBottom: 25 }}>
                  <GroupsRounded
                    style={{
                      marginRight: 15,
                    }}
                  />
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
                  style={{ width: 300, marginBottom: 25 }}
                  onClick={() => navigate("/environment/socialMedia/profile")}
                >
                  <AccountCircleRounded
                    style={{
                      marginRight: 15,
                    }}
                  />
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
                <Button size="medium" style={{ width: 300, marginBottom: 25 }}>
                  <MenuRounded
                    style={{
                      marginRight: 15,
                    }}
                  />
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
      </span>
    </>
  );
};
