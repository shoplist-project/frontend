import {ShortShopListDto} from "./types.ts";
import {useQueryRequest} from "../useQueryRequest.ts";
import {apiInstance} from "../api.ts";

export async function getShopLists(signal: AbortSignal): Promise<ShortShopListDto[]> {
    const response = await apiInstance(signal).get<ShortShopListDto[]>('/api/shoplists')

    return response.data
}

export function useShopLists() {
    const {loading, data} = useQueryRequest(['shopLists'], getShopLists)
    return {
        shopListsData: data,
        shopListsLoading: loading
    }
}