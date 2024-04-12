import axios from 'axios';

export const baseUrl = "http://localhost:5000/auth";    

export const postRequest = async (url, body) => {
    try {
        const response = await axios.post(baseUrl + url, body);
       
        let message;
        let user;

        // Verificar se a resposta contém a chave "message" (sucesso)
        if (response.data && response.data.message) {
            message = response.data.message;
            console.log(response.data);
            delete response.data.message;
            delete response.data.cpfNumerico;
             user = response.data
        } else {
            // Se não houver uma chave "message", trata-se de um erro
            throw new Error('Erro ao processar a solicitação.');
        }

        return { message, user}; // Retorna um objeto com a chave "data" contendo a mensagem de sucesso
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <=499) {
            const errorMessage = error.response.data.error;
            console.log(`Erro ${error.response.status}: ${errorMessage}`);
            return { error: errorMessage }; // Retorna um objeto com a chave "error" contendo a mensagem de erro
        } else {
            // Tratar outros tipos de erros
            console.error(error);
            throw error; // rejeitar a promise para que o erro seja tratado no código que chamou essa função
        }
    }
};



// export const postRequest = async (url, body) => {
//     try {
//         const response = await axios.post(baseUrl + url, body, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
       
//         const data = await response.data; // Alterado de response.json() para response.data

//         if (!response.ok) {
//             return { error: data.message || 'Erro desconhecido' }; // Retornar objeto de erro
//         } else {
//             return { success: data.message || 'Operação realizada com sucesso' }; // Retornar objeto de sucesso
//         }
//     } catch (error) {
//         throw new Error(error.response?.data?.message || error.message);
//     }
// };
