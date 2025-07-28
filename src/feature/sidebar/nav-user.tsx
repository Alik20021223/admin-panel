"use client"

import {
    ChevronsUpDown,
    CircleUser,
    LogOut,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@shadcdn/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@shadcdn/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@shadcdn/sidebar"
import { useMutationLogOut } from "@entities/login-register/hooks/use-mutation-logout"
import { useNavigate } from "react-router-dom"
import { updateAuth } from "@shared/utils"
import img from "@assets/shadcn-user.jpg";
import { UserInfo } from "@shared/types"


export function NavUser({
    user,
}: {
    user?: UserInfo
}) {
    const { isMobile } = useSidebar()

    const { mutateAsync } = useMutationLogOut()

    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await mutateAsync()

            updateAuth(false)
            navigate("/login")

        } catch (error) {
            console.error("Ошибка логина:", error)
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={img} alt="avatar" />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            {user &&
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.first_name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            }
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={img} alt="avatar" />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                {user &&
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user.first_name}</span>
                                        <span className="truncate text-xs">{user.email}</span>
                                    </div>
                                }
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {user &&
                                <DropdownMenuItem>
                                    <CircleUser />
                                    {user.role}
                                </DropdownMenuItem>
                            }
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogOut}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
