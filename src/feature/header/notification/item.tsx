import { NotificationStatus } from "@shared/types";
import {
    Info,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Calendar,
} from "lucide-react";

const statusIcons = {
    info: { icon: Info, color: "bg-blue-500" },
    success: { icon: CheckCircle2, color: "bg-green-500" },
    warning: { icon: AlertTriangle, color: "bg-yellow-500" },
    error: { icon: XCircle, color: "bg-red-500" },
};



interface NotificationItemProps {
    title: string;
    description: string;
    date: string;
    status: NotificationStatus;
}


export const NotificationItem: React.FC<NotificationItemProps> = ({ title, description, date, status }) => {
    const Icon = statusIcons[status]?.icon || Info;
    const color = statusIcons[status]?.color || "bg-gray-400";

    return (
        <div className="flex items-start gap-4 p-3 border rounded-md hover:bg-muted transition">
            <div className={`${color} w-6 h-6 rounded-md flex items-center justify-center text-white`}>
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-1 text-sm">
                <div className="font-medium text-[15px]">{title}</div>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <Calendar className="w-3 h-3" />
                    {date}
                </div>
                <div className="text-sm text-muted-foreground">{description}</div>
            </div>
        </div>
    );
};
