import avatarJpg from '@assets/shadcn-user.jpg'
import { ItemSpotType } from '@entities/spots/types'
import { Edit, Eye, Gauge, Logs, Trash, Type, User, UserCheck } from 'lucide-react'
import IconButtonWithTooltip from '@feature/iconButtonTooltip'
import ModalGenLink from '../modal-gen-link'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalDelete from '@feature/modal-delete'

interface ItemSpotProps {
    item: ItemSpotType
}

const ItemSpot: React.FC<ItemSpotProps> = ({ item }) => {

    const [openLink, setOpenLink] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const navigate = useNavigate()

    const OpenDeleteModal = (id: string) => {
        setDeleteId(id)
        setOpenDelete(true)
    }

    const onDeleteSpot = (id: string) => {
        console.log(id);
    }

    return (
        <>
            <div className="spot-card w-full grid gap-[14px] p-[17px] border-[1px] border-[#D1D8E4] rounded-[5px] bg-white">
                <div className="flex items-center gap-[14px]">
                    <img
                        src={avatarJpg}
                        className="w-[38px] h-[38px] h-11 w-11 rounded-full w-[38px] h-[38px]"
                        alt="avatar"
                    />
                    <div>
                        <span className='text-sm font-normal text-slate-400'>Название</span>
                        <p className="text-[13px] font-medium ">{item.name} (ID {item.id}) </p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <UserCheck width={16} height={16} />
                        <span className="text-sm font-normal text-slate-400">Подписчики:</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-[13px] font-medium">{item.subscriber}</span>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <Type width={16} height={16} />
                        <span className="text-sm font-normal text-slate-400">Тип:</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-[13px] font-medium">
                            {item.type === 'App' && 'Telegram app'}
                            {item.type === 'Bot' && 'Telegram bot'}
                            {item.type === 'channel' && 'Telegram channel'}
                        </span>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <User width={16} height={16} />
                        <span className="text-sm font-normal text-slate-400">Создатель:</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img
                            src={avatarJpg}
                            className="rounded-full w-4 h-4"
                            alt="avatar"
                        />
                        <span className="text-[13px] font-medium">{item.creator}</span>
                    </div>
                </div>

                <div className={`flex justify-evenly w-full justify-center items-center`}>
                    <IconButtonWithTooltip onClickButton={() => { }} icon={<Edit />} tooltip='Изменить' />
                    <IconButtonWithTooltip onClickButton={() => navigate('item/follower')} icon={<UserCheck />} tooltip='Подписчики' />
                    <IconButtonWithTooltip onClickButton={() => navigate('item/postback')} icon={<Gauge />} tooltip='Постбэки' />
                    {item.type === 'channel' && <IconButtonWithTooltip onClickButton={() => navigate('item/conversion')} icon={<Logs />} tooltip='Конверсии' />}
                    <IconButtonWithTooltip onClickButton={() => setOpenLink(true)} icon={<Eye />} tooltip='Сгенерировать ссылку для лендинга' />
                    <IconButtonWithTooltip onClickButton={() => OpenDeleteModal(item.id)} icon={<Trash />} tooltip='Удалить' variant="destructive" />
                </div>
            </div>

            <ModalGenLink open={openLink} setOpen={setOpenLink} />
            <ModalDelete open={openDelete} setOpen={setOpenDelete} id={deleteId} onDelete={onDeleteSpot} />
        </>
    )
}

export default ItemSpot