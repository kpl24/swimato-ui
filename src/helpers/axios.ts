import axios, { AxiosHeaders, AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { getBaseUrl } from "../constants";

type onUploadProgress = (arg0: AxiosProgressEvent) => void

export const api = ({ method, url, data, token, onUploadProgress, isExternal }: { method: string, url: string, data?: object | undefined, token?: string, onUploadProgress?: onUploadProgress | undefined, isExternal?: boolean }) => {
    const headers = new AxiosHeaders({ "Authorization": `Bearer ${token}` })
    const apiConfig: AxiosRequestConfig = {
        method: method,
        url: isExternal ? url : `${getBaseUrl(import.meta.env.MODE)}${url}`,
        data: data,
        headers: headers,
        onUploadProgress: onUploadProgress
    };
    return axios(apiConfig)
        .then(res => { return res.data; })
        .catch((err) => { throw err?.response?.data?.data?.message || 'Something went wrong' });
};