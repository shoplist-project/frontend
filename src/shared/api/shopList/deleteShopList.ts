import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";

export async function deleteShopList(signal: AbortSignal, shopListId: string) {
    await apiInstance(signal).delete<void>(`/api/shoplists/${shopListId}`)
}

export function useDeleteShopList() {
    const {request, loading, data} = useMutationRequest(deleteShopList)
    return {
        deleteShopListRequest: request,
        deleteShopListData: data,
        deleteShopListLoading: loading
    }
}