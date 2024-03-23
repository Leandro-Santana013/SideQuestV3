import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login2.css';
import img_login1 from '../../assets/cad-img.png';
import img_logo from '../../assets/sidequest_3.png';

const Login2 = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [message, setMessage] = useState(null);
    const [message2, setMessage2] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: null,
        senha: null,
    });

    const [formDataCadastro, setFormDataCadastro] = useState({
        name: null,
        email: null,
        cpf: null,
        senha: null,
        senhaConfirm: null,
    });

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setFormDataCadastro((prevFormDataCadastro) => ({
            ...prevFormDataCadastro,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', formData);
            if (response.status === 200) {
                setMessage(<p className='fail'>{response.data.message}</p>);
            } else if (response.status === 201) {
                navigate('/homeCliente');
            }
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const handleSubmitCadastro = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/auth/register', formDataCadastro);
            setResponseStatus(response.status);
            if(response.status == 200){
                setMessage2(<p className='fail'>{response.data.message}</p>)
            }else if(response.status == 202){
                setMessage2(<p className='success'>{response.data.message}</p>);
            }
                
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            setMessage2(error.response?.data?.message || <p className='fail'>Erro ao cadastrar</p>);
        }
    };

    return (
        <>
            <div className="container-forms">
                <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleSubmitCadastro}>
                            <h1>Criar conta</h1>
                            <div className="social-container"></div>
                            <div className={`container-mensagem-erro ${message2 && responseStatus === 202}`}>
                                {message2}
                            </div>
                            <input placeholder="Digite seu nome" type="text" name="name" value={formDataCadastro.name} onChange={handleChange} />
                            <input placeholder="Digite seu email" type="email" name="email" value={formDataCadastro.email} onChange={handleChange} />
                            <input placeholder="Digite seu CPF" type="text" id="cpfInput" name="cpf" value={formDataCadastro.cpf} onChange={handleChange} />
                            <input placeholder="Digite uma senha" type="password" name="senha" value={formDataCadastro.senha} onChange={handleChange} />
                            <input placeholder="Confirme sua senha" type="password" name="senhaConfirm" value={formDataCadastro.senhaConfirm} onChange={handleChange} />
                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <div className="social-container"></div>
                            {message && <div className="container-mensagem-erro">{message}</div>}
                            <input placeholder="Digite seu email" type="email" name="email" value={formData.email} onChange={handleChange} />
                            <input placeholder="Digite uma senha" type="password" name="senha" value={formData.senha} onChange={handleChange} />
                            <a className="forgot" href="#">Esqueceu a sua senha?</a>
                            <button type='submit'>Entrar</button>
                        </form>
                    </div>
                    <div className="painel-container">
                        <div className="painel">
                            <div className="painel-panel painel-left">
                                <h1>Bem vindo a SideQuest</h1>
                                <p>Ja possui conte? cadastre-se</p>
                                <button className="ghost" onClick={handleSignInClick}>Logar</button>
                            </div>
                            <div className="painel-panel painel-right">
                                <h2>Ainda não possui conta?</h2>
                                <p></p>
                                <button className="ghost" onClick={handleSignUpClick}>Cadastrar-se</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Login2;
