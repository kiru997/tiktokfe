import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListRegions from "./children/listRegions.jsx";

import { getCurrentRegion } from "../../actions/region";

import regions from "../../constants/regions";
const TikTokIcon = require("../../assets/images/tiktok-icon.svg");
const TikTokText = require("../../assets/images/tiktok_text.svg");

const HeaderComponent = () => {
  const [regionName, setRegionName] = useState(getCurrentRegion().region);
  const [state, setState] = useState({
    isOpenSelectRegion: false,
    isOpenSelectLanguage: false,
    isOpenMenuContainer: false
  });
  const setOpenOne = (
    isOpenSelectRegion,
    isOpenSelectLanguage,
    isOpenMenuContainer
  ) => {
    setState({
      isOpenSelectRegion,
      isOpenSelectLanguage,
      isOpenMenuContainer
    });
  };
  const onChangeRegion = regionName => {
    setRegionName(regionName);
  };
  const { isOpenSelectRegion, isOpenMenuContainer } = state;
  return (
    <header className="header">
      <div className="header-container">
        <div>
          <Link to="/" className="logo">
            <img alt="" src={TikTokIcon} />
            <img alt="" src={TikTokText} />
          </Link>
        </div>
        <div className="menu-container">
          <div className="menu-item">
            <Link to="/">Home</Link>
          </div>
          <div
            className={`menu-item menu-region ${
              isOpenSelectRegion ? "menu-region-open" : ""
            }`}
            onClick={() => {
              setOpenOne(!isOpenSelectRegion, false, false);
            }}
          >
            <span>{regionName}</span>
            <div className="menu-arrow-region">
              <span className="arrow arrow-left-region" />
              <span className="arrow arrow-right-region" />
            </div>
            <div className="menu-region-expand">
              <ListRegions onChangeRegion={onChangeRegion} regions={regions} />
            </div>
          </div>
          {/* <div
            onClick={() => setOpenOne(false, !isOpenSelectLanguage, false)}
            className={`menu-item menu-language ${
              isOpenSelectLanguage ? "menu-language-open" : ""
            }`}
          >
            <span>{language.language}</span>
            <div className="menu-arrow">
              <span className="arrow arrow-left" />
              <span className="arrow arrow-right" />
            </div>
            <div className="menu-language-expand">
              {listLanguage(languages)}
            </div>
          </div> */}
          {/* <div className="menu-item">
            <div
              onClick={() => setOpenOne(false, false, !isOpenMenuContainer)}
              className={`menu-burger ${
                isOpenMenuContainer ? "menu-burger-open" : ""
              }`}
            >
              <span className="menu-burger-part menu-burger-top" />
              <span className="menu-burger-part menu-burger-mid" />
              <span className="menu-burger-part menu-burger-bottom" />
            </div>
            <div className="menu-right" />
          </div> */}
        </div>
      </div>
    </header>
  );
};
export default HeaderComponent;
