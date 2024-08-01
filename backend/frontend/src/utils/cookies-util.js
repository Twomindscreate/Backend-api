import Cookies from "js-cookie";

const CookieUtils = () => {
  const cookieOption = { domain: window.location.hostname };
  const setCookie = (name, value) => Cookies.set(name, value, cookieOption);
  const removeCookie = (name) => Cookies.remove(name, cookieOption);

  const getCookie = () => {
    return Cookies.get();
  };

  return {
    setCookie,
    removeCookie,
    getCookie,
  };
};

export default CookieUtils;
