export const setCookie = (name, value, days, isJSON = false) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${(isJSON ? JSON.stringify(value) : value) ||
    ""}${expires}; path=/`;
};
export const getCookie = (name, isJSON = false) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; ++i) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return isJSON
        ? JSON.parse(c.substring(nameEQ.length, c.length))
        : c.substring(nameEQ.length, c.length);
  }
  return null;
};
export const clearCookie = name => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};
