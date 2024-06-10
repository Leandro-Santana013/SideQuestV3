const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const tokenConfirmacao = require("../../tools/createToken");
const smtpconfig = require("../../config/smtp");
const controller_User = require("./Querys/userQuerys");
const validator = require("validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { response } = require("../../config/express");
const Buffer = require("buffer").Buffer;

let globalemail;
let globaltoken;
let globalCpf;

const createToken = (id_cliente) => {
  const jwtKey = crypto.randomBytes(64).toString("hex"); // Gerar uma chave JWT aleatória
  const jwtSecret = crypto
    .createHash("sha512")
    .update(id_cliente + jwtKey)
    .digest("hex"); // Criar um token usando SHA-512

  return jwt.sign({ id_cliente }, jwtSecret, { expiresIn: "3d" });
};

function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999") {
    return false;
  }

  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

exports.register = async (req, res) => {
  try {
    const { name, email, cpf, senha, senhaConfirm } = req.body;
    console.log(name, email, cpf, senha, senhaConfirm);
    if (!name || !email || !cpf || !senha || !senhaConfirm) {
      console.log("a");
      return res.status(400).json({ error: "Preencha todos os campos" });
    }
    if (!isValidCPF(cpf)) {
      console.log("CPF inválido");
      return res.status(400).json({ error: "CPF inválido" });
    }

    const cpfNumerico = cpf.replace(/\D/g, "");
    console.log(cpfNumerico);

    const emailResults = await controller_User.findEmailCliente({
      params: { cd_emailCliente: email },
    });

    globalemail = email;
    globalCpf = cpfNumerico;

    if (emailResults.length > 0) {
      console.log("b");
      return res
        .status(400)
        .json({ error: "Email inválido ou já está em uso" });
    } else if (senha !== senhaConfirm) {
      return res.status(400).json({ error: "As senhas estão incorretas" });
    }
    if (!validator.isStrongPassword(senha && senhaConfirm)) {
      console.log("c");
      return res
        .status(400)
        .json({ error: "As senhas näo são seguras o suficentes" });
    }

    const cpfResults = await controller_User.findcpfCliente({
      params: { cd_cpfCliente: cpfNumerico },
    });

    if (cpfResults.length > 0) {
      console.log("d");
      return res
        .status(400)
        .json({ error: "Alguns dos dados já estão sendo utilizado" });
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
    const secret = createToken(user.id_cliente);

    console.log(user.id_cliente, name, email, cpfNumerico, secret);
    return res.status(200).json({
      message: "Verifique sua caixa de email",
      userta: user.id_cliente,
      name,
      email,
      cpfNumerico,
      secret,
    });
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
      return res.status(400).json({ error: "Email ou senha incorretos" });
    }

    const match = await bcrypt.compare(senha, user[0].cd_senhaCliente);

    if (!match) {
      return res.status(400).json({ error: "Email ou senha incorretos" });
    }

    const tokenconfirmed = await controller_User.findtokenCliente({
      params: { cd_emailCliente: email },
    });

    if (!tokenconfirmed) {
      return res.status(400).json({
        error: "Confirme seu email, verifique na sua caixa de entrada",
      });
    } else {
      const clienteuser = await controller_User.bindCookieBypkCliente({
        params: { cd_emailCliente: email },
      });

      const localizacaoprincipal = await controller_User.selectLocalcli({
        params: { id_cliente: clienteuser.id_cliente, end_principal: true },
      });
      if (localizacaoprincipal) {
        const cdCidadeestate = await controller_User.selectCidadeAdress({
          params: { id_cidade: localizacaoprincipal.id_cidade },
        });
        localizacaoprincipal.uf_localidade = `${cdCidadeestate.sg_estado} - ${cdCidadeestate.nm_cidade}`;
      }

      return res.status(200).json({ clienteuser, localizacaoprincipal });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.validaEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (globalemail) {
      controller_User.updateTokenByEmail({
        params: { cd_tokenCliente: globaltoken, cd_emailCliente: globalemail },
      });
      return res
        .status(200)
        .json({ message: "E-mail confirmado com sucesso!" });
    } else {
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
      imagens,
      id_profissional,
    } = req.body;

    const datanow = Date.now();

    if (!cep) {
      return res
        .status(400)
        .json({ error: "Insira o CEP corretamente", formstatus: 2 });
    }

    if (!titulo && !dsServico && !categoria) {
      return res
        .status(400)
        .json({ error: "Insira as informações corretamente", formstatus: 1 });
    }

    if (!cep && !uf_localidade && !logradouro && !bairro && !nmrResidencia) {
      return res
        .status(400)
        .json({ error: "Insira as informações corretamente", formstatus: 2 });
    }

    let imageBuffer;
    if (imagens) {
      imageBuffer = Buffer.from(imagens, "base64");
    }

    var partes = uf_localidade.split(" - ");
    var estado = partes[0];
    var cidade = partes[1];

    const categoriaInstance = await controller_User.selectCategoriaescolhida({
      params: { ds_categoria: categoria },
    });

    if (categoriaInstance === 0)
      return res
        .status(400)
        .json({ error: "categoria não selecionada", formstatus: 1 });

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
          tm_postagem: datanow,
          pr_escolhido: id_profissional ? id_profissional : null,
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

exports.postarServicoLoc = async (req, res) => {
  try {
    const { idCliente, location, servico } = req.body;

    const datanow = new Date();

    console.log(servico)

    if (!servico.titulo || !servico.dsServico || !servico.categoria) {
      return res
        .status(400)
        .json({ error: "Insira as informações corretamente", formstatus: 1 });
    }

    const categoriaInstance = await controller_User.selectCategoriaescolhida({
      params: { ds_categoria: servico.categoria },
    });

    if (categoriaInstance === 0) {
      return res
        .status(400)
        .json({ error: "categoria não selecionada", formstatus: 1 });
    }

    try {
      const servicoInstance = await controller_User.CreateServico({
        params: {
          id_cliente: idCliente,
          id_categoria: categoriaInstance.id_categoria,
          id_endereco: location,
          ds_servico: servico.dsServico,
          ds_titulo: servico.titulo,
          img_servico: servico.imagens,
          tm_postagem: datanow,
          pr_escolhido: servico.id_profissional
            ? servico.id_profissional
            : null,
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

  res.status(200).json(categoria);
};

exports.profissionalCard = async (req, res) => {
  const { Filtros } = req.body;

  const populationProfissional = await controller_User.selectProfissional();

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
  const {
    id_cliente,
    name,
    email,
    numero,
    foto,
    cd_cep,
    uf_localidade,
    nm_bairro,
    nm_logradouro,
    nmr_casa,
    complemento,
  } = req.body;
  try {
    // Converter base64 para Blob
    const clientinfo = await controller_User.selectInfocliente({
      params: { id_cliente: id_cliente },
    });

    const localizacaoinfo = await controller_User.selectLocalcli({
      params: { id_cliente: clientinfo.id_cliente, end_principal: true },
    });

    let partes, estado, cidade, cdCidade, cdCidadeestate;

    if (uf_localidade) {
      partes = uf_localidade.split(" - ");
      estado = partes[0];
      cidade = partes[1];

      cdCidade = await controller_User.selectCidadeAdress({
        params: { nm_cidade: cidade, sg_estado: estado },
      });
    } 
    

    const clientinfoupdated = await controller_User.updateInfoCli({
      params: {
        id_cliente: id_cliente,
        nm_cliente: name ? name : clientinfo.nm_cliente,
        cd_emailCliente: email ? email : clientinfo.cd_emailCliente,
        img_cliente: foto ? foto : clientinfo.img_cliente,
        nmr_telefoneCliente: numero ? numero : clientinfo.nmr_telefoneCliente,
      },
    });
 
if(cd_cep || nm_bairro || nm_logradouro || nmr_casa || complemento){
    const updateAdressCli = await controller_User.updateAdressCli({
      params: {
        id_cliente: id_cliente,
        id_cidade: cdCidade ? cdCidade.id_cidade : localizacaoinfo.id_cidade ? localizacaoinfo.id_cidade : null,
        cd_cep: cd_cep ? cd_cep : localizacaoinfo.cd_cep ? localizacaoinfo.cd_cep : null,
        nm_bairro: nm_bairro ? nm_bairro : localizacaoinfo.nm_bairro ? localizacaoinfo.nm_bairro : null,
        nm_logradouro: nm_logradouro ? nm_logradouro : localizacaoinfo.nm_logradouro ? localizacaoinfo.nm_logradouro : null,
        nmr_casa: nmr_casa ? nmr_casa : localizacaoinfo.nmr_casa ? localizacaoinfo.nmr_casa : null,
        txt_complemento: complemento ? complemento : localizacaoinfo.txt_complemento ? localizacaoinfo.txt_complemento : null
      },
    });
  }

    const clienteuser = await controller_User.selectInfocliente({
      params: { id_cliente: id_cliente },
    });

    const localizacaoprincipal = await controller_User.selectLocalcli({
      params: { id_cliente: clienteuser.id_cliente, end_principal: true },
    });

    if (localizacaoprincipal) {
      const cdCidadeestate = await controller_User.selectCidadeAdress({
        params: { id_cidade: localizacaoprincipal.id_cidade },
      });
      localizacaoprincipal.uf_localidade = `${cdCidadeestate.sg_estado} - ${cdCidadeestate.nm_cidade}`;
    }

    return res.status(200).json({ clienteuser, localizacaoprincipal });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

/****************************************/
exports.concluirCad = async (req, res) => {
  const {
    telefone,
    data,
    sexo,
    cep,
    numeroResidencia,
    complemento,
    id_cliente,
    uf,
    localidade,
    logradouro,
    bairro,
  } = req.body;
  if (
    !telefone ||
    !data ||
    !sexo ||
    !cep ||
    !numeroResidencia ||
    !complemento ||
    !id_cliente ||
    !uf ||
    !localidade ||
    !logradouro ||
    !bairro
  )
    return res.status(400).json({ error: "preencha todas as informações" });
  try {
    const birthDate = new Date(data);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if(age < 18) return res.status(400).json({error: 'Idade inválida, você precisar ter 18 anos ou mais.', formstatus: 1})

    const userReset = await controller_User.updateInfoCliente({
      params: {
        id_cliente: id_cliente,
        qt_idadeCliente: age,
        sg_sexoCliente: sexo,
        nmr_telefoneCliente: telefone,
      },
    });

    const cdCidade = await controller_User.selectCidadeAdress({
      params: { nm_cidade: localidade, sg_estado: uf },
    });

    const enderecoInstance = await controller_User.createadresscli({
      params: {
        id_cliente: id_cliente,
        id_cidade: cdCidade.id_cidade,
        nm_logradouro: logradouro,
        cd_cep: cep,
        nm_bairro: bairro,
        nmr_casa: numeroResidencia,
        end_principal: true,
        txt_complemento: complemento,
      },
    });

    const clienteuser = await controller_User.selectInfocliente({
      params: { id_cliente: id_cliente },
    });

    const localizacaoprincipal = await controller_User.selectLocalcli({
      params: { id_cliente: id_cliente, end_principal: true },
    });
    if (localizacaoprincipal) {
      const cdCidadeestate = await controller_User.selectCidadeAdress({
        params: { id_cidade: localizacaoprincipal.id_cidade },
      });
      localizacaoprincipal.uf_localidade = `${cdCidadeestate.sg_estado} - ${cdCidadeestate.nm_cidade}`;
    }
    res.status(200).json({ clienteuser, localizacaoprincipal });
  } catch (error) {
    console.log("nananananna", error);
    res.status(500).json({ error: "erro interno no servidor" });
  }
};

exports.findPro = async (req, res) => {
  const { idProfissional } = req.params;

  try {
    const proInfo = await controller_User.selectInfoProfissional({
      params: { id_profissional: idProfissional },
    });

    res.status(200).json(proInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.findAllProfissionais = async (req, res) => {
  try {
    const allPro = await controller_User.selectallprofissionais();
    res.status(200).json(allPro);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.perfilpro = async (req, res) => {
  const { id_profissional } = req.params;

  try {
    const pt1 = await controller_User.queryPart1({
      params: { id_profissional: id_profissional },
    });
    const pro = pt1[0];

    const pt2 = await controller_User.queryPart2({
      params: { id_profissional: id_profissional },
    });

    const images = pt2[0].tb_profissionalProfileImgs;

    const pt3 = await controller_User.queryPart3({
      params: { id_profissional: id_profissional },
    });

    const comentarios = pt3;

    res.status(200).json({ pro, images, comentarios });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.fav = async (req, res) => {
  const { id_cliente, id_profissional, param } = req.body;

  const Pair = await controller_User.buscarfav({
    params: {
      id_profissional: id_profissional,
      id_cliente: id_cliente,
      param: param,
    },
  });
  res.status(200).json(Pair);
};

exports.getFavoritos = async (req, res) => {
  const id_cliente = Number(req.params.id_cliente);

  const favoritos = await controller_User.getfavs({
    params: { id_cliente: id_cliente },
  });

  res.status(200).json(favoritos);
};
exports.numService = async (req, res) => {
  const id_cliente = Number(req.params.id_cliente);

  const n = await controller_User.nservice({
    params: { id_cliente: id_cliente },
  });

  res.status(200).json(n);
};

exports.Service = async (req, res) => {
  const { id_cliente } = req.body;

  const n = await controller_User.Service({
    params: { id_cliente: id_cliente },
  });
  console.log(n, "type serv")

  res.status(200).json(n);
};

exports.ServicePend = async (req, res) => {
  const { id_cliente } = req.body;
  const n = await controller_User.ServicePend({
    params: { id_cliente: id_cliente },
  });

  res.status(200).json(n);
};
exports.Servicehistory = async (req, res) => {
  const { id_cliente } = req.body;
  const n = await controller_User.Servicehistory({
    params: { id_cliente: id_cliente },
  });

  res.status(200).json(n);
};

exports.resetPass = async (req, res) => {
  const { id, password, saveControll } = req.body;

  if (saveControll) {
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ error: "A senha näo é segura o suficente" });
    }

    const user = await controller_User.updateSenha({
      params: {
        id_cliente: id,
        cd_senhaCliente: password,
      },
    });
    return res
      .status(200)
      .json({ message: "Sua senha foi alterada com sucesso" });
  }

  const clienteuser = await controller_User.selectInfocliente({
    params: { id_cliente: id },
  });

  const match = await bcrypt.compare(password, clienteuser.cd_senhaCliente);

  if (!match) {
    return res.status(400).json();
  } else {
    return res.status(200).json(match);
  }
};

exports.delete = async (req, res) => {
  const id_cliente = Number(req.params.id_cliente);

  const clienteuser = await controller_User.selectInfocliente({
    params: { id_cliente: id_cliente},
  });
  const localizacaoprincipal = await controller_User.selectLocalcli({
    params: { id_cliente: id_cliente },
  });
  const serviceend = await controller_User.Service({
    params: { id_cliente: id_cliente },
  });
  const ServicePend = await controller_User.ServicePend({
    params: { id_cliente: id_cliente },
  });

  const favoritos = await controller_User.getfavs({
    params: { id_cliente: id_cliente },
  });


 
    if(serviceend.length > 0){
      console.log(serviceend, "aaaaaaaaaaaaaaaaaa")
       await controller_User.apagarService({
      params: { id_cliente: id_cliente },
    });
  }
  if(ServicePend.length > 0){
    await controller_User.apagarServicePend({
      params: { id_cliente: id_cliente },
    });
   
  } 
  if(favoritos.length > 0){
   console.log(favoritos)
     await controller_User.apagarfavoritoscliente({
    params:{ id_cliente: id_cliente}
  })
}
  if(localizacaoprincipal) controller_User.apagarLocalcli({
    params: { id_cliente: id_cliente},
  })

  if(clienteuser){ 
    console.log("a1", clienteuser)
    await controller_User.apagarInfocliente({
    params: { id_cliente: id_cliente},
  });
return res.status(200).json()
}
exports.concluirServico = async (req, res) => {
  const {id_confirmacaoServico, nmr_avaliacao, ds_servico} = req.body
  const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  
  const formattedDate = getFormattedDate();

  const inserindtermino = await controller_User.createTermino({
    params: {id_confirmacaoServico: id_confirmacaoServico, dt_terminoServico:formattedDate }
  })

  const insertavaliacao = await controller_User.createAvaliacao({
    params:{
      id_confirmacaoServico: id_confirmacaoServico,
      nmr_avaliacao:nmr_avaliacao,
      ds_servico:ds_servico
    }
  })
}

return res.status(200).json()
  
};