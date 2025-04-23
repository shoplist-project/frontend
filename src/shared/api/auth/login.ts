import {apiInstance} from "../api.ts";
import {LoginRequestDto, LoginResponseDto} from "./types.ts";
import {useMutationRequest} from "../useMutationRequest.ts";

export async function login(signal: AbortSignal, loginRequest: LoginRequestDto) {
    const response = await apiInstance(signal).post<LoginResponseDto>('/api/login', loginRequest)

    return response.data
}

export function useLogin() {
    const {request, loading, data} = useMutationRequest(login)
    return {
        loginRequest: request,
        loginData: data,
        loginLoading: loading
    }
}