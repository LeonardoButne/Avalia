import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TipoCadastro.css';

const CadastroTipo: React.FC = () => {
    const navigate = useNavigate();

    const abrirCadastroConsumidor = () => {
        navigate("/cadastro-consumidor"); // Redireciona para a página de cadastro de consumidor
    };

    const abrirCadastroEcommerce = () => {
        navigate("/cadastro-ecommerce"); // Redireciona para a página de cadastro de e-commerce
    };

    return (
        <div>
            <center>
                <p className="titulo-1"><strong>Olá, crie uma conta no Feedback AQUI</strong></p>
                <p className="titulo-2">Navegue e ajude outros consumidores.</p>
                <p className="titulo-3">Após o login, conseguimos oferecer um serviço melhor e mais personalizado.</p>
            </center>

            <div className="cards">
                <div className="container_user">
                    <div className="container_user_img">
                        <img src="user-interface.png" alt="Ícone do consumidor" />
                    </div>
                    <div className="container_user_title">
                        <h1>Cadastrar-me como consumidor</h1>
                    </div>
                    <div className="container_user_btn">
                        <button className="btn_cadastrar_user" onClick={abrirCadastroConsumidor}>
                            <span>Registrar-se</span>
                        </button>
                    </div>
                </div>

                <div className="container_ecommerce">
                    <div className="container_ecommerce_img">
                        <img src="e-commerce.png" alt="Ícone do e-commerce" />
                    </div>
                    <div className="container_ecommerce_title">
                        <h1>Cadastrar-me como e-commerce</h1>
                    </div>
                    <div className="container_ecommerce_btn">
                        <button className="btn_cadastrar_ecommerce" onClick={abrirCadastroEcommerce}>
                            <span>Registrar-se</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastroTipo;
