import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import { json } from "react-router-dom";

function useRefreshToken() {
    const {setAuth} = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/refresh`, {
            withCredentials: true
        });

        console.log(response.json())

        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(response.data.accessToken)
            return {...prev, accessToken: response.data.accessToken}
        
        })

        return response.data.accessToken;
    }

    return refresh;
}


export default useRefreshToken;