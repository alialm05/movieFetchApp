import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

/* generates new access t oken from server, by verifying refresh token of the user */
function useRefreshToken() {
    const {setAuth} = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/refresh`, {
            withCredentials: true
        });

        setAuth(prev => {
            //console.log("got new token: ", response.data.accessToken)
            return {...prev, accessToken: response.data.accessToken}
        
        })

        return response.data.accessToken;
    }

    return refresh;
}


export default useRefreshToken;