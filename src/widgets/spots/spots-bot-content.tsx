import PostBackTab from "@entities/spots/ui/create-spot-bot/postback";
import BotSpotTab from "@entities/spots/ui/create-spot-bot/bot";
import GeneralBotTab from "@entities/spots/ui/create-spot-bot/general";
import { useState } from "react";
import { StepTabItem, StepTabs } from "@feature/step-tab";

const SpotsBotContent = () => {
    const [currentStep, setCurrentStep] = useState("general");
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);



    const steps: StepTabItem[] = [
        {
            value: "general",
            label: "Общее",
            content: ({ onNextStep }) => <GeneralBotTab onNextStep={onNextStep} />,
        },
        {
            value: "bot",
            label: "Бот",
            content: ({ onNextStep }) => <BotSpotTab onNextStep={onNextStep} />,
        },
        {
            value: "postback",
            label: "Постбэки",
            content: () => (
                <>
                    <PostBackTab />
                </>
            ),
        },
    ];

    return (
        <>
            <div className="px-2 py-3 bg-white rounded-lg">

                <StepTabs
                    steps={steps}
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                    onStepChange={setCurrentStep}
                    onCompleteStep={(step: string) =>
                        setCompletedSteps((prev) => [...new Set([...prev, step])])
                    }
                    disableStepLock={false} // можно сделать true если нужно разрешить свободный переход
                />

            </div>
        </>
    )
}

export default SpotsBotContent