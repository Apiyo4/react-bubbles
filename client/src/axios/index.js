import axios from 'axios';


export default function axiosWithAuth(){
    const token = localStorage.getItem('token');

    const axiosInstance = axios.create({
        headers: {
            'Content-type' : 'application/json',
            Authorization : token
        }
    })
    return axiosInstance;
}