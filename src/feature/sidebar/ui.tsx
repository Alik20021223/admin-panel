"use client"

import { mockSideBarItems } from "@shared/mock"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@shadcdn/sidebar"
// import { Signal } from "lucide-react"
import { NavUser } from "./nav-user"
import { useQueryInfoUser } from "@shared/hooks/get-info-person"
import { useSharedStore } from "@shared/store"
import { useEffect } from "react"
import RoleAccess from "@feature/RoleControl"


const SidebarCustom = (props: React.ComponentProps<typeof Sidebar>) => {

    const { data: userData } = useQueryInfoUser()
    const { setUser } = useSharedStore()

    useEffect(() => {
        if (userData) {
            setUser(userData)
        }
    }, [userData])

    return (
        <Sidebar collapsible="icon" {...props}>
            {/* <SidebarTrigger /> */}
            <SidebarHeader>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <SidebarTrigger />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mockSideBarItems.map((item) => (
                                <RoleAccess key={item.title} allowedRoles={item.roles}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild tooltip={item.title} className="bg-slate-200">
                                            <a href={item.url} className="flex items-center gap-2">
                                                <item.icon className="h-4 w-4" />
                                                <span className="whitespace-nowrap">{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </RoleAccess>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>

        </Sidebar>
    )
}

export default SidebarCustom
