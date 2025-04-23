import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";
import {CreateShopListDto} from "./types.ts";

export async function createShopList(signal: AbortSignal, loginRequest: CreateShopListDto) {
    const response = await apiInstance(signal).post<string>('/api/shoplists', loginRequest)

    return response.data
}

export function useCreateShopList() {
    const {request, loading, data} = useMutationRequest(createShopList)
    return {
        createShopListRequest: request,
        createShopListData: data,
        createShopListLoading: loading
    }
}