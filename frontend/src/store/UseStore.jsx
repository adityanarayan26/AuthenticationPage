import { url } from "@/config/url";
import axios from "axios";
import { redirect, useNavigate } from "react-router";
import { create } from "zustand";

export const UseStore = create((set) => ({
  
    error: null,
    isLoading: false,
    isCheckingAuth: JSON.parse(localStorage.getItem("auth")) || null,
    logoutStatus: null,
    loggedInUser: localStorage.getItem("user")|| false,

    signup: async (fullname, email, dob, phone, password, confirmpassword) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/signup`, { fullname, email, dob, phone, password, confirmpassword }, { withCredentials: true });
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });
            throw error;
        }

    },

    login: async (email, password) => {
        
        set({ isLoading: true, error: null });
        try {

            const response = await axios.post(`${url}/login`, { email, password }, { withCredentials: true });
            
            console.log("🚀 ~ login: ~ response:", response)
            set({ isLoading: false, error: response.data.message ,loggedInUser:localStorage.setItem("user", response.data.user) });
            localStorage.setItem("auth", JSON.stringify(response.data.success));
    

        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }

    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/logout`, { withCredentials: true });

            console.log("🚀 ~ logout: ~ response:", response)

            set({ isLoading: false, error: response.data.message, logoutStatus: true });
            localStorage.removeItem("auth");

        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
            throw error;
        }
    }

}))