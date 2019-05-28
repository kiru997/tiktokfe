import loadable from "@loadable/component";
const ListvideoContainer = loadable(
  () => import("../components/listvideocomponent/listvideocomponent.jsx"),
  {
    fallback: null
  }
);
export default ListvideoContainer;
