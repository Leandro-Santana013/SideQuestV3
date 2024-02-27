import React from 'react'
import logo from '../assets/logo_SideQuest.png'
import { Link } from 'react-router-dom'
import "../styles/navHome.css"


const navhome = () => {
  
  return <header className='headerHome'>
  <img className="img-logo" src={logo} alt="Logo do SideQuest"/>
  <nav className='navLanding'>
    <ul className="t1">
      <li><a href="">Encontrar serviços</a></li>
      <li><a href="">Trabalhe conosco</a></li>
    </ul>
    <ul className="t2">
    <Link to={"/login"}><li><a href="/login" >Login</a></li></Link>
      <Link to={"/cadastro"}><li className="btn-insc"><a href="/cadastro" className="tab-link link">inscreva-se</a></li></Link>
    </ul>
  </nav>
</header>
}
export default navhome