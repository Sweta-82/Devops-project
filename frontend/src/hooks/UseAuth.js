import { use, useContext, useEffect } from "react";
import { AuthContext } from "../features/auth/auth.context";
import { getMe, login, register } from "../features/auth/services/auth.api";
export const useAuth=()=>{
    const context= useContext(AuthContext);
    const{user, setUser, loading, setLoading}= context;
    const handleLogin=async({email, password})=>{
        setLoading(true);
        try {
            const data=await login({email, password})
            setUser(data.user);
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
        
    }
    const handleRegister=async({username, email, password})=>{
        setLoading(true);
        // call register api
        try {
            const data= await register({username, email, password});
            setUser(data.user);
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
    }
    const handleLogout=async ()=>{
        setLoading(true);
        try {
            const data= await logout();
            setUser(null);
            
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false);
        }
    }

useEffect(() => {
    const getAndSetUser = async () => {
        try {
            const data = await getMe();
            if (data?.user) {
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    getAndSetUser();
}, []);
    return{
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout
}
}