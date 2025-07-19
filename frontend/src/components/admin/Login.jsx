import React,{useState} from 'react'
import {useAppContext} from '../../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {axios,setToken} = useAppContext();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/admin/login',{email, password});
      const data = res.data;
      if (data.success)
      {
        setToken(data.token)
        localStorage.setItem('token',data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
        navigate("/admin")
      }
      else
      {
        toast.error(data.message)
      }
        
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-[color:var(--color-primary)]/30 shadow-xl shadow-[color:var(--color-primary)]/15 rounded-lg'> {/*for the login form*/}
        <div className='flex flex-col items-center justify-center'> {/*for the vertical text boxes*/}
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-[color:var(--color-primary)]'>Admin</span> Login</h1>
            <p className='font-light'>Enter your credentials to access the admin panel!</p>
          </div>
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label>Email</label>
              <input onChange={e=>setEmail(e.target.value)} value={email} type="email" required placeholder='Your Email ID' className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>
            <div className='flex flex-col'>
              <label>Password</label>
              <input onChange={e=>setPassword(e.target.value)} value={password} type="password" required placeholder='Your Password' className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>
            <button type="submit" className='w-full py-3 font-medium bg-[color:var(--color-primary)] text-white rounded cursor-pointer hover:bg-[color:var(--color-primary)]/90 transition-all'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
