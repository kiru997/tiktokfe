import React, { useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GlobalContext from "../context/GlobalContext";
import AppReducer from "../reducers/appReducer";
import initState from "../constants/initState";
import {
  actgetListVideoRequest,
  actgetListUserVideoRequest,
  actgetUserInfoRequest,
  actSetLoadMoreRequest
} from "../actions/tiktok";
import { getCurrentRegion, actChangeRegionRequest } from "../actions/region";
import { getPercentScrollOfElement, debounce } from "../actions/lodash";
const AppContainer = props => {
  const [state, dispatch] = useReducer(AppReducer, initState);
  const { region, user, listVideo, isLoadMore } = state;
  const [positionScroll, setPositionScroll] = useState(0);
  const [loading, setLoading] = useState(true);
  const actFetchListVideo = (regionCode, isLoadMore) => {
    return actgetListVideoRequest(dispatch, regionCode, isLoadMore);
  };
  const actChangeRegion = regionCode => {
    return actChangeRegionRequest(dispatch, regionCode);
  };
  const actgetListUserVideo = (userUid, region) => {
    return actgetListUserVideoRequest(dispatch, userUid, region);
  };
  const actGetUserInfo = (userUid, region) => {
    return actgetUserInfoRequest(dispatch, userUid, region);
  };
  const actSetLoadMore = isLoadMore => {
    return actSetLoadMoreRequest(dispatch, isLoadMore);
  };
  const updateValue = debounce(position => {
    setPositionScroll(position);
    actFetchListVideo(getCurrentRegion().code, true).then(() =>
      setLoading(false)
    );
  }, 1000);
  const onScrollEvent = e => {
    if (isLoadMore) {
      if (e.target.className === "body-container") {
        if (getPercentScrollOfElement(e) > 90) {
          if (e.target.scrollTop > positionScroll) {
            setLoading(true);
            updateValue(e.target.scrollTop);
          }
        }
      }
    }
  };
  useEffect(() => {
    setPositionScroll(0);
  }, [isLoadMore]);
  return (
    <GlobalContext.Provider
      value={{
        loading,
        region,
        listVideo,
        user,
        actChangeRegion,
        actFetchListVideo,
        actgetListUserVideo,
        actGetUserInfo,
        actSetLoadMore,
      }}
    >
      <Router>
        <div className="body-container" onScroll={e => onScrollEvent(e)}>
          {props.children}
        </div>
      </Router>
    </GlobalContext.Provider>
  );
};
export default AppContainer;
