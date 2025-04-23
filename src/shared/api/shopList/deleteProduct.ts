import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";
import {ProductDto} from "./types.ts";

export async function deleteProduct(signal: AbortSignal, shopListId: string, productId: string) {
    const response = await apiInstance(signal).delete<ProductDto>(`/api/shoplists/${shopListId}/products/${productId}`)

    return response.data
}

export function useDeleteProduct() {
    const {request, loading, data} = useMutationRequest(deleteProduct)
    return {
        deleteProductRequest: request,
        deleteProductData: data,
        deleteProductLoading: loading
    }
}