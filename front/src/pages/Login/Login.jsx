import React, { useState } from 'react';
import axios from 'axios'; 2
import './login.css'
import img_login1 from '../../assets/cad-img.png'
import img_logo from "../../assets/sidequest_3.png"
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [message, setMessage] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', formData);
            if (response.status === 200) {
                setMessage(response.data.message);
            } else if (response.status === 201) {
                navigate("/homecliente");
            }
        } catch (error) {
            console.error(error.response.data.message);
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="formlogin" class="tbodylogin">
            <div class="forms">
                <div class="l-side">
                    <img src={img_login1} />
                </div>
                <div class="r-side">
                    <div class="content-logo">
                        <img src={img_logo} />
                    </div>
                    <div class="campos">
                        <h2>Entre em sua conta</h2>
                        <form onSubmit={handleSubmit}>
                            <input placeholder="Digite seu email" type="email" name="email" value={formData.email} onChange={handleChange} />
                            <input placeholder="Digite uma senha" type="password" name="senha" value={formData.senha} onChange={handleChange} />
                            <button type="submit" class="btn-criar">Entrar</button>
                        </form>
                        <div class="entre-google">
                            <div class="linha"></div>
                            <p>ou entre com o google</p>
                            <div class="linha"></div>
                        </div>
                    </div>
                </div>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    )
}

export default Login
