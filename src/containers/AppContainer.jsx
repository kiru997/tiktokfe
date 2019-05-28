import React from "react";
import { Route, Switch } from "react-router-dom";
import GlobalState from "../context/GlobalState.jsx";
import HeaderContainer from "./Headercontainer.jsx";
import ListvideoContainer from "./ListvideoContainer.jsx";
import VideodetailContainer from "./VideodetailContainer.jsx";
import UserContainer from "./UserContainer.jsx";
const AppContainer = () => {
  return (
    <GlobalState>
      <Route path="/" component={HeaderContainer} />
      <Route
        exact
        path="/:region/users/:userUid"
        component={math => <UserContainer {...math} />}
      />
      <Switch>
        <Route
          exact
          path="/"
          component={math => <ListvideoContainer {...math} />}
        />
        <Route
          exact
          path="/:region"
          component={math => <ListvideoContainer {...math} />}
        />
        <Route
          exact
          path="/:region/users/:userUid"
          component={math => <ListvideoContainer {...math} />}
        />
         <Route
          exact
          path="/:region/videos/:videoUid"
          component={math => <ListvideoContainer {...math} />}
        />
      </Switch>
      <Route
        exact
        path="/:region/videos/:videoUid"
        component={math => <VideodetailContainer {...math} />}
      />
    </GlobalState>
  );
};
export default AppContainer;
