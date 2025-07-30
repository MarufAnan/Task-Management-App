import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/signup', form);
    navigate('/login');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-10'>
      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
        <h1 className='text-3xl font-bold text-center mb-1 text-blue-800'>
          Task Management App
        </h1>
        <h3 className='text-center font-semibold text-xinc-900 text-2xl'>
          SignUp
        </h3>
      </div>
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'/>

        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' />

        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' />

        <button type="submit" className="bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300">Sign Up</button>
        <p className="text-center font-semibold text-grey-900">
            have an Account?
            <Link to="/login" className='text-blue-900 text-xl hover:text-gray-400 transition-all duration-300'>Login</Link>
          </p>
      </form>
    </div>
    </div>


    // <form onSubmit={handleSubmit}>
    //   <h2>Signup</h2>
    //   <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
    //   <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
    //   <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
    //   <button type="submit">Sign up</button>
    // </form>
  );
}
