import axios, { AxiosRequestConfig } from "axios";

const axiosRequest = async (
  config: AxiosRequestConfig
): Promise<Record<string, unknown>> => {
  // return axios(config);
  const response = await axios(config);
  return response.data;
};

export default axiosRequest;
