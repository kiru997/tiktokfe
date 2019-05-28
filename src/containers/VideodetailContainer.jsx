import loadable from "@loadable/component";
const VideodetailContainer = loadable(
  () => import("../components/videodetailcomponent/videodetailcomponent.jsx"),
  {
    fallback: null
  }
);
export default VideodetailContainer;
