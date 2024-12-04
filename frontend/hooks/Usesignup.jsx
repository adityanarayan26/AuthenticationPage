import { useState } from 'react';
import axios from 'axios';
import { url } from '@/config/url';


const Validation = ({ fullname, email, dob, phone, password, confirmpassword }) => {
    if (!email || !password || !fullname || !dob || !phone || !confirmpassword) {
        return { error: 'Please fill in all fields' };
    }

    if (password !== confirmpassword) {
        return { error: 'Passwords do not match' };
    }

    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters' };
    }

    return { error: '' };
};


export const Usesignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const usesignup = async (fullname, email, dob, phone, password, confirmpassword) => {
        const validation = Validation({ fullname, email, dob, phone, password, confirmpassword });
        if (validation.error) {
            setError(validation.error);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${url}/register`, { fullname, email, dob, phone, password, confirmpassword }, {
                withCredentials: true
            });
  
                if (response) {
                    setLoading(false);
                }
        } catch (error) {
            console.log(error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return { usesignup, error, loading };
};

