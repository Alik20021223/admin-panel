import { SPOTS } from "@entities/spots/constant/url";
import DynamicBreadcrumbs from "@feature/dynamicBreadcrump"
import { Outlet } from "react-router-dom";


const PATH_MAP = {
    spots: SPOTS,
};


const SpotsAddPage = () => {
    return (
        <>
            <section className="py-4 px-6 space-y-5">
                <DynamicBreadcrumbs pathMap={PATH_MAP} />

                <Outlet />
            </section>
        </>
    )
}

export default SpotsAddPage