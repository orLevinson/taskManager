import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import { useHttpType } from "../../types/HttpRequestTypes";

const useHttp = () => {
  const httpHandler: useHttpType = useCallback(
    async (url, method, body, headers) => {
      try {
        const data: any = await axios({
          url: url,
          method,
          headers,
          data: body,
        });

        const error = data.success === false ? { error: data.message } : {};

        return {
          ...error,
          ...data,
        };
      } catch (err: any | AxiosError) {
        if (axios.isAxiosError(err)) {
          return {
            error: err.response?.data.message
              ? err.response?.data.message
              : "unknown error occured",
          };
        } else {
          return {
            error: "unknown error occured",
          };
        }
      }
    },
    []
  );

  return { httpHandler };
};

export default useHttp;
