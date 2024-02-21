import React from 'react'
import logo from '../assets/logo_SideQuest.png'

const navhome = () => {
  
  return <header>
  <img class="img-logo" src={logo} alt="Logo do SideQuest"/>
  <nav>
    <ul class="t1">
      <li><a href="">Encontrar serviços</a></li>
      <li><a href="">Trabalhe conosco</a></li>
    </ul>
    <ul class="t2">
      <li><a href="/login" >Login</a></li>
      <li class="btn-insc"><a href="/cadastro" class="tab-link link">inscreva-se</a></li>
    </ul>

  </nav>
</header>
}
export default navhome
