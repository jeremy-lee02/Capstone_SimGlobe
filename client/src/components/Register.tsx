import axios from 'axios';
import Input from './Input'
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = {
  onClick: () => void
}
type FormValues = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
  };
const Register = ({onClick}: Props) => {
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement>(null)
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const formData: FormValues = {
			firstName: formRef.current?.firstName.value,
			lastName: formRef.current?.lastName.value,
			email: formRef.current?.email.value,
			password: formRef.current?.password.value,
	  
		  }
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, formData);
			toast.success(res.message)
			setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				toast.error(error.response.data.message)
			}
		}
	};
  return (
        <div className='flex flex-col justify-center items-center'>
            <form className='w-[50%] ' onSubmit={handleSubmit} ref={formRef}>
            <Input inputName='First Name' name='firstName' type='text' placeholder='Enter your first Name' />
            <Input inputName='Last Name' name='lastName' type='text' placeholder='Enter your last Name' />
            <Input inputName='Email' name='email' type='text' placeholder='Enter your email' />
            <Input inputName='Password' name='password' type = 'password' placeholder='Enter your password'/>
            <div className='flex justify-center items-center'>
                <button type='submit' className='text-white bg-[#044C87] py-2 px-5 w-[25%] font-semibold rounded-sm border border-[#0000003c] hover:bg-white hover:text-[#044C87]'>Register</button>
            </div>
            </form>
            <div className='w-[50%] border-[0.1px] border-white mt-7' />
            <p className='text-[#00A3FF] hover:text-white mt-5  cursor-pointer' onClick={onClick}>Already have an account?</p>
      </div>

  )
}

export default Register