import React, { useState } from 'react';
import Login from '../../Config/firebaseLogin';
import './StylePaginaLogin.css'


const LoginConsumidor: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin = () => {
        if (email && password.length >= 6) {
            // Chamada para a função de login do Firebase
            Login(email, password).then(() => {
                    // Lógica após o login bem-sucedido (redirecionamento, etc.)
                    console.log('Login realizado com sucesso!');
                })
                .catch((error) => {
                    console.error('Erro ao fazer login:', error.message);
                    // Lógica para exibir mensagens de erro específicas
                });
        } else {
            // Lógica para exibir mensagens de erro de validação
            if (!email) setEmailError(true);
            if (password.length < 6) setPasswordError(true);
        }
    };

    const abrirCadastros = () => {
        window.location.href = "TipoCadastro.html"; // Redirecionamento para página de cadastro
    };

    return (
        <div className="container">
            <h1 className="label">Bem-vindo de volta</h1>
            <form className="login_form" id="login_form">
                <div className="font">Email</div>
                <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div id="email_error">Verifique o seu email!</div>}
                <div className="font font2">Senha</div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div id="password_error">A senha deve conter pelo menos 6 caracteres!</div>}
                <button type="button" onClick={handleLogin}>Login</button>
                <button type="button" onClick={abrirCadastros}>Cadastre-se</button>
            </form>
        </div>
    );
};

export default LoginConsumidor;
