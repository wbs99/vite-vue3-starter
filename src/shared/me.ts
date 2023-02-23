import { AxiosResponse } from "axios";
import { fetchMeApi } from "../apis";

export let mePromise: Promise<AxiosResponse<{
  resource: {
    id: number;
  };
}>> | undefined

export const fetchMe = () => {
  mePromise = fetchMeApi()
  return mePromise
}