import { useSharedStore } from "@shared/store"
import Header from "@feature/header"
import SidebarCustom from "@feature/sidebar"
import { SidebarProvider } from "@shadcdn/sidebar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {

    const { open, setOpen } = useSharedStore()

    return (
        <>
            <div className="w-full h-full bg-slate-100">


                <SidebarProvider open={open} onOpenChange={setOpen}>

                    <SidebarCustom />
                    <main style={{ width: `calc(100vw - ${open ? "16rem" : "3rem"})` }} >
                        <Header />
                        <Outlet />
                    </main>
                </SidebarProvider>
            </div>
        </>
    )
}

export default MainLayout