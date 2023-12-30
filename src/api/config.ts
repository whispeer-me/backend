import qs from "qs";
import { PathLike } from "fs";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

const baseURL = process.env.API_BASE_URL;

const commonHeader: AxiosRequestHeaders = {
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const apiConfig: AxiosRequestConfig = {
  baseURL: baseURL,
  withCredentials: false,
  timeout: 60 * 1000, // 1 minute
  headers: commonHeader,

  paramsSerializer: (params: PathLike) =>
    qs.stringify(params, { indices: false }),
};
