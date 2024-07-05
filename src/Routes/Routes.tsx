// RoutesComponent.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import PageLoader from "../Components/PageLoader/PageLoader";
import PaginaLogin from "../Pages/PaginaLogin";

const PaginaPrincipal = React.lazy(() => import("../Pages/PaginaPrincipal"));
const PerfilEcommerce = React.lazy(() => import("../Pages/PerfilEcommerce"))

const RoutesComponent = () => {
    return (
        <>
            <React.Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<PaginaPrincipal />} />
                    <Route path="/perfil/:ecommerce_name" element={<PerfilEcommerce />} />
                    <Route path="/login" element={<PaginaLogin />} />
                </Routes>
            </React.Suspense>
        </>
    );
};

export default RoutesComponent;
