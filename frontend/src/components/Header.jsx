import React from 'react';
import "../components/header.css"
import groupomania from "../img/icon-left-font.png"

const Header = () => {
    return (
        <div className='header'>
            <div className="containerImg">
                <img src={groupomania} alt="logo entreprise" />
            </div>
        </div>
    );
};

export default Header;