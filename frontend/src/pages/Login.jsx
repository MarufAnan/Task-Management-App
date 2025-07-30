import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/login', form);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    navigate('/');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-10'>
      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
        <h1 className='text-3xl font-bold text-center mb-1 text-blue-800'>
          Task Management App
        </h1>
        <h3 className='text-center font-semibold text-xinc-900 text-2xl'>
          Login
        </h3>
      </div>
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
      <form onSubmit={handleLogin} className='flex flex-col gap-5'>

        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' />

        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' />

        <button type="submit" className="bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300">Login</button>
        <p className="text-center font-semibold text-grey-900">
            Don't have an Account?
            <Link to="/signup" className='text-blue-900 text-xl hover:text-gray-400 transition-all duration-300'>Sign Up</Link>
          </p>
      </form>
    </div>
    </div>
  );
}
