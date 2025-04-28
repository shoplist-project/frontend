import {Access, useDeleteShopList,useEditShopList, useMe, useShopLists} from "../../shared/api";
import {Button, Form, Input, InputRef, List, Modal, Typography} from "antd";
import {Link} from "react-router";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useRef} from "react";

import './Shoplists.css'

export function Shoplists() {
    const {shopListsData, shopListsLoading} = useShopLists()
    const {editShopListRequest} = useEditShopList()
    const {deleteShopListRequest} = useDeleteShopList()
    const editInputRef = useRef<InputRef | null>(null)
    const {meData} = useMe()
    const [modal, contextHolder] = Modal.useModal()
    // loader
    if (shopListsLoading && !shopListsData) return <></>

    const handleDelete = (shopListId: string) => async () => {
        const ok = await modal.confirm({
            title: "Удаление списка",
            content: 'Подтвердите удаление списка',
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена'
        })
        if (ok)
            await deleteShopListRequest(shopListId)
    }

    const handleEdit = (shopListId: string) => async () => {
        const name = shopListsData?.find(shopList => shopList.id === shopListId)?.name
        if (typeof name === 'string') {
            modal.confirm({
                title: 'Изменение списка',
                okText: 'Сохранить',
                cancelText: 'Отменить',
                onOk: async () => {
                    const newName = editInputRef.current?.input?.value
                    if (newName)
                        await editShopListRequest(shopListId, {name: newName})
                },
                content: (
                    <Form layout='vertical'>
                        <Form.Item label='Название списка'>
                            <Input placeholder='Введите название' ref={editInputRef} defaultValue={name}/>
                        </Form.Item>
                    </Form>
                )
            })
        }
    }
    return (
        <div className='shoplists-container'>
            <Typography.Title level={4}>Ваши списки</Typography.Title>
            {contextHolder}
            <List>
                {
                    shopListsData.map(shopList => (
                        <List.Item
                            style={{position: 'relative', padding: '16px 6px'}}
                            actions={[
                                <Button
                                    disabled={shopList.access !== Access.Write}
                                    className='actionButton'
                                    type='text'
                                    size='small'
                                    onClick={handleEdit(shopList.id)}
                                    icon={<EditOutlined/>}
                                />,
                                <Button
                                    disabled={meData?.id !== shopList.ownerId}
                                    className='actionButton'
                                    type='text'
                                    size='small'
                                    onClick={handleDelete(shopList.id)}
                                    icon={<DeleteOutlined/>}
                                />
                            ]}
                        >
                            <Typography.Text style={{zIndex: 1}}>{shopList.name}</Typography.Text>
                            <Link className='shoplist-item-link' to={`/shoplists/${shopList.id}`}/>
                        </List.Item>
                    ))
                }
            </List>
        </div>
    )
}