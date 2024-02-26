    import React, { useState } from 'react';
    import img_cad from '../assets/cad-img.png';
    import img_logo from '../assets/sidequest_3.png';
    import axios from 'axios';
    
    

    const Cad = () => {
      const [isProfessional, setIsProfessional] = useState(true);
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        senha: '',
        senhaConfirm: '',
      });

      const toggleForm = () => {
        setIsProfessional((prevIsProfessional) => !prevIsProfessional);
      };
      const [message, setMessage] = useState(null);  
   
        
      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post('http://localhost:5000/auth/register', formData);

          setMessage(response.data.message);
         
        }  catch (error) {
          console.error('Erro ao cadastrar:', error);
          setMessage(error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.');
        }
        
      };

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      
      return (
        <div className="formlogin" class="tbodycad">
          <div className="forms">
            <div className="l-side">
              <img src={img_cad} alt="cad-img" />
            </div>
            <div className="r-side">
              <div className="content-logo">
                <img src={img_logo} alt="sidequest-logo" />
              </div>
              <div className="campos">
                <h2>Crie sua conta!</h2>
                <label className="btn-slide">
                  <input
                    type="checkbox"
                    id="toggleButton"
                    onChange={toggleForm}
                    checked={isProfessional}
                  />
                  <span className="slider"></span>
                </label>
                <form onSubmit={handleSubmit} className={isProfessional ? 'formCliente' : 'formProfi'}>
                <input placeholder="Digite seu nome" type="name" name="name"   value={formData.name} onChange={handleChange}/>
                        <input placeholder="Digite seu email" type="email" name="email" value={formData.email} onChange={handleChange}/>
                        <input placeholder="Digite seu CPF" type="text" id="cpfInput" name="cpf" value={formData.cpf}  onChange={handleChange}/>
                        <input placeholder="Digite uma senha" type="password" name="senha" value={formData.senha} onChange={handleChange}/>
                        <input placeholder="Confirme sua senha" type="password" name="senhaConfirm" value={formData.senhaConfirm} onChange={handleChange}/>
                        <button type="submit" class="btn-criar">Criar</button>
                </form>
                <div className="entre-google">
                  <div className="linha"></div>
                  <p>ou entre com o google</p>
                  <div className="linha"></div>
                </div>
              </div>
            </div>
          </div>
          {message && <div className="message">{message}</div>}  
          
        </div>
      );
    };

    export default Cad;