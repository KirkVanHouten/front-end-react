import React, {useEffect, useState} from 'react';
import axios from "axios";
import Card from "./components/Card";

const App = () => {
    const [recettes, setRecettes] = useState([]);
    useEffect(() => {
        axios.post("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
            .then((result) => {
               setRecettes(result.data["meals"]);
            })
    }, []);

    return (
        <div>
            <div id={"head"} className={"text-center mt-4 d-flex flex-column align-items-center"}>
                <h1 className={"mb-4"} style={{"color":"#f88577"}}>Appli recettes de cuisine</h1>
                <input type="text" className="form-control w-25" placeholder="Tapez le nom d'un aliment (en anglais)" />
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

export default App;
