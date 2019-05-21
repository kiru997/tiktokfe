import { URL_API } from "../constants/config";

const callAPi = (url = "", method = "GET", headers = {}, param = {}) => {
  const headersBody = Object.assign(
    {
      "Content-Type": "application/json"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    headers
  );
  let apiBody = {
    method,
    headers: headersBody
  };
  if (method != "GET") {
    apiBody = Object.assign(apiBody, {
      body: JSON.stringify(param)
    });
  }
  const result = fetch(URL_API + url, apiBody)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      return myJson;
    })
    .catch(error => {
      return [];
    });
  return result;
};
export default callAPi;
