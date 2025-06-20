import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@shadcdn/form"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { registerType } from "@entities/login-register/types"
import { registerSchema } from "./validation"
import { Input } from "@shared/shadcdn/input"
import { Button } from "@shared/shadcdn/button"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"


const Register = () => {

    const [show, setShow] = useState<boolean>(false)
    const form = useForm<registerType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })



    const onSubmit = (data: registerType) => {
        console.log("Submitted:", data)
    }

    return (
        <>
            <div className="w-full max-w-sm mx-auto space-y-4">
                <h1 className="text-2xl font-semibold text-center">Регистрация</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Имя..." type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="you@example.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Пароль"
                                            show={show}
                                            {...field}
                                            setShow={setShow}
                                            toggleVisibilityIcon={show ? <EyeOff size={18} /> : <Eye size={18} />}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-sm">Уже есть аккаунт?
                            <Link to='/register' className="font-bold ml-2">Войти</Link>
                        </p>
                        <Button type="submit" className="w-full">
                            Зарегистрироваться
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default Register