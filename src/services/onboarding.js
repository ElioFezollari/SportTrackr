import axios from 'axios'
const baseUrl = 'http://localhost:5001/v1/connect/'

const getOnboardingUrl = async (token) => {
    try {
        const response = await axios.post(baseUrl, null, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });
        return response;
    } catch (e) {
        console.error("Error fetching URL:", e);
    }
}

const getDashboardUrl = async (token) => {
    try {
        const response = await axios.get(baseUrl + "dashboard", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });
        return response;
    } catch (e) {
        console.error("Error fetching URL:", e);
    }
}

export { getOnboardingUrl, getDashboardUrl }