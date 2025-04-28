import {apiInstance} from "../api.ts";
import {ShopListDto} from "./types.ts";
import {useQueryRequest} from "../useQueryRequest.ts";

export async function getShopList(signal: AbortSignal, shopListId: string): Promise<ShopListDto> {
    const response = await apiInstance(signal).get<ShopListDto>(`/api/shoplists/${shopListId}`)

    return response.data
}

export function useShopList(shopListId: string) {
    const {loading, data} = useQueryRequest(['shopLists', shopListId], (signal) => getShopList(signal, shopListId), {
        enabled: shopListId.length > 0
    })
    return {
        shopListData: data,
        shopListLoading: loading
    }
}