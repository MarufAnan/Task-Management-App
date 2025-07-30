import React, { useEffect, useRef, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

export default function TaskCard({
  task, toggleStatus, deleteTask,
  setEditTask, setAddTaskDiv,
  setModalTask
}) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    const el = descRef.current;
    if (el && el.scrollHeight > el.clientHeight) {
      setIsOverflowing(true);
    }
  }, [task.description]);

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  return (
    <div className='flex flex-col justify-between bg-gray-800 rounded-lg p-4 text-white h-64 overflow-hidden shadow-md'>
      <div className='overflow-hidden'>
        <div className='flex items-center gap-3'>
          <h3 className='text-2xl font-semibold truncate' title='Task title'>{capitalize(task.title)}</h3>
          <div className='text-sm text-gray-400'>
            <div>
              Priority: <span className='capitalize'>{task.priority}</span>
            </div>
            <div>
              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}
            </div>
          </div>

        </div>

        <p
          className='text-gray-300 my-2 text-lg line-clamp-3 overflow-hidden'
          ref={descRef}
        >
          {task.description}
        </p>
        {isOverflowing && (
          <button
            className="text-blue-400 underline mt-1 hover:text-blue-300"
            onClick={() => setModalTask(task)}
          >
            Read More
          </button>
        )}
      </div>

      <div className='mt-4 w-full flex items-center'>
        <button
          title="Toggle task status"
          onClick={() => toggleStatus(task, 'status')}
          className={`p-2 rounded w-3/6 text-white ${task.status === "incomplete" ? "bg-red-400" : "bg-green-700"
            }`}
        >
          {task.status === "incomplete" ? "In Complete" : "Complete"}
        </button>

        <div className='p-2 w-3/6 text-2xl flex justify-around'>
          <button
            title="Toggle important"
            onClick={() => toggleStatus(task, 'important')}
            className="hover:scale-110 transition-transform"
          >
            {task.important ? (
              <FaHeart className="text-red-500" />
            ) : (
              <CiHeart />
            )}
          </button>

          <button
            title="Edit task"
            onClick={() => {
              setEditTask(task);
              setAddTaskDiv("block");
            }}
            className="hover:text-blue-400 hover:scale-110 transition-transform"
          >
            <FaEdit />
          </button>

          <button
            title="Delete task"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
                deleteTask(task._id);
              }
            }}
            className="hover:text-red-400 hover:scale-110 transition-transform"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}
