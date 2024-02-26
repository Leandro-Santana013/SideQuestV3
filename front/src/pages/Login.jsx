import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css'
import img_login1 from '../assets/cad-img.png'
import img_logo from "../assets/sidequest_3.png"


const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { email, senha });
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

  return (
    <div className="formlogin" class="tbodylogin">
    <div class="forms">
    <div class="l-side">
        <img src={img_login1}/>
    </div>
    <div class="r-side">
        <div class="content-logo">
            <img src={img_logo}/>
        </div>
        <div class="campos">
            <h2>Entre em sua conta</h2>
            <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button  type="submit" class="btn-criar">Entrar</button>
        </form>
            <div class="entre-google">
                <div class="linha"></div>
                <p>ou entre com o google</p>
                <div class="linha"></div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default Login
