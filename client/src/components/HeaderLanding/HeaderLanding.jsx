import React, {useState, useContext} from "react";
import logo from "../..//assets/logo_SideQuest.png";
import { Link } from "react-router-dom";
import "./HeaderLanding.css";
import { setIsSignUpActive, useIsSignUpActive } from "./singUpState";
export const HeaderLanding = () => {
  const isSignUpActive = useIsSignUpActive();

  const handleLoginClick = (isSignUpActiveValue) => {
    setIsSignUpActive(isSignUpActiveValue);
  };

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };


  return (
    <header className="containerNavHome">
      <nav className="navHomenav">
        <ul className="navHomeUl">
          <li className="navHomeLi">
            <img class="img-logo" src={logo} alt="Logo do SideQuest" />
          </li>
          <li className="navHomeLi">
            <a href="" className="navHomeA">
              Encontrar serviços
            </a>
          </li>
          <li className="navHomeLi">
            <a href="/landingProfissional"><Link to={"/landingProfissional"}>Trabalhe conosco</Link></a>
          </li>
          <div className="subContainerNavHome">
            <li className="navHomeLi white">
              <a href="/login">
                <Link to={"/login"} onClick={handleSignInClick}>Login</Link>
              </a>
            </li>
            <li class="navHomeLi btnNavHome">
              <a href="/login" class="tab-link link">
                <Link to={"/login"} onClick={handleSignUpClick}>Inscreva-se</Link>
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};
