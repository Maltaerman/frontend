import axios from "axios";


const instance = axios.create({
    baseURL: `http://185.174.173.229:5001/api/v1`,
    withCredentials: false,
    headers: {
        accept: 'application/json'
    }
});


export default instance;
