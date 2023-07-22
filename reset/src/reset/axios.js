import axios from 'axios'
// import store from '../store';
import { api } from './urlconfig'

const token=window.localStorage.getItem('token');
const axiosInstance=axios.create({
    baseURL:api,
    headers:{
        'Authorization':token? `Bearer ${token}`:''
    }
})

export default axiosInstance;