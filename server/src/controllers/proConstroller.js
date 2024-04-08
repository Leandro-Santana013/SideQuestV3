const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const tokenConfirmacao = require('../../tools/createToken')
const smtpconfig = require('../../config/smtp')
const controller_Pro = require('./Querys/proQuerys')


let globalemail;
let globaltoken;

exports.registerPro = async (req, res) => {

    try {
      const { name, email, cpf, senha, senhaConfirm } = req.body;
      const cpfNumerico = cpf.replace(/\D/g, '');
      console.log(name, email, cpf, senha, senhaConfirm)
     
      const emailResults = await controller_Pro.findEmailProfissional({
        params: { cd_emailProfissional: email }
      });

           
    globalemail = email;
    globalCpf = cpfNumerico;
  
      if (emailResults.length > 0) {
        return res.status(200).json({ message: 'Email inválido ou já está em uso'})
      } else if (senha !== senhaConfirm) {
        return res.status(200).json({ message: 'As senhas estão incorretas' });
      }
  
      const cpfResults = await controller_Pro.findcpfProfissional({
        params: { cd_cpfProfissional: cpfNumerico }
      });

      if (cpfResults.length > 0) {
        return res.status(200).json({ message: 'Alguns desses dados estão incorretos ou estão sendo utilizados'});
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
        <button class="btn-confirme-email"><a href="http://localhost:5173/validaEmail?token=${token}">Confirmar E-mail</a></button>
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
        } catch {
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
        return res.status(200).json({ message: "Email ou senha incorretos" });
      }
  
      const match = await bcrypt.compare(senha, user[0].cd_senhaProfissional);
  
      if (!match) {
        return res.status(200).json({ message: "Email ou senha incorretos" });
      }
  
      const tokenconfirmed = await controller_Pro.findtokenProfissional({
        params: { cd_emailProfissional: email },
      });
  
      console.log("valor do token " + tokenconfirmed);
  
      if (!tokenconfirmed) {
        return res
          .status(200)
          .json({
            message: "Confirme seu email, verifique na sua caixa de entrada",
          });
      } else {
        const cookie = await controller_Pro.bindCookieBypkProfissonal({ params: { cd_emailProfissional: email }});
        return res.status(201).json({ id_profissional: cookie.id_profissional, email: cookie.cd_emailProfissional});
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