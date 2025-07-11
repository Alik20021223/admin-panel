import { LANDINGS } from "@entities/landing/constant/url";
import DynamicBreadcrumbs from "@feature/dynamicBreadcrump";
import GeneralTab from "@entities/landing/ui/landing-add/default-add/general";
import { Label } from "@shadcdn/label";
import { Switch } from "@shadcdn/switch";
import { useEffect, useState } from "react";
import ExpertTranslateTab from "@entities/landing/ui/landing-add/expert-add/translate";
import ExpertGeneralTab from "@entities/landing/ui/landing-add/expert-add/general";
import ExpertDesignTab from "@entities/landing/ui/landing-add/expert-add/design";
import { StepTabItem, StepTabs } from "@feature/step-tab";
import { useQueryInfoAddForm } from "@entities/landing/hooks/get-info-add-form";
import { useLandingStore } from "@entities/landing/store";
import { useGetInfoLanding } from "@entities/landing/hooks/get-landing-by-id";
import { useSearchParams } from "react-router-dom";

const PATH_MAP = {
    landings: LANDINGS,
};

const LandingAddContent = () => {
    const [isExpertVersion, setIsExpertVersion] = useState(false);
    const [currentStep, setCurrentStep] = useState("general");
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);

    const [searchParams] = useSearchParams();
    const edit = searchParams.get("edit");

    const { data: editData } = useGetInfoLanding(edit || "")

    const {
        setInfoData,
        // editLanding,
        setEditData,
        // setEditLanding
    } = useLandingStore();

    useEffect(() => {
        if (editData) {
            setEditData(editData);
        }
    }, [editData]); // и лучше зависимость именно от editData


    const { refetch: refetchInfoForm } = useQueryInfoAddForm({
        enabled: false,
    });

    useEffect(() => {
        refetchInfoForm().then((result) => {
            if (result.data) {
                setInfoData(result.data);
            }
        });
    }, []);

    const steps: StepTabItem[] = isExpertVersion
        ? [
            {
                value: "general",
                label: "Общее",
                content: ({ onNextStep }) => <ExpertGeneralTab id={edit || ""} onNextStep={onNextStep} />,
            },
            {
                value: "design",
                label: "Дизайн",
                content: ({ onNextStep }) => <ExpertDesignTab id={edit || ""} onNextStep={onNextStep} />,
            },
            {
                value: "translate",
                label: "Переводы",
                content: ({ onNextStep }) => <ExpertTranslateTab id={edit || ""} onNextStep={onNextStep} />,
            },
        ]
        : [
            {
                value: "general",
                label: "Общее",
                content: () => {
                    return (
                        <GeneralTab id={edit || ""} />
                    );
                },
            },
        ];

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

            <div className="px-3 py-4 bg-white rounded-lg">
                <StepTabs
                    steps={steps}
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                    onStepChange={setCurrentStep}
                    onCompleteStep={(step: string) =>
                        setCompletedSteps((prev) => [...new Set([...prev, step])])
                    }
                    disableStepLock={!!edit}
                />
            </div>

        </div>
    );
};

export default LandingAddContent;
