import React, { useState } from "react";
import { Tabs, Tab, Divider } from "@mui/material";

const TabsComponent = ({ firstTab, secondTab, style, thirdTab }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={style}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="MEMORIES" />
        <Tab label="LINKS" />
        <Tab label="SAVED" />
      </Tabs>
      <Divider
        sx={{
          width: 965,
          marginLeft: 2,
        }}
      />
      {selectedTab === 0 && firstTab}
      {selectedTab === 1 && secondTab}
      {selectedTab === 2 && thirdTab}
    </div>
  );
};

export default TabsComponent;
