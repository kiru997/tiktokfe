import loadable from "@loadable/component";
const UserContainer = loadable(
  () => import("../components/usercomponent/usercomponent.jsx"),
  {
    fallback: null
  }
);
export default UserContainer;
