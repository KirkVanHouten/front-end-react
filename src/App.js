import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Recettes from "./components/Recettes";
import Blog from "./components/Blog";
import Layout from "./components/Layout";
const App = () => {
    // On définit les routes utilisables par l'application -> /recettes et /blog liés aux composants portants le même nom
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Recettes />} />
                        <Route path="recettes" element={<Recettes />} />
                        <Route path="blog" element={<Blog />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
