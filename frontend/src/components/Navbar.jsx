// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaBars } from 'react-icons/fa';

export default function Navbar({ setAddTaskDiv, toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <div className='flex px-6 py-4 items-center justify-between border-b bg-white z-50 relative'>
      <div className="flex items-center gap-4">
        {isLoggedIn() && (
          <button onClick={toggleSidebar} className="text-2xl text-blue-800 hover:text-blue-600">
            <FaBars />
          </button>
        )}
        <Link to="/">
          <h1 className="text-2xl text-blue-800 font-semibold">Task Management App</h1>
        </Link>
      </div>

      {isLoggedIn() && (
        <div className="flex gap-6 items-center">
          {setAddTaskDiv && (
            <button
              className="bg-blue-800 px-3 py-2 rounded text-white text-base font-semibold hover:bg-blue-600 transition"
              onClick={() => setAddTaskDiv('block')}
            >
              Add Task
            </button>
          )}
          <button
            title="Logout"
            className="text-2xl text-red-500 hover:text-red-700 transition"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <IoLogOutOutline />
          </button>
        </div>
      )}
    </div>
  );
}
