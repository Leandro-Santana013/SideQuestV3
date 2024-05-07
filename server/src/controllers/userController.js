const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const tokenConfirmacao = require("../../tools/createToken");
const smtpconfig = require("../../config/smtp");
const controller_User = require("./Querys/userQuerys");
const validator = require("validator");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Buffer = require('buffer').Buffer;


let globalemail;
let globaltoken;
let globalCpf;

const createToken = (id_cliente) => {
  const jwtKey = crypto.randomBytes(64).toString('hex'); // Gerar uma chave JWT aleatória
  const jwtSecret = crypto.createHash('sha512').update(id_cliente + jwtKey).digest('hex'); // Criar um token usando SHA-512

  return jwt.sign({ id_cliente }, jwtSecret, { expiresIn: "3d" })
};

exports.register = async (req, res) => {
  try {
    const { name, email, cpf, senha, senhaConfirm } = req.body;
    console.log(name, email, cpf, senha, senhaConfirm)
    if (!name || !email || !cpf || !senha || !senhaConfirm) {
      console.log("a")
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const cpfNumerico = cpf.replace(/\D/g, "");
    console.log(cpfNumerico)

    const emailResults = await controller_User.findEmailCliente({
      params: { cd_emailCliente: email },
    });

    globalemail = email;
    globalCpf = cpfNumerico;

    if (emailResults.length > 0) {
      console.log("b")
      return res.status(400).json({ error: "Email inválido ou já está em uso" });
    } else if (senha !== senhaConfirm) {
      return res.status(400).json({ error: "As senhas estão incorretas" });
    }
    if (!validator.isStrongPassword(senha && senhaConfirm)) {
      console.log("c")
      return res
        .status(400)
        .json({ error: "As senhas näo são seguras o suficentes" });
    }

    const cpfResults = await controller_User.findcpfCliente({
      params: { cd_cpfCliente: cpfNumerico },
    });

    if (cpfResults.length > 0) {
      console.log("d")
      return res.status(400).json({ error: "Alguns dos dados já estão sendo utilizado" });
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
    console.log("sucess")
    console.log(user.id_cliente, name, email, cpfNumerico, secret)
    return res.status(200).json({ message: "Verifique sua caixa de email", userta: user.id_cliente, name, email, cpfNumerico, secret });
  } catch (error) {
    console.error(error);
    return res.render("error404");
  }
};

exports.login = async (req, res) => {
  try {
    var { email, senha } = req.body;
    console.log( email, senha)

    const user = await controller_User.findEmailCliente({
      params: { cd_emailCliente: email },
    });

    if (user.length == 0) {
      return res.status(400).json({ error: "Email ou senha incorretos" });
    }

    const match = await bcrypt.compare(senha, user[0].cd_senhaCliente);

    if (!match) {
      return res.status(400).json({ error: "Email ou senha incorretos" });
    }

    const tokenconfirmed = await controller_User.findtokenCliente({
      params: { cd_emailCliente: email },
    });

    console.log("valor do token " + tokenconfirmed);

    if (!tokenconfirmed) {
      return res.status(400).json({
        error: "Confirme seu email, verifique na sua caixa de entrada",
      });
    } else {
      const login = await controller_User.bindCookieBypkCliente({
        params: { cd_emailCliente: email },
      });
      const secret = createToken(login.id_cliente)
      delete login.cd_cpfCliente
      delete login.cd_senhaCliente
     
      console.log(login)
      return res
        .status(200)
        .json(login);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
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
      categoria,
      idCliente,
      email,
      imagens
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
      categoria,
      idCliente,
      email,
    );

    if (!cep) {
      return res.status(400).json({ error: "Insira o CEP corretamente", formstatus: 2 });
    }

    if (!titulo && !dsServico && !categoria) {
      return res.status(400).json({ error: "Insira as informações corretamente", formstatus: 1 });
    };

    if (!cep &&
      !uf_localidade &&
      !logradouro &&
      !bairro &&
      !nmrResidencia) {
      return res.status(400).json({ error: "Insira as informações corretamente", formstatus: 2 });
    }

    let imageBuffer;
    if (imagens) {
      imageBuffer = Buffer.from(imagens, 'base64');
      console.log(imageBuffer)
    }

    var partes = uf_localidade.split(" - ");
    var estado = partes[0];
    var cidade = partes[1];
    console.log(estado, cidade);

    const categoriaInstance = await controller_User.selectCategoriaescolhida({
      params: { ds_categoria: categoria },
    });

    if (categoriaInstance === 0)
      return res.status(400).json({ error: "categoria não selecionada", formstatus: 1 });

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
          img_servico: imageBuffer ? imageBuffer : null,
        },
      });
    } catch (error) {
      console.log(`erro interno no servidor ${error}`);
    }

    return res.status(200).json({ message: "Serviço postado com sucesso" });
  } catch (error) {
    console.error(error);
  }
};

exports.selectCategoria = async (req, res) => {
  const categoria = await controller_User.selectCategorias();
  console.log(categoria);
  res.status(200).json(categoria);
};

exports.profissionalCard = async (req, res) => {
  const { Filtros } = req.body;

  const populationProfissional = await controller_User.selectProfissional();
  console.log(populationProfissional)
  res.status(200).json(populationProfissional);


};

exports.selectinfos = async (req, res) => {
  const { idCliente } = req.body;
  const clientinfo = await controller_User.selectInfocliente({
    params: { id_cliente: idCliente },
  });
  console.log(clientinfo);
  res.status(200).json(clientinfo);
};

/****************************************/
/* atualizar os dados da conta do usuário cliente (user) */

exports.updateInfoUser = async (req, res) => {
  const { id_cliente, name, email, numero, foto } = req.body;
  try {
    console.log(id_cliente, name, email, numero, foto)
    // Converter base64 para Blob
    const clientinfo = await controller_User.selectInfocliente({
      params: { id_cliente: id_cliente },
    });
   

    const clientinfoupdated = await controller_User.updateInfoCli({
      params: {
        id_cliente: id_cliente,
        nm_cliente: name ? name : clientinfo.nm_cliente,
        cd_emailCliente: email ? email : clientinfo.cd_emailCliente,
        img_cliente: foto ? foto : clientinfo.img_cliente
      }
    });

    const client = await controller_User.selectInfocliente({
      params: { id_cliente: id_cliente },
    });
    delete client.cd_cpfCliente;
    delete client.cd_senhaCliente;
    
    return res.status(200).json(client);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}


/****************************************/
exports.concluirCad = async (req, res) => {
  const {telefone, data, sexo, cep, numeroResidencia, complemento, id_cliente, uf, localidade, logradouro, bairro} = req.body
  if(!telefone || !data || !sexo || !cep || !numeroResidencia || !complemento  || !id_cliente  || !uf || !localidade || !logradouro || !bairro)
     res.status(400).json({error: 'preencha todas as informações'})
try{

  const birthDate = new Date(data);
const today = new Date();

let age = today.getFullYear() - birthDate.getFullYear();

const monthDiff = today.getMonth() - birthDate.getMonth();

if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;  
}


  
       const userReset = await controller_User.updateInfoCliente({
        params: {
          id_cliente: id_cliente,
          qt_idadeCliente: age,
          sg_sexoCliente: sexo,
          nmr_telefoneCliente: telefone
       }
      })
      
        const cdCidade = await controller_User.selectCidadeAdress({
          params: { nm_cidade: localidade, sg_estado: uf }})


          const enderecoInstance = await controller_User.CreateadressService({
            params: {
              id_cliente: id_cliente,
              id_cidade: cdCidade.id_cidade,
              nm_logradouro: logradouro,
              cd_cep: cep,
              nm_bairro: bairro,
              nmr_casa: numeroResidencia,
              end_principal: true
            },
          });
          res.status(200).json(enderecoInstance)
        }catch(error){
          res.status(500).json({error: "erro interno no servidor"})
        }
      }
      
exports.findPro = async (req, res) =>{
  const {idProfissional} = req.params;

  try{
      const proInfo = await controller_User.selectInfoProfissional({
    params: { id_profissional:  idProfissional},  
  });
    
    res.status(200).json(proInfo)
  }catch(error){
    console.log(error);
    res.status(500).json(error);
  }
}


exports.findAllProfissionais = async (req, res) =>{
  try{
      const allPro = await controller_User.selectallprofissionais();
    res.status(200).json(allPro)
  }catch(error){
    console.log(error);
    res.status(500).json(error);
  }
}