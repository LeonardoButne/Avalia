// RoutesComponent.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import PageLoader from "../Components/PageLoader/PageLoader";
import PaginaLogin from "../Pages/PaginaLogin";
import Spinner from "../Components/PageLoader/Spinner";
import Navbar from "../Layout/Navbar/Navbar";
import Footer from "../Layout/Footer/Footer";
import CadastroTipo from "../Pages/TipoCadastro/TipoCadastro";

const PaginaPrincipal = React.lazy(() => import("../Pages/PaginaPrincipal"));
const PerfilEcommerce = React.lazy(() => import("../Pages/PerfilEcommerce"))

const RoutesComponent = () => {
    return (
        <>
            <React.Suspense fallback={<Spinner />}>
            <Navbar />
                <Routes>
                    <Route path="/" element={<PaginaPrincipal />} />
                    <Route path="/perfil/:ecommerce_name" element={<PerfilEcommerce />} />
                    <Route path="/login" element={<PaginaLogin />} />
                    <Route path="/cadastro_tipo" element={<CadastroTipo />} />
                </Routes>
            <Footer />
            </React.Suspense>
        </>
    );
};

export default RoutesComponent;
