import { toast } from 'react-toastify'
import axios from 'axios';
import type { ISignUpData } from '../../Types/basicTypes';

const API_URI = import.meta.env.VITE_API_URI;


export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error.response?.data?.message);
        toast.error(error.response?.data?.message);
    } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};

export const Signup = async (userData: ISignUpData ,role: string) => {
    try {
        let response = await axios.post(`${API_URI}/auth/signup`, { ...userData,role}, { withCredentials: true })
        return response.data
    } catch (error: unknown) {
        handleAxiosError(error)
    }
}

export const Signin = async (userData: ISignUpData, role: string) => {
    try {
        let response = await axios.post(`${API_URI}/auth/signin`, { ...userData, role }, { withCredentials: true })
        return response.data
    } catch (error: unknown) {
        handleAxiosError(error)
    }
}