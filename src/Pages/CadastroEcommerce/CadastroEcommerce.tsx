import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './CadastroEcommerce.css'

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

const CadastroEcommerce: React.FC = () => {
    const [ecommerceName, setEcommerceName] = useState('');
    const [category, setCategory] = useState('');
    const [province, setProvince] = useState<string>('');
    const [city, setCity] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [legalRepresentative, setLegalRepresentative] = useState('');
    const [foundationDate, setFoundationDate] = useState('');

    const handleCadastroSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const ecommerceData = {
            ecommerceName,
            category,
            province,
            city,
            website,
            phone,
            contactEmail,
            legalRepresentative,
            foundationDate
        };

        const db = firebase.database().ref("feedbackAqui/ecommerces");
        db.push(ecommerceData)
            .then(() => {
                alert("E-commerce cadastrado com sucesso!");
                setEcommerceName('');
                setCategory('');
                setProvince('');
                setCity('');
                setWebsite('');
                setPhone('');
                setContactEmail('');
                setLegalRepresentative('');
                setFoundationDate('');
            })
            .catch(error => {
                console.error("Erro ao cadastrar e-commerce:", error);
                alert("Erro ao cadastrar e-commerce. Verifique o console para mais detalhes.");
            });
    };

    return (
        <div className="container">
            <h1 className="label">Cadastro de E-commerce</h1>
            <form className="login_form" id="cadastroEcommerce_form" onSubmit={handleCadastroSubmit}>
                <div className="font">Dados do E-commerce</div>
                <div className="font font2">Nome do E-commerce</div>
                <input
                    type="text"
                    id="ecommerce_name"
                    name="ecommerce_name"
                    autoComplete="off"
                    value={ecommerceName}
                    onChange={(e) => setEcommerceName(e.target.value)}
                />
                <div className="font">Categoria</div>
                <select
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Selecione a categoria</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Moda">Moda</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Móveis">Móveis</option>
                    <option value="Esportes">Esportes</option>
                </select>
                <div className="font">Provincia</div>
                <select
                    name="province"
                    id="provinceSelect"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                >
                    <option value="">Selecione a província</option>
                    {provinces.map((province, index) => (
                        <option key={index} value={province}>{province}</option>
                    ))}
                </select>
                <div className="font">Cidade</div>
                <select
                    name="city"
                    id="citySelect"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!province}
                >
                    <option value="">Selecione a cidade</option>
                    {province && cities[province]?.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
                <div className="font">Website ou link da página na rede social</div>
                <input
                    type="text"
                    name="website"
                    id="website"
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
                <div className="font">Telefone</div>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="(  )"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <div className="font">Email de Contato</div>
                <input
                    type="email"
                    name="contact_email"
                    id="contact_email"
                    autoComplete="off"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                />
                <div className="font font2">Representante Legal</div>
                <input
                    type="text"
                    name="legal_representative"
                    id="legal_representative"
                    autoComplete="off"
                    value={legalRepresentative}
                    onChange={(e) => setLegalRepresentative(e.target.value)}
                />
                <div className="font">Data de Fundação</div>
                <input
                    type="text"
                    name="foundation_date"
                    id="foundation_date"
                    placeholder="dd/mm/aaaa"
                    value={foundationDate}
                    onChange={(e) => setFoundationDate(e.target.value)}
                    readOnly
                />
                <button type="submit">Cadastre-se</button>
            </form>
        </div>
    );
};

export default CadastroEcommerce;
