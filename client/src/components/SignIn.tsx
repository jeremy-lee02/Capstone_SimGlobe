
import React, { useRef, useState } from 'react';
import Input from './Input'
import axios from 'axios';

type Props = {
  onClick: () => void
}
type FormValues = {
  username: string;
  password: string;
};

const SignIn = ({onClick}: Props) => {
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData: FormValues = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value,

    }
    try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, formData);
			localStorage.setItem("token", res.data);
			window.location = "/1";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}

    console.log(formData)
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

export default SignIn