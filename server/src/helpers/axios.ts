import axios, { AxiosRequestConfig } from "axios";

const axiosRequest = async (
  config: AxiosRequestConfig
): Promise<Record<string, unknown>> => {
  // return axios(config);
  const { data, headers } = await axios(config);
  return { data, headers };
};

export default axiosRequest;
