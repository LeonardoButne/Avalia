import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './StylePerfilEcommerce.css'



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

const EcommerceProfile: React.FC = () => {
    const [ecommerce, setEcommerce] = useState<any>(null);
    const [ecommerceId, setEcommerceId] = useState<string | null>(null);
    const [avaliacoes, setAvaliacoes] = useState<number[]>([]);
    const [comentarios, setComentarios] = useState<{ nome: string; comentario: string }[]>([]);
    const [starRating, setStarRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');


    
    const urlParams = new URLSearchParams(window.location.search);
    const ecommerceName = urlParams.get("ecommerce_name");
    console.log("Nome do e-commerce:", ecommerceName);

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const ecommerceName = decodeURIComponent(pathParts[pathParts.length - 1]);
        console.log("Nome do e-commerce:", ecommerceName);
        if (ecommerceName) {
            console.log("Buscando e-commerce:", ecommerceName);
            feedbackAquiDB2.child("ecommerces").orderByChild("ecommerce_name").equalTo(ecommerceName).on("value", (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    console.log("Dados do e-commerce:", data);
                    setEcommerce(data);
                    setEcommerceId(childSnapshot.key);
                });
            });
        }
    }, [ecommerceName]);

    useEffect(() => {
        if (ecommerceId) {
            console.log("Buscando avaliações para o e-commerce ID:", ecommerceId);
            feedbackAquiDB2.child("avaliacoes").orderByChild("ecommerceId").equalTo(ecommerceId).on("value", (snapshot) => {
                const newAvaliacoes: number[] = [];
                const comentariosPromises: Promise<{ nome: string; comentario: string }>[] = [];

                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    console.log("Dados da avaliação:", data);
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
                        console.log("Comentários carregados:", comentarios);
                        setAvaliacoes(newAvaliacoes);
                        setComentarios(comentarios);
                    })
                    .catch((error) => {
                        console.error("Erro ao obter dados do usuário:", error);
                    });
            });
        }
    }, [ecommerceId]);

    const handleRatingSubmit = () => {
        if (starRating && comment.trim() !== "") {
            firebase.auth().onAuthStateChanged((user) => {
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
                    console.log("Usuário não autenticado");
                }
            });
        } else {
            alert("Por favor, selecione uma classificação antes de enviar.");
        }
    };

    const calcularMedia = (avaliacoes: number[]) => {
        if (avaliacoes.length === 0) {
            return 0;
        }
    
        console.log("Avalicaoes: ", avaliacoes)
        let total = 0;

        for (let i = 0; i < avaliacoes.length; i++) {
            total += Number(avaliacoes[i]);
        }
        console.log("Total: ", total)
        return total / avaliacoes.length;
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
                                    onClick={() => setStarRating(value)}
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
