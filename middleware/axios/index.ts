import axios from "axios";

const baseUrl = "/api/v1";

const getBaseUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:8080" + baseUrl;
    }

    if (typeof process.env.NEXT_PUBLIC_API !== "undefined") {
        return process.env.NEXT_PUBLIC_API + baseUrl;
    }

    return baseUrl;
};

const instance = axios.create({
    responseType: "json",
    baseURL: getBaseUrl(),
    withCredentials: true,
});

export default instance;
