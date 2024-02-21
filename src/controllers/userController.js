const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const tokenConfirmacao = require('../tools/createToken')
const smtpconfig = require('../config/smtp')

function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        console.error(error)
      } else {
        resolve(results);
        console.log(results)
      }
    });
  });
}

let globalemail
let globaltoken

exports.register = async (req, res) => {

  try {

    const { name, email, cpf, senha, senhaConfirm } = req.body;
    const cpfNumerico = cpf.replace(/\D/g, '');
   
    const emailResults = await queryAsync("SELECT cd_emailCliente FROM tb_cliente WHERE cd_emailCliente = ?", [email]);

      globalemail = email

    if (emailResults.length > 0) {
      return res.render('cadastro', {
        message: 'Este Email é inválido ou já está em uso'
      });
    } else if (senha !== senhaConfirm) {
      return res.render('cadastro', {
        message: 'As senhas não estão corretas'
      });
    }

    const cpfResults = await queryAsync("SELECT cd_cpfCliente FROM tb_cliente WHERE cd_cpfCliente = ?", [cpfNumerico]);

    if (cpfResults.length > 0) {
      return res.render('cadastro', {
        message: 'Alguns desses dados estão incorretos ou estão sendo utilizados'
      });
    }

    // Hash da senha
    let hash = await bcrypt.hash(senha, 8);

    console.log(cpfNumerico)
    const token = tokenConfirmacao.generateEmailConfirmationToken();
    globaltoken = token
    // Inserir novo cliente
    await queryAsync('INSERT INTO tb_cliente SET ?', { nm_cliente: name, cd_emailCliente: email, cd_cpfCliente: cpfNumerico, cd_senha: hash });
    
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
        <p>Clique no botão abaixo para confirmar seu email. Você será redirecionado para outra página</p>
        <a href="http://localhost:5000/confirmarEmail?token=${token}&email=${email}">Confirmar E-mail</a>
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

    return res.render('cadastro', {
      message: 'Verifique sua caixa de email para confirma-lo'
    });

  } catch (error) {
    console.error(error);
    return res.render('error404');
  }
};




exports.login = async (req, res) => {
  try {
    var { email, senha } = req.body;

    const user = await queryAsync("SELECT * FROM tb_cliente WHERE cd_emailCliente = ?", [email]);


    if (user.length === 0) {
      return res.render('login', {
        message: 'Email ou senha incorretos'
      });
    }

    const match = await bcrypt.compare(senha, user[0].cd_senha);

    if (!match) {
      return res.render('login', {
        message: 'Email ou senha incorretos'
      });
    }

    const tokenconfirmed = await queryAsync("SELECT * FROM tb_cliente where cd_token = ? ", [user[0].cd_token])
    if (tokenconfirmed.length === 0) {
      return res.render('login', {
        message: 'Confirme seu email, verifique na sua caixa de entrada'
      });
    }

    return res.redirect('/homeCliente');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

exports.validaEmail = async (req, res) => {
  try {
    console.log(globalemail)
      if (globalemail) {
        
        await queryAsync('UPDATE tb_cliente SET cd_token = ? WHERE cd_emailCliente = ?', [globaltoken, globalemail]);
        
      return res.render('confirmarEmail', {
        message: 'E-mail confirmado com sucesso!'
      });
    } else {      
      console.error('Token inválido');
      return res.render('confirmarEmail', {
        message: 'Token inválido'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).render('error404');
  }
};

