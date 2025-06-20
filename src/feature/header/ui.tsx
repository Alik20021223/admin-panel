import { useLocation } from "react-router-dom";
import { mockSideBarItems } from "@shared/mock"; // замени путь на актуальный
import { Input } from "@shadcdn/input";
import NotificationDropDown from "./notification/ui";
import { Search } from "lucide-react";

const Header = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const currentItem = mockSideBarItems.find((item) =>
        pathname.startsWith(item.url)
    );

    return (
        <header className="h-[60px] w-full grid grid-cols-[auto_500px_auto] gap-4 items-center py-2 px-4 bg-slate-300 text-white rounded-t-lg">
            <div className="flex items-center gap-[15px] min-w-[220px] justify-start text-black">
                {currentItem && (
                    <>
                        <currentItem.icon className="w-6 h-6" />
                        <span className="font-semibold">{currentItem.title}</span>
                    </>
                )}
            </div>
            <div>
                <Input placeholder="Введите" leftIcon={<Search />} />
            </div>
            <NotificationDropDown />
        </header>
    );
};

export default Header;
