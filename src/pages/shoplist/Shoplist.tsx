import {useParams} from "react-router";
import {
    Access,
    ProductDto,
    ShopListDto,
    useAddProduct, useDeleteProduct,
    useMe,
    useShareShopList,
    useShopList, useUnShareShopList,
    useUpdateProduct
} from "../../shared/api";
import {Button, Checkbox, Input, InputRef, List, Modal, Space, Typography} from "antd";
import './Shoplist.css'
import {DeleteOutlined, EditOutlined, ExportOutlined, EyeOutlined, PlusOutlined} from "@ant-design/icons";
import {useEffect, useRef, useState} from "react";

export function Shoplist() {
    const {id = ''} = useParams<{ id: string }>()

    const {shopListData, shopListLoading, shopListRefetch} = useShopList(id)

    const {meData} = useMe()
    const {updateProductRequest} = useUpdateProduct()

    const [modal, ModalComponent] = Modal.useModal()
    const {addProductRequest} = useAddProduct()
    const {deleteProductRequest} = useDeleteProduct()
    const [currentEditId, setCurrentEditId] = useState<ProductDto | undefined>()
    const inputRef = useRef<InputRef | null>(null)
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [currentEditId]);

    const updateProduct = (productId: string) => async (data: Partial<Pick<ProductDto, 'name' | 'strikeout'>>) => {
        await updateProductRequest(id, productId, data)
        await shopListRefetch()
    }

    const handleUpdateProduct = async (productId: string, name: string) => {
        await updateProduct(productId)({name})
        setCurrentEditId(undefined)
    }

    const handleAddProduct = async () => {
        await addProductRequest(id, {name: 'Новый продукт'})
        await shopListRefetch()
    }

    const handleOpenShareModal = async () => {
        if (shopListData) {
            await modal.info({
                    icon: <></>,
                    title: 'Управление доступом',
                    cancelText: <></>,
                    content: <ShareModalContent shopList={shopListData}/>
                }
            )
            await shopListRefetch()
        }

    }

    const handleDeleteProduct = (id: string) => async () => {
        if (shopListData) {
            await deleteProductRequest(shopListData.id, id)
            await shopListRefetch()
        }

    }

    if (shopListLoading || !shopListData) return <></>

    return (
        <div className='shoplist-container'>
            {ModalComponent}
            <Typography.Title level={4}>
                {shopListData.name}
                {
                    shopListData.ownerId === meData?.id && (
                        <Button onClick={handleOpenShareModal} size='small' type='text' icon={<ExportOutlined/>}></Button>
                    )
                }
            </Typography.Title>
            <List>
                {
                    shopListData.access === Access.Write && (
                        <List.Item
                            key='addProduct'
                            onClick={handleAddProduct}
                            actions={[
                                <Button size='small' className='add-button' type='text' icon={<PlusOutlined/>}/>
                            ]}
                            className='product-card add-product-card'>
                            <Typography.Text>Добавить продукт</Typography.Text>
                        </List.Item>
                    )
                }
                {
                    shopListData.products.map(product => (
                            <List.Item
                                key={product.id}
                                className='product-card'
                                actions={[
                                    <Button onClick={handleDeleteProduct(product.id)} type='text' size='small' icon={<DeleteOutlined/>}/>
                                ]}>
                                <List.Item.Meta
                                    avatar={
                                        <Checkbox
                                            checked={product.strikeout}
                                            onChange={e => updateProduct(product.id)({strikeout: e.target.checked})}
                                        />
                                    }
                                    title={
                                        <Input
                                            variant='borderless'
                                            ref={inputRef}
                                            defaultValue={product.name}
                                            className={product.strikeout ? 'product-name-strikeout' : ''}
                                            size='small'
                                            onBlur={(e) => e.target.value !== product.name && handleUpdateProduct(product.id, e.target.value)}
                                        />
                                    }
                                />
                            </List.Item>
                        )
                    )
                }
            </List>
        </div>
    )
}

const ShareModalContent = (props: { shopList: ShopListDto }) => {
    const {shopList} = props
    const {shopListData, shopListRefetch} = useShopList(shopList.id)

    const [shareUsername, setShareUsername] = useState('')
    const {shareShopListRequest} = useShareShopList()
    const {unShareShopListRequest} = useUnShareShopList()

    const handleShare = (access: Access) => async () => {
        await shareShopListRequest(shopList.id, {users: [shareUsername], access})
        setShareUsername('')
        shopListRefetch()
    }
    return (
        <>
            <div style={{width: '100%', display: 'flex', gap: '6px'}}>
                <Input
                    style={{width: '100%'}}
                    placeholder='Добавить пользователя'
                    value={shareUsername}
                    onChange={(e) => setShareUsername(e.target.value)}
                />
                <Space.Compact>
                    <Button onClick={handleShare(Access.Read)} icon={<EyeOutlined/>}/>
                    <Button onClick={handleShare(Access.Write)} icon={<EditOutlined/>}/>
                </Space.Compact>
            </div>
            <List>
                {
                    shopListData?.sharedWith.map(person => (
                        <List.Item
                            actions={[
                                <Button
                                    size='small'
                                    type='text'
                                    onClick={async () => {
                                        await unShareShopListRequest(shopList.id, [person.username])
                                        await shopListRefetch()
                                    }}
                                    icon={<DeleteOutlined/>}
                                />
                            ]}
                        >
                            <List.Item.Meta
                                title={person.username}
                                avatar={person.access === Access.Write ? <EditOutlined/> : <EyeOutlined/>}
                            />
                        </List.Item>
                    ))
                }
            </List>
        </>
    )
}