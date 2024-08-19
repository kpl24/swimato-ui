import axios, { AxiosHeaders, AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { baseUrl } from "../constants";

type onUploadProgress = (arg0: AxiosProgressEvent) => void

export const api = ({ method, url, data, token, onUploadProgress }: { method: string, url: string, data?: object | undefined, token?: string, onUploadProgress?: onUploadProgress | undefined }) => {
    const headers = new AxiosHeaders({ "Authorization": `Bearer ${token}` })
    const apiConfig: AxiosRequestConfig = {
        method: method,
        url: `${baseUrl}${url}`,
        data: data,
        headers: headers,
        onUploadProgress: onUploadProgress ? onUploadProgress : undefined
    };
    return axios(apiConfig)
        .then(res => { return res.data; })
        .catch((err) => { throw err?.response?.data?.data?.message || 'Something went wrong' });
};