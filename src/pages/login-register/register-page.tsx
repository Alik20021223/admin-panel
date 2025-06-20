import RegisterContent from "@widgets/login-register/register-content"


const RegisterPage = () => {
    return (
        <>
            <div className="flex w-screen h-dvh overflow-hidden">
                <div className="h-full w-full flex items-center justify-center bg-slate-100">
                    <RegisterContent />
                </div>
            </div>
        </>
    )
}

export default RegisterPage