const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const tokenConfirmacao = require("../../tools/createToken");
const smtpconfig = require("../../config/smtp");
const controller_User = require("./Querys/userQuerys");
const validator = require("validator");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let globalemail;
let globaltoken;
let globalCpf;

const createToken = (id_cliente) => {
  const jwtKey = crypto.randomBytes(64).toString('hex'); // Gerar uma chave JWT aleatória
  const jwtSecret = crypto.createHash('sha512').update(id_cliente + jwtKey).digest('hex'); // Criar um token usando SHA-512

  return jwt.sign({id_cliente}, jwtSecret, {expiresIn: "3d"})
};
exports.register = async (req, res) => {
  try {
    const { name, email, cpf, senha, senhaConfirm } = req.body;
    const cpfNumerico = cpf.replace(/\D/g, "");

    if (!name || !email || !cpfNumerico || !senha || !senhaConfirm)
      return res.status(200).json({ message: "preencha todos os campos" });

    const emailResults = await controller_User.findEmailCliente({
      params: { cd_emailCliente: email },
    });

    globalemail = email;
    globalCpf = cpfNumerico;

    if (emailResults.length > 0) {
      return res.status(200).json({
        message: "Email inválido ou já está em uso",
      });
    } else if (senha !== senhaConfirm) {
      return res.status(200).json({ message: "As senhas estão incorretas" });
    }
    if (!validator.isStrongPassword(senha && senhaConfirm)) {
      return res
        .status(200)
        .json({ message: "As senhas näo são seguras o suficentes" });
    }

    const cpfResults = await controller_User.findcpfCliente({
      params: { cd_cpfCliente: cpfNumerico },
    });

    if (cpfResults.length > 0) {
      return res.status(200).json({
        message: "Alguns dos dados já estão sendo utilizado",
      });
    }

    // Hash da senha
    let hash = await bcrypt.hash(senha, 8);

    const token = tokenConfirmacao.generateEmailConfirmationToken();
    globaltoken = token;
    // Inserir novo cliente

   const user = await controller_User.insertClient({
      params: {
        nm_cliente: name,
        cd_emailCliente: email,
        cd_cpfCliente: cpfNumerico,
        cd_senhaCliente: hash,
      },
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-br">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirme seu E-mail</title>
    </head>
    
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center;">
        <h1 style="font-size: 40px; color: #3cbc8c;">Confirme seu E-mail</h1>
        <p style="font-size: 20px;">Clique no botão abaixo para confirmar seu e-mail. Você será redirecionado para outra página.</p>
        <table cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
                <td bgcolor="#3cbc8c" style="border-radius: 50px;">
                    <a href="http://localhost:5173/validaEmail?token=${token}" style="color: white; text-decoration: none; display: inline-block; padding: 20px; font-size: 20px;">Confirmar E-mail</a>
                </td>
            </tr>
        </table>
    </body>
    
    </html>
    `;

    const transporter = nodemailer.createTransport(smtpconfig);

    async function sendmail() {
      try {
        const mailSend = await transporter.sendMail({
          html: htmlContent,
          subject: "confirme seu email na SideQuest",
          from: "SideQuest <Sidequest.plataform@outlook.com>",
          to: email,
        });
        console.log(mailSend);
      } catch (err) {
        console.error(`erro ao enviar email ${err}`);
      }
    }
    sendmail();
    const secret = createToken(user.id_cliente)
    console.log(user.id_cliente, name, email, cpfNumerico, secret)
    return res.status(202).json({ message: "Verifique sua caixa de email", userta: user.id_cliente, name, email, cpfNumerico, secret});
  } catch (error) {
    console.error(error);
    return res.render("error404");
  }
};

exports.login = async (req, res) => {
  try {
    var { email, senha } = req.body;

    const user = await controller_User.findEmailCliente({
      params: { cd_emailCliente: email },
    });

    if (user.length == 0) {
      return res.status(200).json({ message: "Email ou senha incorretos" });
    }

    const match = await bcrypt.compare(senha, user[0].cd_senhaCliente);

    if (!match) {
      return res.status(200).json({ message: "Email ou senha incorretos" });
    }

    const tokenconfirmed = await controller_User.findtokenCliente({
      params: { cd_emailCliente: email },
    });

    console.log("valor do token " + tokenconfirmed);

    if (!tokenconfirmed) {
      return res.status(200).json({
        message: "Confirme seu email, verifique na sua caixa de entrada",
      });
    } else {
      const cookie = await controller_User.bindCookieBypkCliente({
        params: { cd_emailCliente: email },
      });
      return res
        .status(201)
        .json({ id_cliente: cookie.id_cliente, email: cookie.cd_emailCliente });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor"  });
  }
};

exports.validaEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    if (globalemail) {
      controller_User.updateTokenByEmail({
        params: { cd_tokenCliente: globaltoken, cd_emailCliente: globalemail },
      });
      return res
        .status(200)
        .json({ message: "E-mail confirmado com sucesso!" });
    } else {
      console.error("Token inválido");
      return res
        .status(200)
        .json({ message: "Acesso não autorizado token invalido" });
    }
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "Erro interno do servidor" });
  }
};

exports.buscarattcls = async (req, res) => {
  const { idCliente, email } = req.body;

  const clientinfo = await controller_User.selectInfocliente({
    params: { id_cliente: idCliente, cd_emailCliente: email },
  });

  if (!clientinfo) {
    res.status(202).json();
  }
};

exports.postarServico = async (req, res) => {
  try {
    const {
      titulo,
      dsServico,
      cep,
      uf_localidade,
      logradouro,
      bairro,
      complemento,
      nmrResidencia,
      categoriaSelecionada,
      idCliente,
      email,
    } = req.body;
    console.log(
      titulo,
      dsServico,
      cep,
      uf_localidade,
      logradouro,
      bairro,
      complemento,
      nmrResidencia,
      categoriaSelecionada,
      idCliente,
      email
    );

    var partes = uf_localidade.split(" - ");
    var estado = partes[0];
    var cidade = partes[1];
    console.log(estado, cidade);

    const categoriaInstance = await controller_User.selectCategoriaescolhida({
      params: { ds_categoria: categoriaSelecionada },
    });

    console.log(categoriaInstance);

    const cdCidade = await controller_User.selectCidadeAdress({
      params: { nm_cidade: cidade, sg_estado: estado },
    });

    const enderecoInstance = await controller_User.CreateadressService({
      params: {
        id_cliente: idCliente,
        id_cidade: cdCidade.id_cidade,
        nm_logradouro: logradouro,
        cd_cep: cep,
        nm_bairro: bairro,
        nmr_casa: nmrResidencia,
      },
    });

    try {
      const servicoInstance = await controller_User.CreateServico({
        params: {
          id_cliente: idCliente,
          id_categoria: categoriaInstance.id_categoria,
          id_endereco: enderecoInstance.id_endereco,
          ds_servico: dsServico,
          ds_titulo: titulo,
        },
      });
    } catch (error) {
      console.log(`erro interno no servidor ${error}`);
    }
  } catch (error) {
    console.error(error);
    return res.json("erro");
  }
};

exports.selectCategoria = async (req, res) => {
  const categoria = await controller_User.selectCategorias();
  res.status(200).json(categoria);
};

exports.profissionalCard = async (req, res) => {
  const { Filtros } = req.body;

  const populationProfissional = await controller_User.selectProfissional();
  res.status(200).json(populationProfissional);

  switch (Filtros) {
    case 1:
      {
        populationProfissional = await controller_User;
      }
      break;
    default:
      break;
  }
};
exports.selectinfos = async (req, res) => {
  const { idCliente, email } = req.body;
  const clientinfo = await controller_User.selectInfocliente({
    params: { id_cliente: idCliente, cd_emailCliente: email },
  });
  console.log(clientinfo);
  res.status(200).json(clientinfo);
};