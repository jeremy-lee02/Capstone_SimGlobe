

import Input from './Input'

type Props = {
  onClick: () => void
}

const SignIn = ({onClick}: Props) => {
  return (
      <div className='flex flex-col justify-center items-center'>
        <form className='w-[50%] '>
          <Input inputName='Username' type='text' placeholder='Enter your username' />
          <Input inputName='Password' type = 'password' placeholder='Enter your password'/>
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