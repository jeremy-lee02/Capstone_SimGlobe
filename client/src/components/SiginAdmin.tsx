
import React, { useRef, useState } from 'react';
import Input from './Input'
import axios from 'axios';
import {useSignIn} from 'react-auth-kit'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = {
  onClick: () => void
}
type FormValues = {
  email: string;
  password: string;
};

const SignInAdmin = ({onClick}: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const formRef = useRef<HTMLFormElement>(null)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData: FormValues = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value,
    }
    try {
      const response = await axios.post("http://localhost:9000/api/auth/admin", formData)
			signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          email: formData.email
        }
      })
      console.log(response.data);
      sessionStorage.setItem("userName", response.data.name)
			toast.success("Login Success!")
			navigate('/admin/dashboard')
		} catch (error: any) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
        toast.error(error.response.data.message)
			}
		}
  }
  return (
      <div className='flex flex-col justify-center items-center'>
        <form className='w-[50%]' onSubmit={handleSubmit} ref={formRef}>
          <Input inputName='Email' type='text' placeholder='Enter your email' name='email' />
          <Input inputName='Password' type = 'password' placeholder='Enter your password' name='password'/>
          <div className='flex justify-center items-center'>
            <button type='submit' className='text-white bg-[#044C87] py-2 px-5 w-[25%] font-semibold rounded-sm border border-[#0000003c] hover:bg-white hover:text-[#044C87]'>Login</button>
          </div>
        </form>
        <div className='w-[50%] border-[0.1px] border-white mt-7' />
        <p className='text-[#00A3FF] hover:text-white mt-5 cursor-pointer' onClick={onClick}>Don't have an account?</p>
      </div>
  )
}

export default SignInAdmin