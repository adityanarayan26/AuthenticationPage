import { url } from "@/config/url";
import axios from "axios";
import { create } from "zustand";

export const UseStore = create((set) => ({
    error: null,
    isLoading: false,
    isCheckingAuth: JSON.parse(localStorage.getItem("auth")) || null,
    logoutStatus: null,
    loggedInUser: JSON.parse(localStorage.getItem("user")) || null,

    signup: async (fullname, email, dob, phone, password, confirmpassword) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${url}/signup`,
                { fullname, email, dob, phone, password, confirmpassword },
                { withCredentials: true }
            );
            if (response) {
                console.log('user signed in successfully ! redirecting...');
            }
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/login`, { email, password }, { withCredentials: true });
            const { success, user } = response.data;


            set({ isLoading: false, loggedInUser: user, isCheckingAuth: success });
            localStorage.setItem("auth", JSON.stringify(success));
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/logout`, {}, { withCredentials: true });
            set({ isLoading: false, isCheckingAuth: null, loggedInUser: null, logoutStatus: true });


            localStorage.removeItem("auth");
            localStorage.removeItem("user");
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
            throw error;
        }
    },
}));
