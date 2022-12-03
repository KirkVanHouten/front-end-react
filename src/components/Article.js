import React from 'react';
import axios from "axios";

const Article = ({infos, removeArticle, updateArticle}) => {
    // Composant contenant le code d'un objet Article
    let dateObject = new Date(infos.date);
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute:'numeric', second: 'numeric'};
    // Transcrit la date récupérée du serveur json au format souhaité pour l'affichage
    let dateFormated = dateObject.toLocaleDateString('fr-FR', options)

    // --- Suppression d'un article basé sur son id --------------------------------------------- deleteArticle
    function deleteArticle(){
        removeArticle(infos.id);
    }

    // --- Modification de l'article courant avec les informations récupérées en props ---------- modifyArticle
    function modifyArticle(){
        updateArticle(infos);
    }

    // Template d'affichage d'un article
    return (
        <div className={"container mt-4"}>
            <div className={"card mb-3"}>
                <div className={"d-flex flex-row justify-content-between mt-3 me-3 ms-3"}>
                    <h5 className={"card-title"}>{infos.author}</h5>
                    <h6 className={"card-subtitle text-muted mt-1"}>Posté le {dateFormated}</h6>
                </div>

                <div className={"card-body"}>
                    <p className={"card-text"}>{infos.desc}</p>
                </div>
                <div className={"d-flex align-self-end mb-3 me-3"}>
                    <button className={"btn btn-danger"} onClick={deleteArticle}>Supprimer</button>
                    <button className={"btn btn-primary ms-3"} onClick={modifyArticle}>Modifier</button>
                </div>

            </div>
        </div>

    );
};

export default Article;