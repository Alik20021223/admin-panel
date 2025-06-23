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
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useMutationPostRegister } from "@entities/login-register/hooks/use-mutation-register"


const Register = () => {

    const [show, setShow] = useState<boolean>(false)
    const form = useForm<registerType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            repeatPassword: '',
            email: "",
            password: "",
        },
    })

    const password = form.watch('password')

    const { mutateAsync } = useMutationPostRegister()
    const navigate = useNavigate()



    const onSubmit = async (data: registerType) => {
        try {
            await mutateAsync({
                email: data.email,
                password: data.password
            })

            navigate("/login")

        } catch (error) {
            console.error("Ошибка регистрации:", error)
            form.setError("password", {
                message: "Неверный email или пароль",
            })
        }
    }



    return (
        <>
            <div className="w-full max-w-sm mx-auto space-y-4">
                <h1 className="text-2xl font-semibold text-center">Регистрация</h1>
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
                        <FormField
                            control={form.control}
                            name="repeatPassword"
                            render={({ field }) => {
                                const error =
                                    form.getValues("repeatPassword") &&
                                        form.getValues("repeatPassword") !== password
                                        ? "Пароли не совпадают"
                                        : null;

                                return (
                                    <FormItem>
                                        <FormLabel>Повторите пароль</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Повторите пароль"
                                                show={show}
                                                {...field}
                                                setShow={setShow}
                                                toggleVisibilityIcon={show ? <EyeOff size={18} /> : <Eye size={18} />}
                                            />
                                        </FormControl>
                                        <FormMessage>{error}</FormMessage>
                                    </FormItem>
                                );
                            }}
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