export type ShortShopListDto = Omit<ShopListDto, 'products'>

export type ShopListDto = {
    id: string
    name: string
    access: Access
    ownerId: string
    sharedWith: ShareShopListItem[]
    products: ProductDto[]
}

export type ShareShopListItem = {
    username: string
    access: Access
}

export type CreateShopListDto = Pick<ShopListDto, 'name'>
export type EditShopListDto = Pick<ShopListDto, 'name'>

export type ProductDto = {
    id: string
    name: string
    strikeout: boolean
}

export type AddProductDto = Pick<ProductDto, 'name'>

export type UpdateProductDto = Partial<Pick<ProductDto, 'name' | 'strikeout'>>

export enum Access {
    Read = 1,
    Write = 2
}

export type ShareShopListDto = {
    users: string[]
    access: Access
}
