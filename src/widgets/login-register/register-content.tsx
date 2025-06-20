import Register from '@entities/login-register/ui/register'


const RegisterContent = () => {
    return (
        <>
            <div className="max-h-[95vh] w-[450px] overflow-y-auto md:max-h-[80vh] z-1 md:absolute md:left-1/2 md:-translate-x-1/2 shrink-0 flex flex-col justify-center bg-white rounded-lg p-4 h-fit">
                <Register />
            </div>
        </>
    )
}

export default RegisterContent