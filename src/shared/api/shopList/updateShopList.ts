import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";
import {EditShopListDto} from "./types.ts";

export async function editShopList(signal: AbortSignal, shopListId: string, shopList: EditShopListDto) {
    const response = await apiInstance(signal).put<string>(`/api/shoplists/${shopListId}`, shopList)

    return response.data
}

export function useEditShopList() {
    const {request, loading, data} = useMutationRequest(editShopList)
    return {
        editShopListRequest: request,
        editShopListData: data,
        editShopListLoading: loading
    }
}