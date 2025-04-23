import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";

export async function unShareShopList(signal: AbortSignal, shopListId: string, unShareWith: string[]) {
    const response = await apiInstance(signal).post<string[]>(`/api/shoplists/${shopListId}/unshare`, unShareWith)

    return response.data
}

export function useUnShareShopList() {
    const {request, loading, data} = useMutationRequest(unShareShopList)
    return {
        shareShopListRequest: request,
        shareShopListData: data,
        shareShopListLoading: loading
    }
}