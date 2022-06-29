import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios from "~/middleware/axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import type ResponseData from "~/model/response/responseData";
import type SiteInfoResponse from "~/model/response/siteInfoResponse";
import type DonateInfoResponse from "~/model/response/donateInfoResponse";

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

        if (result.data.code !== 200) {
            return {
                error: {
                    status: result.data.code,
                    message: result.data.message,
                },
            };
        }

        return { data: result.data.data };
    } catch (axiosError) {
        let err = axiosError as AxiosError<ResponseData>;
        return {
            error: {
                status: err.response?.status,
                message: err.response?.data.message || err.message,
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
        getSiteInfo: builder.query<SiteInfoResponse, void>({
            query: () => ({
                url: "/siteInfo",
                method: "GET",
            }),
            providesTags: ["Setting"],
        }),
        postDonateInfo: builder.mutation<DonateInfoResponse, FormData>({
            query: (data) => ({
                url: "/donate",
                method: "POST",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            invalidatesTags: ["DonateInfo"],
        }),
        getRandomDonateInfo: builder.query<DonateInfoResponse, number>({
            query: (prevId) => ({
                url: "/donate/random",
                method: "GET",
                params: { prevId },
            }),
        }),
    }),
});

export const {
    usePingQuery,
    useGetSiteInfoQuery,
    usePostDonateInfoMutation,
    useGetRandomDonateInfoQuery,
} = api;
export default api;
