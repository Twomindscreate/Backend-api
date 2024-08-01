import axios from "axios";
import SessionDetails from "./session-util";
import BASE_URL from "./urls";

const httpService = (
  paramUrl,
  type = "get",
  data,
  multipart = false,
  additionalHeaders = {},
  stream = false,
  additionalConfig
) => {
  //   let BASE_URL = window.$BASE_URL;

  //   if (!window.location.origin.includes("localhost")) {
  //     BASE_URL = window.location.origin;
  //   }
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    ...additionalConfig,
  };
  if (additionalHeaders) {
    config.headers = { ...config.headers, ...additionalHeaders };
  }

  if (multipart) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  if (stream) {
    config.headers["responseType"] = "blob";
  }
  let { accessToken } = SessionDetails();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  //   if (!additionalConfig.cancelToken) config.cancelToken = source.token;

  let url = `${BASE_URL}/${paramUrl}`;
  console.log(type, "-------------", url);
  switch (type) {
    case "get": {
      const proimse = axios.get(url, config);
      proimse.cancel = () => {
        source.cancel("Api canceled");
      };
      return proimse;
    }
    case "post":
    case "put":
    case "patch":
      return axios[type](url, data, config);
    case "delete":
      if (data) config.data = data;
      return axios.delete(url, config);
    default: {
      break;
    }
  }
  return null;
};

export default httpService;
