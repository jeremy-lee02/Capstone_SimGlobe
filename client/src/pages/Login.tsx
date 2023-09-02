import { simGlobe_logo, rmit_logo } from '../assets'
import {useState, useEffect} from 'react'
import Register from '../components/Register'
import SignIn from '../components/SignIn'
import {useIsAuthenticated} from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

type Props = {}

const Login = (props: Props) => {
  const [checkState, setCheckState] = useState('login')
  const isAuthenticated = useIsAuthenticated()
	const navigate = useNavigate();
  useEffect(() => {
    if(isAuthenticated()){
      navigate("/")
    }
  })
  return (
    <div className='background pl-5 py-4'>
      <img src= {rmit_logo} width={150} height={60} className='object-contain' />
      <div className='flex items-center justify-center'>
        <img src= {simGlobe_logo} width={500} height={500} />
      </div>
      {checkState === 'login'? (<SignIn onClick={()=> setCheckState('register')} />): (<Register onClick={()=> setCheckState('login')} />)}

    </div>
  )
}

export default Login