import * as ActionTypes from "../constants/actionTypes";
import { getCookie, setCookie } from "./cookie";
import Regions from "../constants/regions";

const actChangeRegion = region => {
  return {
    type: ActionTypes.CHANGE_REGION,
    region
  };
};
export const actChangeRegionRequest = (dispatch, regionCode) => {
  return dispatch(actChangeRegion(regionCode));
};
export const getCurrentRegion = () => {
  let regionCookie = getCookie("region", true);
  if (!regionCookie) {
    regionCookie = Regions.filter(res => res.code === "VN");
    return regionCookie[0];
  }
  return regionCookie;
};
export const setCurrentRegion = regionCode => {
  const region = Regions.filter(res => res.code === regionCode)[0];
  if (region) {
    setCookie("region", region, 30, true);
  }
};
