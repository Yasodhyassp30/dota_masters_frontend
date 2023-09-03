import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
})
const user = localStorage.getItem("users");
const currentUser = (typeof user == "string"&& user)?JSON.parse(user):{username:"",email:"",id:"",token:""};
instance.defaults.headers.common['Authorization'] = "Bearer "+currentUser.token;

export default instance;