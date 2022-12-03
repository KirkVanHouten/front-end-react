import React, {useEffect, useState} from 'react';
import axios from "axios";
import Article from "./Article";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";

const Blog = () => {
    const nbCarMin = 100;
    const [articles, setArticles] = useState([]);
    const [nbCar, setNbCar] = useState(nbCarMin);
    const [style, setStyle] = useState({"display":"none"});
    const [auteur, setAuteur] = useState('');
    const [article, setArticle] = useState('');
    const [articleToEdit, setArticleToEdit] = useState({});
    const [authorToEdit, setAuthorToEdit] = useState('');
    const [descToEdit, setDescToEdit] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchDatas();
    }, []);

    // Au chargement de la page on va récupérer la liste des articles déjà présents dans la base de données
    function fetchDatas(){
        axios.get("http://localhost:3003/articles")
            .then((res) => {
                // Une fois les articles récupérés, on les stocke dans la variable d'état 'articles'
               setArticles(res.data);
            })
    }

    // --- A l'envoi du formulaire, insère les données écrites par l'utilisateur dans la base de données
    // --- puis recharge les données de cette dernière afin de mettre à jour la liste des articles
    // --- et enfin, réinitialise les variables d'état article et auteur et cache le texte indiquant une saisie
    // --- trop courte ------------------------------------------------------------------------------------------------- checkForm
    function checkForm(event){
       event.preventDefault();
       axios.post("http://localhost:3003/articles", {
           "author": auteur,
           "content": article,
           "date": Date.now(),
           "id": articles.length + 1
       }).then(() => {
            fetchDatas();
            setArticle('');
            setAuteur('');
            resetTextAreaHelper();
       })
    }

    // --- Met à jour la variable d'état auteur à chaque changement dans la zone de texte liée au nom de l'auteur ------ handleAuteurInput
    function handleAuteurInput(evt){
        setAuteur(evt.target.value);
    }

    // --- Met à jour la variable d'état article à chaque changement dans la zone de texte liée au texte de l'article -- handleArticleInput
    function handleArticleInput(evt){
        setArticle(evt.target.value);
        checkArticleLength(evt.target.value);
    }

    // --- Vérifie si le texte entré dans le texte de l'article à une longueur supérieure ou égale à la longueur
    // --- minimale, si c'est le cas on n'affiche rien, sinon, on affiche un texte en rouge indiquant le nombre
    // --- de caractères manquant dans le texte ------------------------------------------------------------------------ checkArticleLength
    function checkArticleLength(txt){
        let strInputed = txt.length;
        setNbCar(nbCarMin-strInputed);
        if((nbCarMin-strInputed)>0){
            setStyle({"color":"red", "display":"block"});
        } else {
            setStyle({"color":"black", "display":"none"});
        }
    }

    // --- Supprime l'article dont l'id est passée en paramètres de la fonction ---------------------------------------- removeArticle
    function removeArticle(idToRemove){
        axios.delete("http://localhost:3003/articles/"+idToRemove)
            .then(() => {
              fetchDatas();
            })
    }

    // --- Met à jour la variable d'état authorToEdit à chaque changement dans la zone de texte liée au nom de l'auteur
    // --- lors d'une modification d'une article ----------------------------------------------------------------------- handleEditArticleAuthor
    function handleEditArticleAuthor(evt){
        setAuthorToEdit(evt.target.value);
    }

    // --- Met à jour la variable d'état descToEdit à chaque changement dans la zone de texte liée au contenu d'un
    // --- article lors d'une modification ----------------------------------------------------------------------------- handleEditArticleDesc
    function handleEditArticleDesc(evt){
       setDescToEdit(evt.target.value);
       checkArticleLength(evt.target.value);
    }

    // --- Afiche le modal de modification d'un article et remplit ses inputs avec les données
    // --- de l'article à modifier ------------------------------------------------------------------------------------- updateArticle
    function updateArticle(articleToEdit){
        setShowModal(true);
        setArticleToEdit(articleToEdit);
        setAuthorToEdit(articleToEdit.author);
        setDescToEdit(articleToEdit.desc);
    }

    // --- Sauvegarde la modification d'un article dans la base de données puis cache le modal de modification,
    // --- et enfin récupère les données de la base de données pour afficher les modifications ------------------------- saveUpdate
    function saveUpdate(){
        let newArticle = Object.assign({},articleToEdit);
        newArticle.author = authorToEdit;
        newArticle.desc   = descToEdit;
        axios.put("http://localhost:3003/articles/"+articleToEdit.id, {
            "author":newArticle.author,
            "content":newArticle.desc,
            "date":Date.now(),
            "id":newArticle.id
        }).then(() => {
                hideModal();
                fetchDatas();
            })
    }

    // --- Fonction permettant de cacher le texte indiquant le nombre de caractères manquant au texte d'un article ----- resetTextAreaHelper
    function resetTextAreaHelper(){
        setNbCar(nbCarMin);
        setStyle({"color":"black", "display":"none"});
    }

    // --- Cache le modal de modification d'un article ----------------------------------------------------------------- hideModal
    function hideModal(){
        setShowModal(false);
        resetTextAreaHelper();
    }

    // --- Stocke le nombre de caractères manquant du modal de modification dans la variable d'état nbCar
    // --- puis stocke dans la variable d'état style le style par défaut du helper (caché) ----------------------------- setNbCarModal
    function setNbCarForModal(){
        setNbCar(nbCarMin-descToEdit);
        setStyle({"color":"black", "display":"none"});
    }

    // Template d'affichage de la page Blog
    return (
        <div>
            <Modal show={showModal} onShow={setNbCarForModal} onHide={hideModal} size={"lg"} centered>
                <ModalHeader>
                    <ModalTitle>Modification d'un article</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={checkForm}>
                        <div className={"mb-3"}>
                            <input required={true} className={"form-control"}
                                   value={authorToEdit}
                                   onChange={ handleEditArticleAuthor }
                                   placeholder={"Nom"}/>
                        </div>
                        <div className={"mb-3"}>
                            <textarea required={true} className={"form-control pb-5"}
                                  placeholder={"Message"}
                                  value={descToEdit}
                                      minLength={100}
                                  onChange={ handleEditArticleDesc }
                                  aria-describedby="userIndication"></textarea>
                            <div id="userIndication" className="form-text" style={style}>Veuillez écrire un minimum de {nbCar} caractère(s).</div>
                        </div>
                        <div className={"d-flex justify-content-end"}>
                            <Button variant={"danger"}
                                    onClick={() => setShowModal(false)} >
                                Annuler
                            </Button>
                            <Button variant={"primary"}
                                    className={"ms-3"}
                                    disabled={nbCar>0}
                                    onClick={saveUpdate}>
                                Modifier
                            </Button>
                        </div>

                    </form>
                </ModalBody>
            </Modal>
            <h1 className={"mb-4 mt-4 text-center"}>Blog</h1>
            <form className={"container w-50 d-flex flex-column"} onSubmit={checkForm}>
                <div className={"mb-3"}>
                    <input required={true} className={"form-control"} style={{"borderColor":"#fa8072"}}
                           value={auteur}
                           onChange={handleAuteurInput}
                           placeholder={"Nom"}/>
                </div>
                <div className={"mb-3"}>
                    <textarea required={true} className={"form-control pb-5"} style={{"borderColor":"#fa8072"}}
                              placeholder={"Message"}
                              value={article}
                              minLength={100}
                              onChange={handleArticleInput}
                              aria-describedby="userIndication"></textarea>
                    <div id="userIndication" hidden={showModal} className="form-text" style={style}>Veuillez écrire un minimum de {nbCar} caractères.</div>
                </div>
                <button className={"btn align-self-end"} disabled={nbCar>0 && !showModal} style={{"backgroundColor":"#fa8072"}}>Envoyer</button>
            </form>
            {articles.map(element => (
                <Article key={element.id}
                         removeArticle = {removeArticle}
                         updateArticle = {updateArticle}
                         infos         = {{
                                            author : element.author,
                                            desc   : element.content,
                                            date   : element.date,
                                            id     : element.id,
                                         }}
                />
            ))}
        </div>
    );
};

export default Blog;