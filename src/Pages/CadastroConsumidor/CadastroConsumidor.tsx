import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Importe o módulo de autenticação
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CadastroConsumidor.css';

const firebaseConfig = {
    // Configuração do Firebase
    apiKey: "Sua apiKey",
    authDomain: "feedback-aqui.firebaseapp.com",
    databaseURL: "https://feedback-aqui-default-rtdb.firebaseio.com",
    projectId: "feedback-aqui",
    storageBucket: "feedback-aqui.appspot.com",
    messagingSenderId: "390730068105",
    appId: "1:390730068105:web:4f9c564b63192d6ddc5658",
    measurementId: "G-4V5LL17MRE"
};

// Inicialize o Firebase se ainda não estiver inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const provinces = [
    "Maputo",
    "Gaza",
    "Inhambane",
    "Sofala",
    "Manica",
    "Tete",
    "Zambezia",
    "Nampula",
    "Cabo Delgado",
    "Niassa"
];

const cities: { [key: string]: string[] } = {
    "Maputo": ["Maputo City", "Matola"],
    "Gaza": ["Chókwè", "Xai-Xai"],
    "Inhambane": ["Inhambane City", "Maxixe"],
    "Sofala": ["Beira"],
    "Manica": ["Chimoio"],
    "Tete": ["Tete City"],
    "Zambezia": ["Quelimane"],
    "Nampula": ["Nampula City", "Nacala"],
    "Cabo Delgado": ["Pemba"],
    "Niassa": ["Lichinga"]
};

const CadastroConsumidor: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [biNumber, setBiNumber] = useState('');
    const [birthdate, setBirthdate] = useState<Date | null>(null);
    const [gender, setGender] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCadastroSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            // Criação do usuário no Firebase Authentication
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

            // Obtém o UID do usuário recém-criado
            const userId = userCredential.user?.uid;

            if (userId) {
                // Salva dados adicionais no Realtime Database
                await firebase.database().ref('feedbackAqui').child("consumidores").child(userId).set({
                    isAdmin: false,
                    isRemoved: false,
                    isSuspended: false,
                    nome: fullName,
                    bi: biNumber,
                    dataNascimento: birthdate ? birthdate.toISOString() : null,
                    genero: gender,
                    provincia: province,
                    cidade: city,
                    email: email,
                    celular: phone,
                    senha: password
                    // Outros dados que você deseje associar
                });
            }

            // Limpa os campos após o cadastro
            setFullName('');
            setBiNumber('');
            setBirthdate(null);
            setGender('');
            setProvince('');
            setCity('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');

            alert("Usuário cadastrado com sucesso!");
            
            // Redireciona ou faz qualquer ação necessária após o cadastro
            // Exemplo: window.location.href = "TelaLogin.html";
        } catch (error) {
        
            alert("Erro ao cadastrar usuário. Verifique o console para mais detalhes.");
        }
    };

    return (
        <div className="container">
            <h1 className="label">Cadastro</h1>
            <form className="login_form" id="cadastroForm" onSubmit={handleCadastroSubmit} name="form">
                <div className="font">Dados pessoais</div>
                <div className="font font2">Nome e sobrenome (Conforme escrito no seu BI)</div>
                <input
                    type="text"
                    id="name"
                    name="full_name"
                    autoComplete="off"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <div className="font">NO. do BI</div>
                <input
                    type="text"
                    id="binumber"
                    name="bi_number"
                    autoComplete="off"
                    maxLength={13}
                    value={biNumber}
                    onChange={(e) => setBiNumber(e.target.value)}
                />
                <div className="font">Data de Nascimento</div>
                <DatePicker
                    selected={birthdate}
                    onChange={(date: Date | null) => setBirthdate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/aaaa"
                    className="input-datepicker"
                />
                <div className="font">Gênero</div>
                <select
                    name="gender"
                    id="genero"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Selecione o gênero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                </select>
                <div className="font">Provincia</div>
                <select
                    name="province"
                    id="provinceSelect"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                >
                    <option value="">-Selecione a provincia-</option>
                    {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                    ))}
                </select>
                <div className="font">Cidade</div>
                <select
                    name="city"
                    id="citySelect"
                    disabled={!province}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                    <option value="">Selecione a provincia primeiro</option>
                    {province && cities[province]?.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <div className="font">Dados de acesso</div>
                <div className="font font2">Email</div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="font">Celular</div>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="_ _ _ _ _ _ _ _ _"
                    autoComplete="off"
                    maxLength={9}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <div className="font">Crie uma senha</div>
                <input
                    type="password"
                    id="senha"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="font">Nível de segurança</div>
                <div className="password_requirements">
                    Sua senha deve ter:<br />
                    - 8 ou mais caracteres<br />
                    - Letras maiúsculas e minúsculas<br />
                    - Pelo menos um número<br />
                    - Nível médio ou alto de segurança<br />
                    - Não use informações pessoais, caracteres ou números em sequência, exemplo: (123, abc...)
                </div>
                <div className="font">Confirmar senha</div>
                <input
                    type="password"
                    id="senha2"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Cadastre-se</button>
            </form>
        </div>
    );
};

export default CadastroConsumidor;
