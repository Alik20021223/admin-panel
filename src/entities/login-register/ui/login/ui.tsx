import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@shadcdn/button"
import { Input } from "@shadcdn/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@shadcdn/form"
import { useState } from "react"
import { Link } from "react-router-dom"
import { loginSchema } from "./validation"
import { loginType } from "@entities/login-register/types"




export default function Login() {
    const [show, setShow] = useState<boolean>(false)
    const form = useForm<loginType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })



    const onSubmit = (data: loginType) => {
        console.log("Submitted:", data)
    }

    return (
        <div className="w-full max-w-sm mx-auto space-y-4">
            <h1 className="text-2xl font-semibold text-center">Авторизация</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                    <p className="text-sm">Нет аккаунта?
                        <Link to='/register' className="font-bold ml-2">Зарегистрироваться</Link>
                    </p>

                    <Button type="submit" className="w-full">
                        Войти
                    </Button>
                </form>
            </Form>
        </div>
    )
}
