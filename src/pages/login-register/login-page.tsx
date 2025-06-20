import LoginContent from "@widgets/login-register/login-content"


const LoginPage = () => {
    return (
        <>
            <div className="flex w-screen h-dvh overflow-hidden">
                <div className="h-full w-full flex items-center justify-center bg-slate-100">
                    <LoginContent />
                </div>
            </div>
        </>
    )
}

export default LoginPage