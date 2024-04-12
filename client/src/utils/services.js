import axios from 'axios';

export const baseUrl = "http://localhost:5000/auth";    

export const postRequest = async (url, body) => {
    try {
        const response = await axios.post(baseUrl + url, body);
       
        let data;

        // Verificar se a resposta contém a chave "message" (sucesso)
        if (response.data && response.data.message) {
            data = response.data.message;
            console.log(data);
            return data;
        }
        
    } catch (error) {
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.error;
            console.log(`Erro ${error.response.status}: ${errorMessage}`);
            return errorMessage;
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
