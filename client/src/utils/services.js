import axios from 'axios';

export const baseUrl = "http://localhost:5000/auth";    

export const postRequest = async (url, body) => {

    
    try {
        const response = await axios.post(baseUrl + url, body, {
            
        });
       
        const data = await response.json();
        
        if(!response.ok){
            let message

            if(data?.message){
                message = data.message;
            } else {
                message = data;
            }
         return {error: true, message};
        }
        return data;
    } catch (error) {
        let message = error.response?.data?.message || error.message;
        throw new Error(message);
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
