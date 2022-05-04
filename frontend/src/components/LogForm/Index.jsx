import React, { useState } from 'react';
import Login from './Login';
import Signin from './Signin';

const Index = () => {
    const [signinModal,setSigninModal] = useState(true)
    const [logModal,setLogModal] = useState(false)


    const handleModals =(e)=>{
        if(e.target.id === "register"){
            setSigninModal(true)
            setLogModal(false)
        }else if(e.target.id === "login"){
            setSigninModal(false)
            setLogModal(true)
        }
    }


    return (
        <div className="connectionForm">
            <div className="formContainer">
                <ul>
                    <li onClick={handleModals} id ="register">S'inscrire</li>
                    <li onClick={handleModals} id ="login">Login</li>
                </ul>
                {signinModal && <Signin/>}
                {logModal && <Login/>}
            </div>
        </div>
    );
};

export default Index;