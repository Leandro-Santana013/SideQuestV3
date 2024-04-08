import axios from 'axios';

export const baseUrl = "http://localhost:5000/auth/";

export const postRequest = async (url, body) => {
    try {
        const response = await axios.post(baseUrl + url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        let message = error.response?.data?.message || error.message;
        throw new Error(message);
    }
};
