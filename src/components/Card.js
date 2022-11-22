import React from 'react';

const Card = ({details}) => {
    return (
        <div className={"card col-2 me-4 mb-4"} style={{"borderColor":"#f88577"}}>
            <div className={"card-body"}>
                <h5 className={"card-title text-center"}>{details.name}</h5>
                <p className={"card-text text-center"}>Origin : {details.origin} </p>
                <img src={details.img} style={{"maxWidth":"100%", "borderRadius":"10px"}} alt={"img"}/>
                <p className={"card-text mt-4 mb-4"}
                   style={{
                       "display": "-webkit-box",
                       "WebkitLineClamp": "8",
                       "WebkitBoxOrient": "vertical",
                       "overflow": "hidden"
                   }}
                >{details.desc}</p>
            </div>
        </div>
    );
};

export default Card;