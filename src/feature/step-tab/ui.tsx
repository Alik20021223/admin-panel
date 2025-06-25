import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcdn/tabs";

export interface StepTabItem {
    value: string;
    label: string;
    content: React.ReactNode | ((args: { onNextStep: () => void }) => React.ReactNode);
}

interface StepTabsProps {
    steps: StepTabItem[];
    currentStep: string;
    completedSteps: string[];
    onStepChange: (step: string) => void;
    onCompleteStep: (step: string) => void;
    isLockedBack?: boolean;
    onFinish?: () => void;
    disableStepLock?: boolean;
}

export const StepTabs = ({
    steps,
    currentStep,
    completedSteps,
    onStepChange,
    onCompleteStep,
    isLockedBack = true,
    onFinish,
    disableStepLock
}: StepTabsProps) => {
    const goToNextStep = () => {
        const currentIndex = steps.findIndex(s => s.value === currentStep);
        if (currentIndex < steps.length - 1) {
            const next = steps[currentIndex + 1].value;
            onCompleteStep(currentStep);
            onCompleteStep(next);
            onStepChange(next);
        } else {
            onFinish?.();
        }
    };

    return (
        <Tabs
            value={currentStep}
            onValueChange={(val) => {
                if (disableStepLock) {
                    onStepChange(val);
                    return;
                }

                const currentIndex = steps.findIndex(s => s.value === currentStep);
                const nextIndex = steps.findIndex(s => s.value === val);
                const canGo =
                    (!isLockedBack || nextIndex >= currentIndex) &&
                    completedSteps.includes(val);

                if (canGo) onStepChange(val);
            }}
            className="w-full"
        >
            <TabsList className="w-full">
                {steps.map((step) => {
                    const stepIndex = steps.findIndex(s => s.value === step.value);
                    const currentIndex = steps.findIndex(s => s.value === currentStep);

                    const isLocked = !disableStepLock && (
                        (isLockedBack && stepIndex < currentIndex) ||
                        (stepIndex > currentIndex && !completedSteps.includes(step.value))
                    );

                    return (
                        <TabsTrigger key={step.value} value={step.value} disabled={isLocked}>
                            {step.label}
                        </TabsTrigger>
                    );
                })}
            </TabsList>


            {steps.map((step) => (
                <TabsContent className="mt-5" key={step.value} value={step.value}>
                    {typeof step.content === "function"
                        ? step.content({ onNextStep: goToNextStep })
                        : step.content}
                </TabsContent>
            ))}
        </Tabs>
    );
};
