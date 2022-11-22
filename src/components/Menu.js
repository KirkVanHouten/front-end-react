import React from 'react';
import { NavLink } from "react-router-dom";

const Menu = () => {
    let activeStyle = {
        textDecoration: "underline",
    };
    return (
        <div className={"d-flex justify-content-center"}>
            <nav className="navbar navbar-expand-lg bg-light w-75">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-center w-100">
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