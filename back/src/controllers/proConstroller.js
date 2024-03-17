const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const tokenConfirmacao = require('../../tools/createToken')
const smtpconfig = require('../../config/smtp')
const controller_Pro = require('./Querys/proQuerys')

exports.registerPro = async (req, res) => {

    try {
      const { name, email, cpf, senha, senhaConfirm } = req.body;
      const cpfNumerico = cpf.replace(/\D/g, '');
      console.log(name, email, cpf, senha, senhaConfirm)
     
      const emailResults = await controller_Pro.findEmailProfissional({
        params: { cd_emailProfissional: email }
      });
  
        globalemail = email 
  
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
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              font-weight: bold;
              text-decoration: none;
              background-color: #3498db;
              color: #ffffff;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <h1>Confirme seu Email</h1>
          <p>Clique no botão abaixo para confirmar seu email profissional. Você será redirecionado para outra página</p>
          <a href="http://localhost:5000/confirmarEmail?token=${token}">Confirmar E-mail</a>
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