import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios from "~/middleware/axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import type ResponseData from "~/model/api/ResponseData";
import type SiteInfo from "~/model/api/siteInfo";

const axiosBaseQuery: BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
}> = async ({ url, method, data, params, headers }) => {
    try {
        const result = await axios.request<ResponseData>({
            url: url,
            method: method || "GET",
            data: data,
            params: params,
            headers: headers,
        });

        return { data: result.data.data };
    } catch (axiosError) {
        let err = axiosError as AxiosError<ResponseData>;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data.message || err.message,
            },
        };
    }
};

const api = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery,
    refetchOnReconnect: true,
    tagTypes: ["Setting", "DonateInfo"],
    endpoints: (builder) => ({
        ping: builder.query<boolean, void>({
            query: () => ({
                url: "/ping",
                method: "GET",
            }),
            transformResponse() {
                return true;
            },
        }),
        getSiteInfo: builder.query<SiteInfo, void>({
            query: () => ({
                url: "/siteInfo",
                method: "GET",
            }),
            providesTags: ["Setting"],
        }),
    }),
});

export const { usePingQuery, useGetSiteInfoQuery } = api;
export default api;
