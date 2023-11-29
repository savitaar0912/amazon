import axios from 'axios';

const instance = axios.create({
    // baseURL: "http://us-central1-fir-f4f2f.cloudfunctions.net/api",
    baseURL: 'http://127.0.0.1:5001/fir-f4f2f/us-central1/api/',
    timeout: 50000, // Adjust the timeout value as needed
});

export default instance;