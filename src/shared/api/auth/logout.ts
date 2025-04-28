import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";

export async function logout(signal: AbortSignal) {
    await apiInstance(signal).post('/api/logout')
}

export function useLogout() {
    const {request, loading, data} = useMutationRequest(logout)
    return {
        logoutRequest: request,
        logoutData: data,
        logoutLoading: loading
    }
}