import axios from 'axios';

const instance = axios.create({
    baseURL: "https://us-central1-aclone-2c628.cloudfunctions.net/api",
    // "http://127.0.0.1:5001/aclone-2c628/us-central1/api",
    timeout: 50000, // Adjust the timeout value as needed
});

export default instance;