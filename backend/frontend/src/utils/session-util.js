import CookieUtils from "./cookies-util";

const SessionDetails = () => {
  const { getCookie } = CookieUtils();

  const cookie = getCookie();
  return {
    accessToken: cookie.access_token,
    refreshToken: cookie.refresh_token,
  };
};
export default SessionDetails;
