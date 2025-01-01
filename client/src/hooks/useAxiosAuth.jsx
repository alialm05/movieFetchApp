import { useContext, useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import AuthContext from "../context/AuthProvider"
import axios from "axios"

const axiosAuth = axios.create({ // axios instance with authentication
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {'Content-Type': "application/json"},
    withCredentials: true,
})

const useAxiosAuth = () => {

    const { auth } = useContext(AuthContext)
    const refresh = useRefreshToken()

    useEffect(() => {

        const requestIntercept = axiosAuth.interceptors.request.use(
            config => {
                //console.log("interecepted request, access token: ", JSON.stringify(auth))
                if (!config.headers['Authorization'] && auth.accessToken){
                    console.log("Setting auth token to request config")
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosAuth.interceptors.response.use(
            response => response,

            async (error) => {
                const originalRequest = error?.config;
                if (error?.response?.status === 403 && !originalRequest.sent){
                    originalRequest.sent = true;
                    const newAccessToken = await refresh()
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosAuth(originalRequest)
                }
                return Promise.reject(error)

            }
        )

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept)
            axiosAuth.interceptors.response.eject(responseIntercept)
        }

    }, [auth, refresh])

    return axiosAuth 
}

export default useAxiosAuth