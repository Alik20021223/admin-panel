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

const PATH_MAP = {
    landings: LANDINGS,
};


const LandingAddContent = () => {

    const [isExpertVersion, setIsExpertVersion] = useState(false);

    return (
        <>
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


                {isExpertVersion
                    ?
                    <div className="px-2 py-3 bg-white rounded-lg">
                        <Tabs defaultValue="general" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="general">Общее</TabsTrigger>
                                <TabsTrigger value="design">Дизайн</TabsTrigger>
                                <TabsTrigger value="translate">Перевод</TabsTrigger>
                                <TabsTrigger value="access">Доступ</TabsTrigger>
                            </TabsList>
                            <TabsContent className="mt-5" value="translate">
                                <ExpertTranslateTab />
                            </TabsContent>
                            <TabsContent className="mt-5" value="general">
                                <ExpertGeneralTab />
                            </TabsContent>
                            <TabsContent className="mt-5" value="design">
                                <ExpertDesignTab />
                            </TabsContent>
                            <TabsContent className="mt-5" value="access">
                                <ExpertAccessTab />
                            </TabsContent>
                        </Tabs>
                    </div>
                    :
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
                }
            </div>
        </>
    )
}

export default LandingAddContent