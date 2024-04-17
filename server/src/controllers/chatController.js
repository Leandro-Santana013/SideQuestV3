const chatController = require("./Querys/proQuerys")

exports.criarChats = async (req, res) => {
    const { id_cliente, id_profissional } = req.body
    try {

        const chat = await chatController.findChat({
            params: {
                id_cliente: id_cliente,
                id_profissional: id_profissional
            }
        });


    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}