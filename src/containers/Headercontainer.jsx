import loadable from "@loadable/component";
const HeaderContainer = loadable(
  () => import("../components/headercomponent/headercomponent.jsx"),
  {
    fallback: null
  }
);
export default HeaderContainer;
