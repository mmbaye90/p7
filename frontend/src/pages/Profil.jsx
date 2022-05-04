import React from 'react';
import logoconnexion from "../img/connexion.jpg";
import LogForm from "../components/LogForm/Index"

const Profil = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
                <LogForm/>
                <div className="img-Container"><img src={logoconnexion} alt="imaconnexion"/></div>
            </div>
        </div>
    );
};

export default Profil;