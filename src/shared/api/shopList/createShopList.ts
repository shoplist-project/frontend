import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";
import {CreateShopListDto, ShopListDto} from "./types.ts";

export async function createShopList(signal: AbortSignal, shopList: CreateShopListDto) {
    const response = await apiInstance(signal).post<ShopListDto>('/api/shoplists', shopList)

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