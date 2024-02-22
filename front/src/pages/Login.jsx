import React from 'react'
import '../styles/login.css'
import img_login1 from '../assets/cad-img.png'
import img_logo from "../assets/sidequest_3.png"


const Login = () => {
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
            <form action="/auth/login" method="post">
            <input placeholder="Digite Email" type="email" name="email"/>
            <input placeholder="Digite sua senha" type="password" name="senha"/>
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
