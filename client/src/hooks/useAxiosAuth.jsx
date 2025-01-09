import { useContext, useLayoutEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import AuthContext from "../context/AuthProvider"
import axiosAuth from "../api/axiosAuth"

const useAxiosAuth = () => {

    const { auth, setAuth } = useContext(AuthContext)
    const refresh = useRefreshToken()

    useLayoutEffect(() => {

        // auth intercept
        const requestIntercept = axiosAuth.interceptors.request.use(
            config => {
                
                if (!config.headers['Authorization'] && auth.accessToken && !config.sent) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        // refresh intercept
        const responseIntercept = axiosAuth.interceptors.response.use(
            response => response,

            async (error) => {
                const originalRequest = error?.config;
                
                if (error?.response?.status === 403 && !originalRequest.sent){
                    try {
                        originalRequest.sent = true;
                        const newAccessToken = await refresh()
                        console.log("new access token: ", newAccessToken)
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                        return axiosAuth(originalRequest)
                    }catch (error){
                        setAuth({})
                    }
                }
                return Promise.reject(error)
            }
            
        )

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept)
            axiosAuth.interceptors.response.eject(responseIntercept)
        }

    }, [auth])

    return axiosAuth 
}

export default useAxiosAuth