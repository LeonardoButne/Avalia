import React from "react";
import { Route, Routes } from "react-router-dom";
import PageLoader from "../Components/PageLoader/PageLoader";

const PaginaPrincipal = React.lazy(() => import("../Pages/PaginaPrincipal"));

const RoutesComponent = () => {
    return (
        <>
            <React.Suspense fallback = {<PageLoader/>}>
                <Routes>
                    <Route path="/" element={<PaginaPrincipal/>}/>
                </Routes>
            </React.Suspense>
        </>
    )
}

export default RoutesComponent;