import React from 'react';
import { NavLink } from "react-router-dom";

const Menu = () => {
    let activeStyle = {
        textDecoration: "underline",
    };
    // Composant représentant la nabar présente en haut de l'application
    return (
        <div className={"d-flex justify-content-center"}>
            <nav className="navbar bg-light w-75">
                <div className="container-fluid">
                    <div id="navbarNav">
                        <ul className="navbar-nav d-flex flex-row w-100">
                            <li className="nav-item me-3 active">
                                <NavLink to={"recettes"}
                                         className={"nav-link"}
                                style={({isActive}) =>
                                    (isActive ? activeStyle : undefined)}>

                                    Recettes
                                </NavLink>

                            </li>
                            <li className="nav-item" >
                                <NavLink className={"nav-link"} style={({isActive}) =>
                                    (isActive ? activeStyle : undefined)} to={"blog"}>Blog</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Menu;