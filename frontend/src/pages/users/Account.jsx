import React from "react";
import { useState } from "react";
import Profile from "./Profile";
import Posts from "../posts/Posts";

const Account = (props) => {
  const [curentTab, setCurrentTab] = useState({ name: "profile" });
  const [tabs] = useState([
    { tabKey: "profile", tabTitle: "Mon profile" },
    { tabKey: "posts", tabTitle: "Mes articles" },
  ]);
  const handleTabs = (name) => {
    setCurrentTab({ name });
  };
  return (
    <>
      <div className="tabs">
        <ul>
          {tabs.map((tab, index) => (
            <li key={index}
              className={`tabs-pane ${
                curentTab.name === tab.tabKey ? "active" : ""
              }`}
            >
              <span onClick={() => handleTabs(tab.tabKey)}>{tab.tabTitle}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="tabs-contents">
        {curentTab.name === "profile" && <Profile />}
        {curentTab.name === "posts" && <Posts />}
      </div>
    </>
  );
};

export default Account;
