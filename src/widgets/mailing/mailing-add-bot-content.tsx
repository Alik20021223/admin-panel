import AddMailing from "@entities/mailings/ui/add-mailing"
import DynamicBreadcrumbs from "@feature/dynamicBreadcrump"
import { MAILINGS } from "@entities/mailings/constant/url";

const PATH_MAP = {
    mailings: MAILINGS,
};

const MailingAddBotContent = () => {
    return (
        <>
            <div className="space-y-3">
                <DynamicBreadcrumbs pathMap={PATH_MAP} />

                <AddMailing />
            </div>
        </>
    )
}

export default MailingAddBotContent