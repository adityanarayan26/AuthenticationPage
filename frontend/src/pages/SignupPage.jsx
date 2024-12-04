import React, {  useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import gsap from 'gsap'


import toast from 'react-hot-toast';
// import { UseStore } from '@/store/UseStore'
import { useGSAP } from '@gsap/react'



const SignupPage = () => {

    const navigate = useNavigate()
    const signuppagebg = useRef(null)

    useGSAP(() => {
        gsap.fromTo(signuppagebg.current, {
            filter: 'blur(2px)',

        }, {
            filter: 'blur(0px)',
            duration: 1,

            ease: 'sine.inOut'
        });

    }, [])
    const [date, setDate] = useState()

    const [inputValue, setInputValue] = useState({
        fullname: '',
        email: '',
        phn: '',
        password: '',
        confirmpassword: ''
    })
    // const { signup, error, isLoading } = UseStore()
    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
            date: date
        }))
    }

    const Validation = ({ fullname, email, dob, phone, password, confirmpassword }) => {
        if (!email || !password || !fullname || !dob || !phone || !confirmpassword) {
            return { error: 'Please fill in all fields' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { error: 'Please enter a valid email' };
        }
        if (password !== confirmpassword) {
            return { error: 'Passwords do not match' };
        }

        if (password.length < 6) {
            return { error: 'Password must be at least 6 characters' };
        }

        return { error: '' };
    };


    const handleSubmit = async (e) => {

        // try {
        //     e.preventDefault()
        //     const validation = Validation({ fullname: inputValue.fullname, email: inputValue.email, dob: date, phone: inputValue.phn, password: inputValue.password, confirmpassword: inputValue.confirmpassword });
        //     if(validation.error){
        //         toast.error(validation.error, {
        //             style: {
        //                 borderRadius: '10px',
        //                 background: '#333',
        //                 color: '#fff',
        //             }
        //         })
        //         return
        //     }
        //     await signup(inputValue.fullname, inputValue.email, date, inputValue.phn, inputValue.password, inputValue.confirmpassword)

        //     toast.success('account created successfully', {
        //         style: {
        //             borderRadius: '10px',
        //             background: '#333',
        //             color: '#fff',
        //         }
        //     })
        //     navigate('/login')
        // } catch (error) {
        //     console.log("🚀 ~ handleSubmit ~ error:", error)

        // }

    }


    return (
        <div className='h-screen w-full flex gap-x-5  items-center  sm:p-5 ' ref={signuppagebg}>


            <div className='h-full w-[50vw] hidden sm:block  rounded-xl object-cover object-center' style={{ backgroundImage: `url('/images/signupimg.jpg')` }}></div>


            <div id='form' className='h-full border lg:w-[50vw] w-full px-3 sm:px-5 text-base   lg:px-20    sm:rounded-xl  shadow-lg  flex flex-col justify-center  '>
                <h1 className='capitalize font-bold text-2xl '>create an account</h1>
                <h2 className='capitalize font-medium  text-base'>enter your details below to create an account and get started</h2>
                <form action="" className='grid grid-cols-2 grid-rows-4 gap-x-3  mt-5 '>


                    <div className='flex flex-col'>
                        <label htmlFor="" >Full Name</label>
                        <input type="text" name='fullname' className='border rounded-md pl-2 py-1 outline-none transition-all ease-linear duration-150 focus:border-blue-600' value={inputValue.fullname} onChange={handleChange} placeholder='john doe' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Email</label>
                        <input type="text" name='email' className='border rounded-md pl-2 py-1 outline-none transition-all ease-linear duration-150 focus:border-blue-600' value={inputValue.email} onChange={handleChange} placeholder='example@gmail.com' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Date of Birth</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Phone Number</label>
                        <input type="number" name="phn" className='border rounded-md pl-2 py-1 outline-none transition-all ease-linear duration-150 focus:border-blue-600' value={inputValue.phn} onChange={handleChange} placeholder='+918287076625' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" className='border rounded-md pl-2 py-1 outline-none transition-all ease-linear duration-150 focus:border-blue-600' value={inputValue.password} placeholder='John!#23' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" name="confirmpassword" className='border rounded-md pl-2 py-1 outline-none transition-all ease-linear duration-150 focus:border-blue-600' placeholder='John!#23' value={inputValue.confirmpassword} onChange={handleChange} />
                    </div>

                </form>
                <div className='flex items-center px-5 justify-between gap-x-3'>
                    <button type='submit' className='bg-[#013421] w-[70%] sm:w-1/2 py-1 text-white font-normal   rounded-md' onClick={handleSubmit} >Create account</button>
                    <h1 className='  font-sans font-medium'>Already have an account?<Link to={'/login'}><span className='text-[#FEB059] cursor-pointer'> Login</span></Link></h1>
                </div>
            </div>
        </div>
    )
}

export default SignupPage