import { createContext, useEffect, useState } from "react";
const AuthContext = createContext({});
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";


function AuthProvider({ children }){
    const [auth, setAuth] = useState({});

    // get new access token when page is refreshed/component is mounted
    useEffect(() => {
    
        const fetchMe = async () => {

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/refresh`, {
                withCredentials: true
            });
    
            setAuth(prev => {
                return {...prev, accessToken: response.data.accessToken}
            })
            
            return response.data.accessToken        
        }

        if (!auth.useRefreshToken){
            console.log("no auth")
            fetchMe()
        }

    }, [])


    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthProvider };