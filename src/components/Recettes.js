import React, {useEffect, useState} from 'react';
import {BiSearch} from "react-icons/bi";
import Card from "./Card";
import axios from "axios";

const Recettes = () => {
    const [recettes, setRecettes] = useState([]);
    const [search, setSearch] = useState([]);
    useEffect(() => {
        axios.get("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
            .then((result) => {
                setRecettes(result.data["meals"]);
            })
    }, []);

    function searchInput(){
        axios.post("https://www.themealdb.com/api/json/v1/1/search.php?s="+search)
            .then((result) => {
                setRecettes(result.data["meals"]);
            })
    }

    function searchHandling(event) {
        const search = event.target.value;
        setSearch(search);
    }

    return (
        <div>
            <h1 className={"mb-4 mt-4 text-center"} style={{"color":"#f88577"}}>Appli recettes de cuisine</h1>
            <div id={"head"} className={"text-center mt-4 d-flex flex-column align-items-center"}>
                <div className={"input-group w-25"}>
                    <input type="text"
                           className="form-control"
                           placeholder="Tapez le nom d'un aliment (en anglais)"
                           aria-describedby="button-addon2"
                           value={search}
                           onChange={searchHandling}
                    />

                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={searchInput}>
                        <BiSearch/>
                    </button>
                </div>
            </div>
            <div className={"row justify-content-center mt-4"}>
                {recettes.map(element => (
                    <Card key={element.idMeal}
                          details={{
                              name: element.strMeal,
                              origin: element.strArea,
                              img: element.strMealThumb,
                              desc: element.strInstructions
                          }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Recettes;