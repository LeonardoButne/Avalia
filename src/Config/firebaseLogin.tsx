import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



const firebaseConfig = {
    apiKey: "AIzaSyA5W3WDwlAgF8Qn5ptmZ4V4JvVaHQ5KBEk",
    authDomain: "feedback-aqui.firebaseapp.com",
    databaseURL: "https://feedback-aqui-default-rtdb.firebaseio.com",
    projectId: "feedback-aqui",
    storageBucket: "feedback-aqui.appspot.com",
    messagingSenderId: "390730068105",
    appId: "1:390730068105:web:4f9c564b63192d6ddc5658",
    measurementId: "G-4V5LL17MRE"
};

// Inicialize o Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const feedbackAquiDB2 = firebase.database().ref("feedbackAqui");

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            $("#progress-bar-container").show();

            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            const userId = response.user?.uid;

            if (userId) {
                const snapshot = await feedbackAquiDB2.child("consumidores").child(userId).once("value");
                const userData = snapshot.val();

                if (userData && userData.isAdmin) {
                    // Redirecionar para o painel de administração se for um administrador
                    window.location.href = 'admin/PainelAdmin.html';
                } else if (userData && userData.isSuspended) {
                    alert("Essa conta está suspensa! Tente outra.");
                } else {
                    // Redirecionar para a tela principal
                    window.location.href = "TelaPrincipal.html";
                }
            } else {
                console.log("Usuário não encontrado");
            }

            $("#progress-bar").css("width", "100%");
            setTimeout(() => {
                $("#progress-bar-container").hide();
            }, 500);
        } catch (error) {
            console.error("Erro no login:", error);
            $("#progress-bar-container").hide();
        }
    };

    return (
        <div className="container">
            <div id="progress-bar-container">
                <div id="progress-bar"></div>
            </div>
            <h1 className="label">Login como consumidor</h1>
            <form className="login_form" id="login_form" name="form">
                <div className="font">Email</div>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                <div id="email_error">Verifique o seu email!</div>
                <div className="font font2">Senha</div>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div id="password_error">A senha deve conter pelo menos 6 caracteres!</div>
                <button type="button" onClick={handleLogin}>Login</button>
                <button type="button" id="btn-cadastrar" onClick={() => window.location.href = "TipoCadastro.html"}>Cadastre-se</button>
            </form>
        </div>
    );
};

export default Login;
