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

    function fetchDatas(){
        axios.get("http://localhost:3003/articles")
            .then((res) => {
               setArticles(res.data);
            })
    }

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

    function handleAuteurInput(evt){
        setAuteur(evt.target.value);
    }

    function handleArticleInput(evt){
        setArticle(evt.target.value);
        checkArticleLength(evt.target.value);
    }

    function checkArticleLength(txt){
        let strInputed = txt.length;
        setNbCar(nbCarMin-strInputed);
        if((nbCarMin-strInputed)>0){
            setStyle({"color":"red", "display":"block"});
        } else {
            setStyle({"color":"black", "display":"none"});
        }
    }

    function removeArticle(idToRemove){
        axios.delete("http://localhost:3003/articles/"+idToRemove)
            .then(() => {
              fetchDatas();
            })
    }

    function handleEditArticleAuthor(evt){
        setAuthorToEdit(evt.target.value);
    }

    function handleEditArticleDesc(evt){
       setDescToEdit(evt.target.value);
       checkArticleLength(evt.target.value);
    }

    function updateArticle(articleToEdit){
        setShowModal(true);
        setArticleToEdit(articleToEdit);
        setAuthorToEdit(articleToEdit.author);
        setDescToEdit(articleToEdit.desc);
    }

    function saveUpdate(){
        // axios.post("http://localhost:3003/articles/"+articleToEdit.id,{
            // articleToEdit
        // })
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

    function resetTextAreaHelper(){
        setNbCar(nbCarMin);
        setStyle({"color":"black", "display":"none"});
    }

    function hideModal(){
        setShowModal(false);
        resetTextAreaHelper();
    }

    function setNbCarForModal(){
        setNbCar(nbCarMin-descToEdit);
        setStyle({"color":"black", "display":"none"});
    }

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