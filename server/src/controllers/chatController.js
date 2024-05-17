const chatModel = require("../models/chatModel")
const controller_User = require("./Querys/userQuerys");
const controller_Pro = require('./Querys/proQuerys');


exports.createchat = async (req, res) => {
    const { id_cliente, id_profissional } = req.body;
    console.log(id_cliente, id_profissional);

    try {
        const chat = await chatModel.findOne({
            members: { $all: [id_cliente, id_profissional] }
        });

        const info = await controller_User.selectInfocliente({
            params: { id_cliente: id_cliente },
        });
        const infoProfissional = await controller_Pro.infoprofissional({
            params: { id_profissional: id_profissional },
        });
        console.log(info, infoProfissional);

        if (chat) return res.status(200).json({ chat, info, infoProfissional });

        const newChat = new chatModel({
            members: [id_cliente, id_profissional]
        });
        const response = await newChat.save();
        return res.status(200).json({ response, info, infoProfissional });

    } catch (error) {
        console.log("erro" + error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

exports.findUserChats = async (req, res) => {
    const idCliente = Number(req.params.id_cliente);
    console.log(idCliente, "===========a");
    let infoProfissional = [];

    try {
        const chats = await chatModel.find({
            members: { $in: [idCliente] }
        });
        console.log(chats, "============================================")
        if (chats.length > 0) {
            for (const chat of chats) {
                const secondMember = chat.members.find(member => member !== idCliente);
                if (secondMember) {
                    const info = await controller_Pro.infoprofissional({
                        params: { id_profissional: secondMember },
                    });
                    infoProfissional.push(info);
                }
            }
        }

        const infoCliente = await controller_User.selectInfocliente({
            params: { id_cliente: idCliente },
        });

        console.log("CHATS:", chats);
        console.log("Informação dos profissionais:", infoProfissional);
        console.log("Informação dos Cliente:", infoCliente);

        res.status(200).json({ chats, infoCliente, infoProfissional });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

exports.findUserChatsPro = async (req, res) => {
    const idProfissional = Number(req.params.id_profissional);
    console.log(idProfissional, "===========a");
    let infoCliente = [];

    try {
        const chats = await chatModel.find({
            members: { $in: [idProfissional] }
        });
        console.log(chats, "============================================")
        if (chats.length > 0) {
            for (const chat of chats) {
                const secondMember = chat.members.find(member => member !== idProfissional);
                if (secondMember) {
                    const info = await controller_User.selectInfocliente({
                        params: { id_cliente: secondMember },
                    });
                    infoCliente.push(info);
                }
            }
        }

        const infoProfissional = await controller_Pro.infoprofissional({
            params: { id_profissional: idProfissional },
        });

        console.log("CHATS:", chats);
        console.log("Informação dos profissionais:", infoProfissional);
        console.log("Informação dos Cliente:", infoCliente);

        res.status(200).json({ chats, infoCliente, infoProfissional });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};
//     const idProfissional = req.params.id_Profissional;

//     try {
//         const chats = await chatModel.find({
//             members: { $in: [idProfissional] }
//         });

//         res.status(200).json(chats);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Erro interno do servidor" });
//     }
// };

exports.findChat = async (req, res) => {
    const { idCliente, idProfissional } = req.params;

    try {
        const chats = await chatModel.find({
            members: { $all: [idCliente, idProfissional] }
        });

        console.log("CHAT FUDIDO================================", chats);
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};
