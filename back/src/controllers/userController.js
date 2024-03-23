const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const tokenConfirmacao = require("../../tools/createToken");
const smtpconfig = require("../../config/smtp");
const controller_User = require("./Querys/userQuerys");



let globalemail;
let globaltoken;
let globalCpf;


exports.register = async (req, res) => {
  try {
    const { name, email, cpf, senha, senhaConfirm } = req.body;
    const cpfNumerico = cpf.replace(/\D/g, "");


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

    await controller_User.insertClient({
      params: {
        nm_cliente: name,
        cd_emailCliente: email,
        cd_cpfCliente: cpfNumerico,
        cd_senhaCliente: hash,
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
        <a href="http://localhost:5173/validaEmail?token=${token}">Confirmar E-mail</a>
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

    return res.status(202).json({ message: "Verifique sua caixa de email" });
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
      return res
        .status(200)
        .json({
          message: "Confirme seu email, verifique na sua caixa de entrada",
        });
    } else {
      return res.status(201).json();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
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
      return res.status(200).json({ message: "E-mail fudido" });
    }
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "E-mail fudido2" });
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
      nmrResidencia,
      categoriaSelecionada,
    } = req.body;
    console.log(nmrResidencia)
    var partes = uf_localidade.split(" - ");
    var estado = partes[0];
    var cidade = partes[1];
    console.log(estado, cidade)

    if (titulo.length < 10 || titulo.length > 50) {
      return res
        .status(200)
        .json({ message: "O titulo deve conter entre 10 e 50 caracteres" });
    }

    if (dsServico.length < 10 || dsServico.length > 500) {
      return res
        .status(200)
        .json({ message: "A descrição deve conter entre 10 e 500 caracteres" });
    }

    if (inicio > fim) {
      return res
        .status(200)
        .json({ message: "A data inicial deve ser menor que o final" });
    }

    if (valorinicial > valorfinal) {
      return res
        .status(200)
        .json({ message: "O valor inicial deve ser menor que o final" });
    }

    const categoriaInstance = await controller_User.selectCategoriaescolhida({
      params: { ds_categoria: categoriaSelecionada }
    });

    console.log(globalCpf)
    console.log(categoriaInstance)

    const cdCidade = await controller_User.selectCidadeAdress({
      params: { nm_cidade: cidade, sg_estado: estado }
    })
    const cdCliente = await controller_User.findCdCliente({
      params: { cd_cpfCliente: 23767673467 }
    })
    console.log(cdCliente)

    const enderecoInstance = await controller_User.CreateadressService({
      params: {
        id_cliente: cdCliente.id_cliente,
        cd_cidade: cdCidade.cd_cidade,
        nm_logradouro: logradouro,
        cd_cep: cep,
        nm_bairro: bairro,
        nmr_casa: nmrResidencia,
      },
    });



    try {
      const servicoInstance = await controller_User.CreateServico({
        params: {
          cd_cliente: cdCliente.cd_cliente,
          cd_categoria: categoriaInstance.cd_categoria,
          cd_endereco: enderecoInstance.cd_endereco,
          ds_servico: dsServico,
          ds_servico: titulo,
        }
      });
    } catch (error) {
      console.log(`Fudeu ${error}`)
    }



  } catch (error) {
    console.error(error);
    return res.json("erro");
  }
};
exports.selectCategoria = async (req, res) => {
  const categoria = await controller_User.selectCategorias();
  res.status(200).json(categoria);
}
exports.profissionalCard = async (req, res) => {
  const { Filtros } = req.body

  const populationProfissional = await controller_User.selectProfissional();
  console.log(populationProfissional)
  res.status(200).json(populationProfissional)

  switch(Filtros){
    case 1: {
      populationProfissional = await controller_User
    }
    break
    default: 
    
    break
  }
  
}
