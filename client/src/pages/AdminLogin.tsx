import { simGlobe_logo, rmit_logo } from '../assets'
import {useState} from 'react'
import SignInAdmin from '../components/SiginAdmin'

type Props = {}


const AdminLogin = (props: Props) => {
  const [checkState, setCheckState] = useState('login')
  return (
    <div className='background pl-5 py-4'>
      <img src= {rmit_logo} width={150} height={60} className='object-contain' />
      <div className='flex items-center justify-center'>
        <img src= {simGlobe_logo} width={500} height={500} />
      </div>
      <SignInAdmin  onClick={()=> setCheckState('register')} />
    </div>
  )
}

export default AdminLogin