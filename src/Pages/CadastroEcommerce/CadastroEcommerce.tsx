import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CadastroEcommerce.css';

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
    const [ecommerce_name, setEcommerceName] = useState('');
    const [category, setCategory] = useState('');
    const [provinceSelect, setProvince] = useState<string>('');
    const [citySelect, setCity] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');
    const [contact_email, setContactEmail] = useState('');
    const [legal_representative, setLegalRepresentative] = useState('');
    const [foundationDate, setFoundationDate] = useState<Date | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleCadastroSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!profileImage) {
            alert("Por favor, selecione uma imagem de perfil.");
            return;
        }

        const storageRef = firebase.storage().ref();
        const profileImageRef = storageRef.child(`profileImages/${profileImage.name}`);

        profileImageRef.put(profileImage).then(() => {
            profileImageRef.getDownloadURL().then((url) => {
                const ecommerceData = {
                    ecommerce_name,
                    category,
                    provinceSelect,
                    citySelect,
                    website,
                    phone,
                    contact_email,
                    legal_representative,
                    foundation_date: foundationDate ? foundationDate.toISOString() : '',
                    profileImage: url
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
                        setFoundationDate(null);
                        setProfileImage(null);
                    })
                    .catch(error => {
                        console.error("Erro ao cadastrar e-commerce:", error);
                        alert("Erro ao cadastrar e-commerce. Verifique o console para mais detalhes.");
                    });
            });
        }).catch(error => {
            console.error("Erro ao fazer upload da imagem:", error);
            alert("Erro ao fazer upload da imagem. Verifique o console para mais detalhes.");
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
                    value={ecommerce_name}
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
                    value={provinceSelect}
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
                    value={citySelect}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!provinceSelect}
                >
                    <option value="">Selecione a cidade</option>
                    {provinceSelect && cities[provinceSelect]?.map((city, index) => (
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
                    value={contact_email}
                    onChange={(e) => setContactEmail(e.target.value)}
                />
                <div className="font font2">Representante Legal</div>
                <input
                    type="text"
                    name="legal_representative"
                    id="legal_representative"
                    autoComplete="off"
                    value={legal_representative}
                    onChange={(e) => setLegalRepresentative(e.target.value)}
                />
                <div className="font">Data de Fundação</div>
                <DatePicker
                    selected={foundationDate}
                    onChange={(date: Date | null) => setFoundationDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="datepicker"
                />
                <div className="font">Imagem de Perfil</div>
                <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                />
                <button type="submit">Cadastre-se</button>
            </form>
        </div>
    );
};

export default CadastroEcommerce;
