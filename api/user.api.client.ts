import axios from "axios";

const userApiClient = axios.create({
    baseURL: "http://localhost:5263",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default userApiClient;