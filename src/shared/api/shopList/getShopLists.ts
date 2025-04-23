import {apiInstance} from "../api.ts";
import {ShortShopListDto} from "./types.ts";
import {useQueryRequest} from "../useQueryRequest.ts";

export async function getShopLists(signal: AbortSignal) {
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