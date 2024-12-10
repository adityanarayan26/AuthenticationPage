import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { UseStore } from '../store/UseStore';



const LoginPage = () => {

    const loginpagebg = useRef(null)
    const { login, isLoading, isCheckingAuth, error } = UseStore();

    const navigate = useNavigate()

    useGSAP(() => {
        gsap.fromTo(loginpagebg.current, {
            filter: 'blur(2px)',
        }, {
            filter: 'blur(0px)',
            duration: 1,
            ease: 'sine.inOut',
        });
    }, []);

    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const Validation = ({ email, password }) => {
        const errors = {};

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return { error: '' }
    }


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const validation = Validation({ email: inputValue.email, password: inputValue.password });
            if (validation.error) {
                toast.error(validation.error, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
                return
            }
            await login(inputValue.email, inputValue.password);
            toast.success('Login successful', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            navigate('/')

        } catch (error) {
            console.log("error:", error)
            toast.error('invalid username or password', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        }
    }

    return (
        <div className="h-screen w-full flex gap-x-5 items-center sm:p-5" ref={loginpagebg}>
            <div
                className="h-full md:w-[50vw] lg:w-[60vw] hidden md:block rounded-xl object-cover object-center blur-0"
                style={{ backgroundImage: `url('/images/loginimg.jpg')` }}
            ></div>
            <div
                id="form"
                className="h-full w-full px-3 sm:px-28 md:px-10 md:w-[50vw] lg:px-16 lg:w-[40vw] sm:rounded-xl shadow-lg flex flex-col justify-center border"
            >
                <h1 className="capitalize font-bold text-2xl">Login</h1>
                <form
                    action=""
                    className="flex flex-col gap-x-3 gap-y-2 mt-5 w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col w-full">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="border rounded-md pl-2 py-1 outline-none transition-all ease-linear duration-150 focus:border-blue-600 w-full"
                            value={inputValue.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="border rounded-md pl-2 py-1 outline-none transition-all ease-linear duration-150 focus:border-blue-600 w-full"
                            value={inputValue.password}
                            placeholder="John!#23"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between pt-5">
                        <button
                            type="submit"
                            className="bg-[#013421] w-full text-white font-normal flex justify-center py-1 rounded-md"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin" /> : 'Login'}
                        </button>
                        <h1 className="text-sm sm:text-base font-medium pt-3">
                            Do you have an account?
                            <Link to={'/create-account'}>
                                <span className="text-[#FEB059] cursor-pointer pl-2">
                                    Sign up for free
                                </span>
                            </Link>
                        </h1>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage
