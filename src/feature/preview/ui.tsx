import React, { useEffect, useState } from "react";
import { Button } from "@shadcdn/button";
import { ButtonBotType } from "@shared/types";

interface PreviewContentProps {
    text: string;
    buttonArray: ButtonBotType[];
}

const PreviewContent: React.FC<PreviewContentProps> = ({ text, buttonArray }) => {
    const [createdAt, setCreatedAt] = useState<Date | null>(null);

    useEffect(() => {
        if (text && !createdAt) {
            setCreatedAt(new Date());
        }
    }, [text, createdAt]);




    return (
        <div className="relative w-full message-preview p-8 bg-blue-100 col-span-2 rounded-md bg-[url('@assets/preview.jpg')] ">
            <div className="max-w-[350px] w-full">
                {text && (
                    <div className="w-full text py-2 px-3 relative bg-white rounded-[16px] rounded-bl-[4px] mt-3">
                        <span className="block w-full text-dark-100 font-normal break-all whitespace-break-spaces" dangerouslySetInnerHTML={{ __html: text }} />
                        {createdAt && (
                            <span className="block text-sm text-slate-400 text-right -mt-1">
                                {createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        )}
                    </div>
                )}
                {buttonArray.length > 0 && (
                    <div
                        className={`w-full buttons grid gap-1 mt-1 max-h-[240px] overflow-hidden grid-cols-${Math.min(buttonArray.length, 3)
                            }`}
                    >
                        {buttonArray.map((item) => (
                            <Button
                                key={item.id}
                                className="w-full h-[40px] rounded-[8px] px-2 bg-white text-center text-black font-semibold truncate"
                            >
                                {item.name}
                            </Button>
                        ))}
                    </div>
                )}
            </div>


        </div>
    );
};

export default PreviewContent;
