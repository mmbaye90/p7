import React, { useState } from 'react';
import Login from './Login';
import Signin from './Signin';
import "./stylesLogForm/indexLogForm.css"
const IndexLogForm = (props) => {
    const [signinModal,setSigninModal] = useState(props.register)
    const [logModal,setLogModal] = useState(props.login)


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
                    <li onClick={handleModals} id ="register"
                    className={signinModal ? "active-btn" : null}
                    >S'inscrire</li>
                    <li onClick={handleModals} id ="login"
                    className={logModal ? "active-btn" : null}
                    >Login</li>
                </ul>
                {signinModal && <Signin/>}
                {logModal && <Login/>}
            </div>
        </div>
    );
};

export default IndexLogForm;