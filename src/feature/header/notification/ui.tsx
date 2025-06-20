import { Bell } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@shadcdn/dropdown-menu"
import { Button } from "@shadcdn/button"
import { notifications } from "@shared/mock"
import { NotificationItem } from "./item"


const NotificationDropDown = () => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex justify-end gap-2 items-center">
                        <Bell className="w-5 h-5" />
                        <span className="w-4 h-4 bg-indigo-500 rounded-full text-xs flex justify-center">5</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="text-base">
                        Уведомление
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="gap-2 flex-col flex overflow-y-auto max-h-[300px] custom-scroll">
                        {notifications.map((n) => (
                            <NotificationItem key={n.id} title={n.title} description={n.description} date={n.date} status={n.status} />
                        ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Button variant="destructive" className="w-full">
                            Очистить
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default NotificationDropDown