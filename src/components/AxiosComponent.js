import { useState, useEffect } from "react";
import axios from 'axios';
import {jwtDecode} from "jwt-decode"

export const useAxios = (baseURL) => {
    const [axiosInstance, setAxiosInstance] = useState({});

    const isTokenValid = () => {
        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            return false
        }
        const decode = jwtDecode(accessToken)
        const tokenDate = new Date(decode.exp * 1000);
        const currentDate = new Date()

        const compareResult = tokenDate > currentDate;

        if (!compareResult) {
            localStorage.removeItem('accessToken')
        }

        return compareResult
    }

    useEffect(() => {
        const instance = axios.create({
            baseURL: baseURL,
            headers: {
                Authorization: isTokenValid() ? `Bearer ${localStorage.getItem('accessToken')}` : '',
            }
        });
        setAxiosInstance({instance})

        return () => {
            setAxiosInstance({});
        }
    }, [baseURL]);
    return axiosInstance.instance;
};