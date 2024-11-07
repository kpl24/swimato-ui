import axios, { AxiosHeaders, AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { getBaseUrl } from "../constants";
import { APIResponse } from "../constants/types";

type onUploadProgress = (arg0: AxiosProgressEvent) => void

export const api = ({ method, url, data, onUploadProgress, token }: { method: string, url: string, data?: object | undefined, onUploadProgress?: onUploadProgress | undefined, token?: string }) => {
    const headers = new AxiosHeaders({
        'Content-Type': 'application/json',
        'Cookie': 'token',
        'Authorization': token? `Bearer ${token}` : ''
    })
    const apiConfig: AxiosRequestConfig = {
        method: method,
        url: `${getBaseUrl(import.meta.env.MODE)}${url}`,
        data: data,
        headers: headers,
        onUploadProgress: onUploadProgress
    };
    return axios(apiConfig)
        .then(res => { return res.data; })
        .catch((err) => {
            throw ({ status: { code: err?.response?.status || 500, message: err?.message || 'Something went wrong' } } as APIResponse)
        });
};