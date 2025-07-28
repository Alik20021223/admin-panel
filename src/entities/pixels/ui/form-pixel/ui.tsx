import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Form } from "@shadcdn/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PixelFormSchema, CreateFormType } from "./validation"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@shadcdn/dialog"
import AddPixel from "@feature/add-pixel"
import { useCreatePixels } from "@entities/pixels/hooks/create-pixels"
import { usePixelsTableStore } from "@entities/pixels/store"
import { useUpdatePixel } from "@entities/pixels/hooks/update-pixels-list"
import { useEffect } from "react"
// import { z } from "zod"


interface AddPixelProps {
    open: boolean,
    setOpen: (value: boolean) => void;
    editId?: string;
}


const AddPixelModal: React.FC<AddPixelProps> = ({ open, setOpen, editId = "" }) => {
    const { mutateAsync: createAsync } = useCreatePixels()
    const { mutateAsync: UpdateAsync } = useUpdatePixel()
    const { pixels } = usePixelsTableStore()

    const form = useForm<CreateFormType>({
        resolver: zodResolver(PixelFormSchema),
        defaultValues: {
            pixels: []
        }
    });

    // 1. При монтировании, если editId задан — заполняем форму
    useEffect(() => {
        if (editId) {
            const existing = pixels.find((p) => String(p.id) === editId)
            if (existing) {
                form.setValue("pixels", [{
                    namePixel: existing.name,
                    enterPixel: String(existing.pixel_id),
                    apiKey: existing.access_token,
                }])
            }
        }
    }, [editId, pixels, form])

    const onSubmitForm = async (data: CreateFormType) => {

        const formattedData = {
            pixels: data.pixels.map((pixel) => ({
                name: pixel.namePixel,
                pixel_id: Number(pixel.enterPixel),
                access_token: pixel.apiKey,
            })),
        };

        const updatedPixel = {
            name: data.pixels[0].namePixel,
            pixel_id: Number(data.pixels[0].enterPixel),
            access_token: data.pixels[0].apiKey,
        }

        if (editId) {
            const updatedPixels = pixels.map((p) => {
                if (String(p.id) === editId) {
                    return updatedPixel
                }

                // Преобразуем каждый старый пиксель в pixelItem
                return {
                    name: p.name,
                    pixel_id: Number(p.pixel_id), // преобразуем string → number
                    access_token: p.access_token,
                }
            })

            await UpdateAsync({ pixels: updatedPixels })
        } else {
            await createAsync(formattedData)
        }

        setOpen(false)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editId ? "Редактировать пиксель" : "Добавить пиксель"}</DialogTitle>
                    <div className="px-3 py-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
                                <AddPixel name="pixels" edit={!!editId || false} />

                                <div className="col-span-3">
                                    <Button
                                        type="submit"
                                        disabled={!form.formState.isValid}
                                        className="space-x-2 w-full"
                                    >
                                        <Plus className="w-4 h-4" />
                                        {editId ? "Сохранить изменения" : "Добавить пиксель"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddPixelModal
