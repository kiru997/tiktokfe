import * as ActionTypes from "../constants/actionTypes";

const AppReducer = (initState, action) => {
  const newState = {
    ...initState
  };
  switch (action.type) {
    case ActionTypes.FETCH_MORE_VIDEO:
      newState.listVideo = newState.listVideo.concat(action.listVideo);
      return newState;
    case ActionTypes.FETCH_NEW_LIST_VIDEO:
      newState.listVideo = action.listVideo;
      return newState;
    case ActionTypes.CHANGE_REGION:
      newState.region = action.region;
      return newState;
    case ActionTypes.FETCH_LIST_USER_VIDEO:
      newState.listVideo = action.listVideo;
      return newState;
    case ActionTypes.GET_USER_INFO:
      newState.user = action.user;
      return newState;
    case ActionTypes.SET_LOAD_MORE_VIDEO:
      newState.isLoadMore = action.isLoadMore;
      return newState;

    default:
      return initState;
  }
};
export default AppReducer;