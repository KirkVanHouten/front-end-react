import React, {useEffect, useState} from 'react';
import axios from "axios";
import Card from "./Card";
import Article from "./Article";

const Blog = () => {
    const [articles, setArticles] = useState([]);
    const [nbCar, setNbCar] = useState(140);
    const [style, setStyle] = useState({"display":"none"});
    const [auteur, setAuteur] = useState('');
    const [article, setArticle] = useState('');
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
       })
    }

    function handleAuteurInput(evt){
        setAuteur(evt.target.value);
    }

    function handleArticleInput(evt){
        setArticle(evt.target.value);
        let strInputed = evt.target.value.length;
        setNbCar(100-strInputed);
        if((100-strInputed)>0){
            setStyle({"color":"red", "display":"block"});
        } else {
            setStyle({"color":"black", "display":"none"});
        }
    }

    function removeArticle(incoming){
        console.log(incoming);
    }

    return (
        <div>
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
                              onChange={handleArticleInput}
                              aria-describedby="userIndication"></textarea>
                    <div id="userIndication" className="form-text" style={style}>Veuillez écrire un minimum de {nbCar} caractères.</div>
                </div>
                <button className={"btn align-self-end"} style={{"backgroundColor":"#fa8072"}}>Envoyer</button>
            </form>
            {articles.map(element => (
                <Article key={element.id}
                         removeArticle={removeArticle}
                      infos={{
                          author: element.author,
                          desc: element.content,
                          date: element.date,
                          id: element.id,
                      }}
                />
            ))}
        </div>
    );
};

export default Blog;