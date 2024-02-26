import React from 'react'
import imgLogo from '../assets/logo_SideQuest.png'

import "../styles/header.css"
const header = () => {
  return (
    <div>
     <header>
        <img class="img-logo" src={imgLogo} alt="Logo do SideQuest"/>
        <div class="notificacao">
            <i class="fa-solid fa-bell"></i>
        </div>
    </header>
    </div>
  )
}

export default header
