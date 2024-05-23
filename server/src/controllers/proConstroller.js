const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const tokenConfirmacao = require("../../tools/createToken");
const smtpconfig = require("../../config/smtp");
const controller_Pro = require("./Querys/proQuerys");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const validator = require("validator");

let globalemail;
let globaltoken;
const createToken = (id_cliente) => {
  const jwtKey = crypto.randomBytes(64).toString("hex"); // Gerar uma chave JWT aleatória
  const jwtSecret = crypto
    .createHash("sha512")
    .update(id_cliente + jwtKey)
    .digest("hex"); // Criar um token usando SHA-512

  return jwt.sign({ id_cliente }, jwtSecret, { expiresIn: "3d" });
};

exports.registerPro = async (req, res) => {
  try {
    const { name, email, cpf, senha, senhaConfirm } = req.body;

    console.log(name, email, cpf, senha, senhaConfirm);
    if (!name || !email || !cpf || !senha || !senhaConfirm) {
      console.log("a");
      return res.status(400).json({ error: "Preencha todos os campos" });
    }
    const cpfNumerico = cpf.replace(/\D/g, "");

    const emailResults = await controller_Pro.findEmailProfissional({
      params: { cd_emailProfissional: email },
    });

    globalemail = email;
    globalCpf = cpfNumerico;

    if (emailResults.length > 0) {
      return res
        .status(400)
        .json({ error: "Email inválido ou já está em uso" });
    } else if (senha !== senhaConfirm) {
      return res.status(400).json({ error: "As senhas estão incorretas" });
    }

    const cpfResults = await controller_Pro.findcpfProfissional({
      params: { cd_cpfProfissional: cpfNumerico },
    });

    if (cpfResults.length > 0) {
      return res
        .status(400)
        .json({
          error:
            "Alguns desses dados estão incorretos ou estão sendo utilizados",
        });
    }

    // Hash da senha
    let hash = await bcrypt.hash(senha, 8);

    console.log(cpfNumerico);
    const token = tokenConfirmacao.generateEmailConfirmationToken();
    globaltoken = token;
    // Inserir novo cliente
    console.log(globaltoken);

    await controller_Pro.insertProfissional({
      params: {
        nm_profissional: name,
        cd_emailProfissional: email,
        cd_cpfProfissional: cpfNumerico,
        cd_senhaProfissional: hash,
      },
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
          subject: "confirme seu email na SideQuest",
          from: "SideQuest <Sidequest.plataform@outlook.com>",
          to: email,
        });
        console.log(mailSend);
      } catch (error) {
        console.error(`erro ao enviar email ${error}`);
      }
    }
    sendmail();
    return res
      .status(200)
      .json({ message: "Verifique sua caixa de email para confirma-lo" });
  } catch (error) {
    console.error(error);
  }
};

(exports.loginPro = async (req, res) => {
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
      return res.status(400).json({
        error: "Confirme seu email, verifique na sua caixa de entrada",
      });
    } else {
      const login = await controller_Pro.bindCookieBypkProfissonal({
        params: { cd_emailProfissional: email },
      });
      const secret = createToken(login.id_cliente);
      return res.status(200).json(login);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}),
  (exports.validaEmailPro = async (req, res) => {
    try {
      const { token } = req.params;
      console.log("penis pinto", globaltoken, globalemail);
      if (globalemail) {
        controller_Pro.updateTokenByEmail({
          params: {
            cd_tokenProfissional: globaltoken,
            cd_emailProfissional: globalemail,
          },
        });
        return res
          .status(200)
          .json({ message: "E-mail confirmado com sucesso!" });
      } else {
        console.error("Token inválido");
        return res
          .status(200)
          .json({ message: "acesso não autorizado token invalido" });
      }
    } catch (error) {
      console.error(error);
      return res.status(200).json({ message: "erro interno do servidor" });
    }
  });

const calcularDiferencaTempo = (dataPostagem) => {
  const dataAtual = new Date();
  const diffTempo = dataAtual - new Date(dataPostagem);

  const umMinuto = 60 * 1000;
  const umaHora = umMinuto * 60;
  const umDia = umaHora * 24;
  const umaSemana = umDia * 7;
  const umMes = umDia * 30; // Aproximadamente 30 dias

  if (diffTempo < umMinuto) {
    return "Menos de 1 minuto atrás";
  } else if (diffTempo < umaHora) {
    return Math.floor(diffTempo / umMinuto) + " minutos atrás";
  } else if (diffTempo < umDia) {
    return Math.floor(diffTempo / umaHora) + " horas atrás";
  } else if (diffTempo < umaSemana) {
    return Math.floor(diffTempo / umDia) + " dias atrás";
  } else if (diffTempo < umMes) {
    return Math.floor(diffTempo / umDia / 30) + " meses atrás";
  } else {
    return Math.floor(diffTempo / umaSemana) + " semanas atrás";
  }
};

exports.cardservico = async (req, res) => {
  const { id_profissional } = req.params
  console.log(id_profissional)
  const populationService = await controller_Pro.findServices({
    params:{
      id_profissional: id_profissional
    }
});
  const servicosComDiferencaTempo = populationService.map((servico) => ({
    ...servico,
    diferencaTempo: calcularDiferencaTempo(servico.tm_postagem),
  }));

  res.status(200).json(servicosComDiferencaTempo);
};

exports.visuService = async (req, res) => {
  try {
    const { id_servico } = req.params;
    console.log(id_servico);

    // Busque o serviço usando o controlador
    const populationService = await controller_Pro.findService({
      params: { id_postagemServico: id_servico },
    });
    console.log(populationService);

    // Calcule a diferença de tempo
    const diferencaTempo = calcularDiferencaTempo(
      populationService.tm_postagem
    );

    // Adicione a diferença de tempo ao objeto
    populationService.diferencaTempo = diferencaTempo;

    console.log(populationService);

    // Envie a resposta com os serviços modificados
    res.status(200).json(populationService);
  } catch (error) {
    // Se houver um erro, envie uma resposta de erro
    console.error("Erro ao processar solicitação:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    const allUser = await controller_Pro.selectallUsers();
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.findUser = async (req, res) => {
  const { idCliente } = req.params;

  try {
    const userInfo = await controller_Pro.selectInfoCliente({
      params: { id_cliente: idCliente },
    });

    res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.updateInfoPro = async (req, res) => {
  const { id_profissional, name, email, numero, foto } = req.body;

  try {
    const clientinfo = await controller_Pro.infoprofissional({
      params: { id_profissional: id_profissional },
    });

    const clientinfoupdated = await controller_Pro.updateInfoPro({
      params: {
        id_profissional: id_profissional,
        nm_cliente: name ? name : clientinfo.nm_profissional,
        cd_emailCliente: email ? email : clientinfo.cd_emailProfissional,
        img_profissional: foto ? foto : clientinfo.img_profissional,
      },
    });

    const proselect = await controller_Pro.infoprofissional({
      params: { id_profissional: id_profissional },
    });

    console.log(proselect);

    return res.status(200).json(proselect);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
exports.concluirCad = async (req, res) => {
  const {
    id_profissional,
    bairro,
    categorias,
    cep,
    complemento,
    data,
    descricao,
    localidade,
    logradouro,
    numeroResidencia,
    sexo,
    telefone,
    uf,
  } = req.body;
  console.log(bairro,
    categorias,
    cep,
    complemento,
    data,
    descricao,
    localidade,
    logradouro,
    numeroResidencia,
    sexo,
    telefone,
    uf,)
  try {


    const pro = await controller_Pro.infoprofissional({
      params: { id_profissional: id_profissional },
    });

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

    const updatedPro = await controller_Pro.updatePro({
      params: {
        id_profissional: id_profissional,
        nmr_telefoneProfissional: telefone ? telefone : pro.nmr_telefoneProfissional,
        sg_sexoProfissional: sexo ? sexo : pro.sg_sexoProfissional,
        qt_idadeProfissional: age
      }
    }) 

    console.log("first updated", updatedPro)

    for (const categoria of categorias) {
      const { ds_categoria } = categoria;

      const cat = await controller_Pro.selectCat({
        params: {ds_categoria:ds_categoria}
      })
      console.log("cat", cat )
      
      if(cat){
        const insertCatPro = await controller_Pro.createcatPro({
          params: {id_profissional: id_profissional, id_categoria: cat[0].id_categoria}
        })
        console.log(insertCatPro)
      } else console.log("erro")
       
    }


    const cdCidade = await controller_Pro.selectCidadeAdress({
      params: { nm_cidade: localidade, sg_estado: uf },
    });

    console.log(cdCidade, "cd cidade")


    const enderecoInstance = await controller_Pro.createadresspro({
      params: {
        id_profissional: id_profissional,
        id_cidade: cdCidade.id_cidade,
        nm_logradouro: logradouro,
        cd_cep: cep,
        nm_bairro: bairro,
        nmr_casa: numeroResidencia,
        txt_complemento: complemento,	
        end_principal: true
      },
    });



    console.log("888", enderecoInstance)

    const Professional = await controller_Pro.infoprofissional({
      params: { id_profissional: id_profissional },
    });
    console.log(Professional)
    return res.status(200).json(Professional);
  } catch (error) {
    console.log(error);
  }
};
