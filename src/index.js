import React from "react";
import Reactdom from "react-dom";
import AppContainer from "./containers/AppContainer.jsx";
Reactdom.render(<AppContainer />, document.getElementById("root"));
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .catch(() => "serviceWorker register failed");
  });
}
