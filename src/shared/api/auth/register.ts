import {apiInstance} from "../api.ts";
import {RegistrationRequestDto, RegistrationResponseDto} from "./types.ts";
import {useMutationRequest} from "../useMutationRequest.ts";

export async function register(signal: AbortSignal, registrationRequest: RegistrationRequestDto) {
    const response = await apiInstance(signal).post<RegistrationResponseDto>('/api/register', registrationRequest)

    return response.data
}

export function useRegister() {
    const {request, loading, data} = useMutationRequest(register)

    return {
        registerRequest: request,
        registerData: data,
        registerLoading: loading
    }
}