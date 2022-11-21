import React, {useEffect, useState} from 'react';
import axios from "axios";

const App = () => {
    const [recettes, setRecettes] = useState([]);
    useEffect(() => {
        axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=tomato")
            .then((result) => {
               setRecettes(result.data["meals"]);
            })
    }, []);
    return (
        <div>
            <div id={"head"} className={"text-center mt-4 d-flex flex-column align-items-center"}>
                <h1 className={"mb-4"}>Appli recettes de cuisine</h1>
                <input type="text" className="form-control w-25" placeholder="Tapez le nom d'un aliment (en anglais)" />
            </div>
        </div>
    );
};

export default App;
