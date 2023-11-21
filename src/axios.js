import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/fir-f4f2f/us-central1/api/' //api url
})

export default instance;