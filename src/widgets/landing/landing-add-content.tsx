import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcdn/tabs";
import { LANDINGS } from "@entities/landing/constant/url";
import DynamicBreadcrumbs from "@feature/dynamicBreadcrump";
import GeneralTab from "@entities/landing/ui/landing-add/default-add/general";
import AccessTab from "@entities/landing/ui/landing-add/default-add/access";
import { Label } from "@shadcdn/label";
import { Switch } from "@shadcdn/switch";
import { useState } from "react";
import ExpertTranslateTab from "@entities/landing/ui/landing-add/expert-add/translate";
import ExpertAccessTab from "@entities/landing/ui/landing-add/expert-add/access";
import ExpertGeneralTab from "@entities/landing/ui/landing-add/expert-add/general";
import ExpertDesignTab from "@entities/landing/ui/landing-add/expert-add/design";
import { stepsLandingExpAdd } from "@entities/landing/mock";

const PATH_MAP = {
    landings: LANDINGS,
};

const LandingAddContent = () => {
    const [isExpertVersion, setIsExpertVersion] = useState(false);
    const [currentStep, setCurrentStep] = useState("general");
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);

    const goToNextStep = () => {
        const currentIndex = stepsLandingExpAdd.findIndex(step => step.value === currentStep);
        if (currentIndex < stepsLandingExpAdd.length - 1) {
            const next = stepsLandingExpAdd[currentIndex + 1].value;

            setCompletedSteps(prev =>
                [...new Set([...prev, currentStep, next])] // 👈 добавляем и текущий, и следующий
            );

            setCurrentStep(next);
        }
    };


    return (
        <div className="space-y-3">
            <div className="flex justify-between">
                <DynamicBreadcrumbs pathMap={PATH_MAP} />
                <div className="flex items-center space-x-2">
                    <Label htmlFor="expert-version">Простая версия</Label>
                    <Switch
                        id="expert-version"
                        checked={isExpertVersion}
                        onCheckedChange={(checked) => setIsExpertVersion(checked)}
                    />
                    <Label htmlFor="expert-version">Экспертная версия</Label>
                </div>
            </div>

            {isExpertVersion ? (
                <div className="px-2 py-3 bg-white rounded-lg">
                    <Tabs
                        value={currentStep}
                        onValueChange={(val) => {
                            const currentIndex = stepsLandingExpAdd.findIndex(step => step.value === currentStep);
                            const nextIndex = stepsLandingExpAdd.findIndex(step => step.value === val);
                            if (nextIndex <= currentIndex || completedSteps.includes(val)) {
                                setCurrentStep(val);
                            }
                        }}
                        className="w-full"
                    >
                        <TabsList className="w-full">
                            {stepsLandingExpAdd.map((step) => {
                                const stepIndex = stepsLandingExpAdd.findIndex(s => s.value === step.value);
                                const currentIndex = stepsLandingExpAdd.findIndex(s => s.value === currentStep);
                                const isLocked = stepIndex > currentIndex && !completedSteps.includes(step.value);
                                return (
                                    <TabsTrigger
                                        key={step.value}
                                        value={step.value}
                                        disabled={isLocked}
                                    >
                                        {step.label}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>

                        <TabsContent
                            forceMount
                            value="general"
                            className={`mt-5 ${currentStep !== "general" ? "hidden" : ""}`}
                        >
                            <ExpertGeneralTab onNextStep={goToNextStep} />
                        </TabsContent>

                        <TabsContent
                            forceMount
                            value="design"
                            className={`mt-5 ${currentStep !== "design" ? "hidden" : ""}`}
                        >
                            <ExpertDesignTab onNextStep={goToNextStep} />
                        </TabsContent>
                        <TabsContent
                            forceMount
                            className={`mt-5 ${currentStep !== "translate" ? "hidden" : ""}`}
                            value="translate"
                        >
                            <ExpertTranslateTab onNextStep={goToNextStep} />
                        </TabsContent>
                        <TabsContent
                            forceMount
                            className={`mt-5 ${currentStep !== "access" ? "hidden" : ""}`}
                            value="access"
                        >
                            <ExpertAccessTab />
                        </TabsContent>
                    </Tabs>
                </div>
            ) : (
                <div className="px-2 py-3 bg-white rounded-lg">
                    <Tabs defaultValue="general" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="general">Общее</TabsTrigger>
                            <TabsTrigger value="access">Доступ</TabsTrigger>
                        </TabsList>
                        <TabsContent className="mt-5" value="general">
                            <GeneralTab />
                        </TabsContent>
                        <TabsContent className="mt-5" value="access">
                            <AccessTab />
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </div>
    );
};

export default LandingAddContent;
