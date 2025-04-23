import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";
import {ShareShopListDto} from "./types.ts";

export async function shareShopList(signal: AbortSignal, shopListId: string, shareDto: ShareShopListDto) {
    const response = await apiInstance(signal).post<string[]>(`/api/shoplists/${shopListId}/share`, shareDto)

    return response.data
}

export function useShareShopList() {
    const {request, loading, data} = useMutationRequest(shareShopList)
    return {
        shareShopListRequest: request,
        shareShopListData: data,
        shareShopListLoading: loading
    }
}