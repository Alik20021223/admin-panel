import { useState } from "react";
import BotSpotAppTab from "@entities/spots/ui/create-spot-app/bot";
import GeneralTab from "@entities/spots/ui/create-spot-app/general";
import PostBackTab from "@entities/spots/ui/create-spot-app/postback";
import { StepTabItem, StepTabs } from "@feature/step-tab";

const SpotsAppContent = () => {
    const [currentStep, setCurrentStep] = useState("general");
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);



    const steps: StepTabItem[] = [
        {
            value: "general",
            label: "Общее",
            content: ({ onNextStep }) => <GeneralTab onNextStep={onNextStep} />,
        },
        {
            value: "bot",
            label: "Бот",
            content: ({ onNextStep }) => <BotSpotAppTab onNextStep={onNextStep} />,
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
    );
};

export default SpotsAppContent;
