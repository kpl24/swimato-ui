import axios, { AxiosHeaders, AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { getBaseUrl } from "../constants";

type onUploadProgress = (arg0: AxiosProgressEvent) => void

export const api = ({ method, url, data, onUploadProgress, isAdmin = false }: { method: string, url: string, data?: object | undefined, onUploadProgress?: onUploadProgress | undefined, isAdmin?: boolean }) => {
    const headers = new AxiosHeaders({
        'Content-Type': 'application/json',
        'Cookie': 'token',
    })
    const apiConfig: AxiosRequestConfig = {
        method: method,
        url: isAdmin ? `${getBaseUrl(import.meta.env.MODE)}/admin${url}` : `${getBaseUrl(import.meta.env.MODE)}${url}`,
        data: data,
        headers: headers,
        withCredentials: true,
        onUploadProgress: onUploadProgress
    };
    return axios(apiConfig)
        .then(res => { return res.data; })
        .catch((err) => {
            if (err?.response?.data?.status) {
                return err.response.data
            } else {
                throw ({ status: { code: err?.response?.status || 500, message: 'Something went wrong' }, data: err?.response?.data })
            }
        });
};