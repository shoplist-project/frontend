import axios from "axios";

export function apiInstance(abortSignal: AbortSignal | AbortController) {
    return axios.create({
        baseURL: import.meta.env.BASE_URL,
        signal: abortSignal instanceof AbortSignal ? abortSignal : abortSignal.signal
    })
}
