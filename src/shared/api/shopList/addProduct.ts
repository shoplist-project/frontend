import {apiInstance} from "../api.ts";
import {useMutationRequest} from "../useMutationRequest.ts";
import {AddProductDto, ProductDto} from "./types.ts";

export async function addProduct(signal: AbortSignal, shopListId: string, product: AddProductDto) {
    const response = await apiInstance(signal).post<ProductDto>(`/api/shoplists/${shopListId}/products`, product)

    return response.data
}

export function useAddProduct() {
    const {request, loading, data} = useMutationRequest(addProduct)
    return {
        addProductRequest: request,
        addProductData: data,
        addProductLoading: loading
    }
}