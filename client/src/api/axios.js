import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5000/api/';

const sleep = new Promise(resolve=>setTimeout(resolve,3000));

axios.interceptors.response.use(async response=>{
    await sleep;
    return response
},error=>{
    toast(error.response.data.title);
    console.log('Yaay! caught by interceptor');
    return Promise.reject(error.response);
})

const responseBody = (res => res.data);

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody)
};

// call different url to fetch product stuff
const catalog = {
    list: ()=>requests.get('products'),
    details: (id)=>requests.get(`products/${id}`)
}

// call different errors
const testErrors = {
    get400Err : ()=>requests.get('Buggy/bad-request'),
    get401Err : ()=>requests.get('Buggy/unauthorised'),
    get404Err : ()=>requests.get('Buggy/not-found'),
    get500Err : ()=>requests.get('Buggy/server-error'),
    getValidationErr : ()=>requests.get('Buggy/validation-error')
}

const agent = {
    catalog,
    testErrors
}

export default agent;