const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const tokenConfirmacao = require('../../tools/createToken')
const smtpconfig = require('../../config/smtp')
const controller_Pro = require('./Querys/proQuerys')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const validator = require("validator");


let globalemail;
let globaltoken;
const createToken = (id_cliente) => {
  const jwtKey = crypto.randomBytes(64).toString('hex'); // Gerar uma chave JWT aleatória
  const jwtSecret = crypto.createHash('sha512').update(id_cliente + jwtKey).digest('hex'); // Criar um token usando SHA-512

  return jwt.sign({id_cliente}, jwtSecret, {expiresIn: "3d"})
};

exports.registerPro = async (req, res) => {

    try {
      const { name, email, cpf, senha, senhaConfirm } = req.body;
      
      console.log(name, email, cpf, senha, senhaConfirm)
      if (!name || !email || !cpf || !senha || !senhaConfirm){
        console.log("a")
        return res.status(400).json({error:"Preencha todos os campos" });
      }
      const cpfNumerico = cpf.replace(/\D/g, '');
     
      const emailResults = await controller_Pro.findEmailProfissional({
        params: { cd_emailProfissional: email }
      });

           
    globalemail = email;
    globalCpf = cpfNumerico;
  
      if (emailResults.length > 0) {
        return res.status(400).json({ error: 'Email inválido ou já está em uso'})
      } else if (senha !== senhaConfirm) {
        return res.status(400).json({ error: 'As senhas estão incorretas' });
      }
  
      const cpfResults = await controller_Pro.findcpfProfissional({
        params: { cd_cpfProfissional: cpfNumerico }
      });

      if (cpfResults.length > 0) {
        return res.status(400).json({ error: 'Alguns desses dados estão incorretos ou estão sendo utilizados'});
      }
      
      // Hash da senha 
      let hash = await bcrypt.hash(senha, 8);
  
      console.log(cpfNumerico)
      const token = tokenConfirmacao.generateEmailConfirmationToken();
      globaltoken = token
      // Inserir novo cliente
      console.log(globaltoken)
      
    await controller_Pro.insertProfissional({
      params: { nm_profissional: name, cd_emailProfissional: email, cd_cpfProfissional: cpfNumerico, cd_senhaProfissional: hash }
    });

      const htmlContent = `
      <html>

    <head>
        <style>
            /* Adicione seu CSS aqui */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .titulo-confirme-email {
                font-size: 40px;
                color: #3cbc8c;
            }

            .desc-confirme-email {
                font-size: 20px;
            }

            .btn-confirme-email {
                border: none;
                padding: 20px;
                background-color: #3cbc8c;
                border-radius: 50px;
                transition: all .25s ease-in-out;

                a {
                    text-decoration: none;
                    color: white;
                    font-size: 20px;
                }
            }

            .btn-confirme-email:hover {
                background-color: #144474;
            }
        </style>
    </head>

    <body>
        <h1 class="titulo-confirme-email">Confirme seu Email</h1>
        <p class="desc-confirme-email">Clique no botão abaixo para confirmar seu email. Você será redirecionado para outra página</p>
        <button class="btn-confirme-email"><a href="http://localhost:5173/validaEmailProfissional?token=${token}">Confirmar E-mail</a></button>
    </body>
    </html>
    `;
  
      const transporter = nodemailer.createTransport(smtpconfig);
        
      async function sendmail() {
        try {
          const mailSend = await transporter.sendMail({
            html: htmlContent,
            subject: 'confirme seu email na SideQuest',
            from: 'SideQuest <Sidequest.plataform@outlook.com>',
            to: email
          })
          console.log(mailSend);
        } catch(error) {
          console.error(`erro ao enviar email ${error}`)
        }
      }
      sendmail();
      return res.status(200).json({ message: 'Verifique sua caixa de email para confirma-lo' });
     
    } catch (error) {
      console.error(error);
      return res.render('error404');
    }
  };

  exports.loginPro = async (req, res) =>{
    try {
      var { email, senha } = req.body;
  
      const user = await controller_Pro.findEmailProfissional({
        params: { cd_emailProfissional: email },
      });
  
      if (user.length == 0) {
        return res.status(400).json({ error: "Email ou senha incorretos" });
      }
  
      const match = await bcrypt.compare(senha, user[0].cd_senhaProfissional);
  
      if (!match) {
        return res.status(400).json({ error: "Email ou senha incorretos" });
      }
  
      const tokenconfirmed = await controller_Pro.findtokenProfissional({
        params: { cd_emailProfissional: email },
      });
  
      console.log("valor do token " + tokenconfirmed);
  
      if (!tokenconfirmed) {
        return res
          .status(400)
          .json({
            message: "Confirme seu email, verifique na sua caixa de entrada",
          });
      } else {
        const login = await controller_Pro.bindCookieBypkProfissonal({ params: { cd_emailProfissional: email }});
        const secret = createToken(login.id_cliente)
        return res.status(200).json({ id_profissional: login.id_profissional, email: login.cd_emailProfissional, name: login.nm_profissional, secret});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  exports.validaEmailPro = async (req, res) => {
    try {
      const { token } = req.params;
      console.log(globaltoken);
      if (globalemail) {
        controller_Pro.updateTokenByEmail({
          params: { cd_tokenProfissional: globaltoken, cd_emailProfissional: globalemail },
        });
        return res
          .status(200)
          .json({ message: "E-mail confirmado com sucesso!" });
      } else {
        console.error("Token inválido");
        return res.status(200).json({ message: "acesso não autorizado token invalido" });
      }
    } catch (error) {
      console.error(error);
      return res.status(200).json({ message: "erro interno do servidor" });
    }
  };

  exports.cardservico = async (req, res) => {
    const populationService = await controller_Pro.findServices();
    console.log(populationService)
    res.status(200).json(populationService)
  }

  exports.findAllUsers = async (req, res) =>{
    try{
        const allUser = await controller_Pro.selectallUsers();
      res.status(200).json(allUser)
    }catch(error){
      console.log(error);
      res.status(500).json(error);
    }
  }

  exports.findUser = async (req, res) =>{
    const {idCliente} = req.params;
  
    try{
        const userInfo = await controller_Pro.selectInfoCliente({
      params: { id_cliente:  idCliente},  
    });
      
      res.status(200).json(userInfo)
    }catch(error){
      console.log(error);
      res.status(500).json(error);
    }
  }