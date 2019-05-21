import {
  getCurrentRegion
} from "../actions/region";

const initState = {
  region: getCurrentRegion().code,
  listVideo: [],
  user: {},
  isLoadMore: true
};
export default initState;