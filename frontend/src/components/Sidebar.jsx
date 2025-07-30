// src/components/Sidebar.jsx
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { FaTasks } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiCheckDoubleFill } from "react-icons/ri";
import { TbNotebook } from "react-icons/tb";
import { TiContacts } from "react-icons/ti";

// Sidebar.jsx
export default function Sidebar({ isOpen, setIsOpen, setSelectedView }) {
  const handleClick = (view) => {
    setSelectedView(view);
    setIsOpen(false);
  };

  const data = [
    {
      title: "All tasks",
      icon: <FaTasks />,
      onlclick: "all",
    },
    {
      title: "Important tasks",
      icon: <FaHeart />,
      onlclick: "important",
    },
    {
      title: "Incomplete tasks",
      icon: <TbNotebook />,
      onlclick: "incomplete",
    },
    {
      title: "Completed tasks",
      icon: <RiCheckDoubleFill />,
      onlclick: "complete",
    },
  ]

  return (
    <>
      <div className={`fixed pt-20 top-0 left-0 h-full w-80 bg-gray-800 opacity-80 text-white flex flex-col justify-between shadow-lg z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex gap-2 p-4 border-b items-center text-2xl">
          <VscAccount />
          <button onClick={() => handleClick("profile")} className='hover:text-gray-400'>User Profile</button>
        </div>
        <ul className="p-4 space-y-4 text-2xl">

          {data.map((items, i) =>(
            <li className='flex items-center gap-2'>
            {items.icon}
            <button onClick={() => handleClick(`${items.onlclick}`)} className='hover:text-gray-400'>{items.title}</button>
          </li>
          ))}

        </ul>
        <div className='flex p-4 border-t items-center gap-2 text-2xl'>
          <TiContacts />
          <button onClick={() => handleClick("contact")} className='hover:text-gray-400'>Contact</button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-10 backdrop-blur-sm z-30" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
