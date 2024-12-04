import { useState } from 'react';
import axios from 'axios';

const Validation = ({ email, password }) => {
    if (!email || !password) {
        return { error: 'Please fill in all fields' };
    }

    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters' };
    }

    return { error: '' };
};

export const Uselogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const uselogin = async (email, password) => {
        const validation = Validation({ email, password });
        if (validation.error) {
            setError(validation.error);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${url}/login`, { email, password }, {
                withCredentials: true
            });
           console.log(response?.data?.message);
           

            if (response) {
                setLoading(false);
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return { uselogin, loading, error };
};