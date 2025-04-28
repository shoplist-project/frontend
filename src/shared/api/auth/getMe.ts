import {apiInstance} from "../api.ts";
import {useQueryRequest} from "../useQueryRequest.ts";
import {UserDto} from "./types.ts";

export async function getMe(signal: AbortSignal) {
    const response = await apiInstance(signal).get<UserDto>(`/api/auth/me`)

    return response.data
}

export function useMe() {
    const {loading, data, hasError} = useQueryRequest(['auth', 'me'], (signal) => getMe(signal))
    return {
        meData: data,
        meLoading: loading,
        meHasError: hasError
    }
}