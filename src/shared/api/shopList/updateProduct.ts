import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";
import {ProductDto, UpdateProductDto} from "./types.ts";

export async function updateProduct(signal: AbortSignal, shopListId: string, productId: string, product: UpdateProductDto) {
    const response = await apiInstance(signal).post<ProductDto>(`/api/shoplists/${shopListId}/products/${productId}`, product)

    return response.data
}

export function useUpdateProduct() {
    const {request, loading, data} = useMutationRequest(updateProduct)
    return {
        updateProductRequest: request,
        updateProductData: data,
        updateProductLoading: loading
    }
}