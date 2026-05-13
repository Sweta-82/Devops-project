import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
    withCredentials: true
})

export async function register({username, email, password}){
    try{
        const response = await api.post('/api/auth/register', {
            username,
            email,
            password    
        })
        return response.data;
    }catch(err){
    }
}

// login
export async function login({email, password}){
    try{
        const response = await api.post('/api/auth/login', {
            email,
            password    
        })
        return response.data;
    }catch(err){
    }
}

// logout
export async function logout(){
    try {
        const response= await api.get('/api/auth/logout', {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
    }
}

// get me
export async function getMe(){
    try{
        const response = await api.get('/api/auth/get-me',{
            withCredentials: true
        }) 
        return response.data;
    } catch (error) {
    }
}

