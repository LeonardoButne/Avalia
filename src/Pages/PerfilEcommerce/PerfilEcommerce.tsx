import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { useNavigate } from 'react-router-dom';
import './StylePerfilEcommerce.css';

const firebaseConfig = {
    // Configuração do Firebase
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

const feedbackAquiDB2 = firebase.database().ref("feedbackAqui");

const EcommerceProfile: React.FC = () => {
    const [ecommerce, setEcommerce] = useState<any>(null);
    const [ecommerceId, setEcommerceId] = useState<string | null>(null);
    const [avaliacoes, setAvaliacoes] = useState<number[]>([]);
    const [comentarios, setComentarios] = useState<{ nome: string; comentario: string }[]>([]);
    const [starRating, setStarRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');

    const navigate = useNavigate();

    // Função para buscar dados do e-commerce
    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const ecommerceName = decodeURIComponent(pathParts[pathParts.length - 1]);
        if (ecommerceName) {
            feedbackAquiDB2.child("ecommerces").orderByChild("ecommerce_name").equalTo(ecommerceName).on("value", (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    setEcommerce(data);
                    setEcommerceId(childSnapshot.key);
                });
            });
        }
    }, []);

    // Função para buscar avaliações do e-commerce
    useEffect(() => {
        if (ecommerceId) {
            feedbackAquiDB2.child("avaliacoes").orderByChild("ecommerceId").equalTo(ecommerceId).on("value", (snapshot) => {
                const newAvaliacoes: number[] = [];
                const comentariosPromises: Promise<{ nome: string; comentario: string }>[] = [];

                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    newAvaliacoes.push(data.starRating);

                    const userPromise = feedbackAquiDB2.child("consumidores").child(data.userId).once("value")
                        .then((userSnapshot) => {
                            const userData = userSnapshot.val();
                            const nomeUsuario = userData.nome || "Nome não encontrado";
                            return { comentario: data.comment, nome: nomeUsuario };
                        })
                        .catch((error) => {
                            console.error("Erro ao obter dados do usuário:", error);
                            return { comentario: data.comment, nome: "Erro ao obter nome do usuário" };
                        });

                    comentariosPromises.push(userPromise);
                });

                Promise.all(comentariosPromises)
                    .then((comentarios) => {
                        setAvaliacoes(newAvaliacoes);
                        setComentarios(comentarios);
                    })
                    .catch((error) => {
                        console.error("Erro ao obter dados do usuário:", error);
                    });
            });
        }
    }, [ecommerceId]);

    // Função para lidar com o envio da avaliação
    const handleRatingSubmit = () => {
        if (starRating && comment.trim() !== "") {
            const user = firebase.auth().currentUser;
            if (user && ecommerceId) {
                const userId = user.uid;
                feedbackAquiDB2.child("consumidores").child(userId).once("value")
                    .then((snapshot) => {
                        const userData = snapshot.val();
                        const userName = userData.nome;

                        const feedbackData = {
                            ecommerceId: ecommerceId,
                            userId: userId,
                            userName: userName,
                            starRating: starRating,
                            comment: comment
                        };

                        const newFeedbackRef = feedbackAquiDB2.child("avaliacoes").push();
                        newFeedbackRef.set(feedbackData);

                        setComment('');
                        alert("Avaliação enviada com sucesso!");
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar dados do usuário:", error);
                    });
            } else {
                navigate('/login');
            }
        } else {
            alert("Por favor, selecione uma classificação antes de enviar.");
        }
    };

    // Função para calcular a média das avaliações
    const calcularMedia = (avaliacoes: number[]) => {
        if (avaliacoes.length === 0) {
            return 0;
        }
    
        const total = avaliacoes.reduce((acc, curr) => acc + curr, 0);
        return total / avaliacoes.length;
    };

    // Função para lidar com o clique nas estrelas
    const handleStarClick = (value: number) => {
        setStarRating(value);
    };

    return (
        <div>
            <h1>Perfil do E-commerce</h1>
            <div className="container">
                <div id="profileDetails">
                    {ecommerce && (
                        <>
                            <h2>{ecommerce.ecommerce_name}</h2>
                            <p><strong>Categoria:</strong> {ecommerce.category}</p>
                            <p><strong>Website:</strong> <a href={ecommerce.website} target="_blank" rel="noopener noreferrer">{ecommerce.website}</a></p>
                            <p><strong>Província:</strong> {ecommerce.provinceSelect}</p>
                            <p><strong>Cidade:</strong> {ecommerce.citySelect}</p>
                            <p><strong>Telefone:</strong> {ecommerce.phone}</p>
                            <p><strong>Email de Contato:</strong> {ecommerce.contact_email}</p>
                            <p><strong>Representante Legal:</strong> {ecommerce.legal_representative}</p>
                            <p><strong>Data de Fundação:</strong> {ecommerce.foundation_date}</p>
                            <p><strong>Média de Avaliações:</strong> {calcularMedia(avaliacoes).toFixed(1)}</p>
                        </>
                    )}
                </div>

                <div id="profileDetails">
                    <h2>O que tem falado sobre <span>{ecommerce?.ecommerce_name}</span></h2>
                    <div id="comments-container">
                        <ul id="comments">
                            {comentarios.map((comentario, index) => (
                                <li key={index}>
                                    <strong>{comentario.nome}</strong>
                                    <p>{comentario.comentario}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div id="ratingForm">
                    <h2>Deixe sua avaliação</h2>
                    <div className="avaliacao-center">
                        <ul className="avaliacao">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <li
                                    key={value}
                                    className={`star-icon ${starRating && starRating >= value ? 'ativo' : ''}`}
                                    onClick={() => handleStarClick(value)} // Alterado para chamar handleStarClick
                                />
                            ))}
                        </ul>
                    </div>
                    <div>
                        <label htmlFor="comment">Comentário:</label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows={4}
                            cols={50}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={handleRatingSubmit}>Enviar Avaliação</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcommerceProfile;
