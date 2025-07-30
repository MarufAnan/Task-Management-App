import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AddTask from '../components/AddTask';
import TaskCard from '../components/TaskCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("all");
  const [modalTask, setModalTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    fetchTasks();
  };

  const toggleStatus = async (task, field) => {
    const updated = {
      ...task,
      [field]: field === 'status'
        ? (task.status === 'completed' ? 'incomplete' : 'completed')
        : !task.important
    };
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updated, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (selectedView === "profile") navigate("profile");
    else if (selectedView === "contact") navigate("contact");
    else navigate(""); // default view
  }, [selectedView]);

  const filteredTasks = tasks.filter(task => {
    if (selectedView === "important") return task.important;
    if (selectedView === "complete") return task.status === "completed";
    if (selectedView === "incomplete") return task.status === "incomplete";
    return true;
  });

  const isPageRoute = location.pathname.includes("profile") || location.pathname.includes("contact");

  return (
    <div className="relative">
      {/* Sidebar and Navbar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} setSelectedView={setSelectedView} />
      <Navbar setAddTaskDiv={setAddTaskDiv} toggleSidebar={() => setIsSidebarOpen(true)} />

      {/* AddTask Modal */}
      <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-black opacity-50 z-30`} onClick={() => setAddTaskDiv("hidden")} />
      <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center z-40`}>
        <AddTask fetchTasks={fetchTasks} editTask={editTask} setEditTask={setEditTask} setAddTaskDiv={setAddTaskDiv} />
      </div>

      {/* Read More Modal */}
      {modalTask && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setModalTask(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md h-[70vh] overflow-y-auto relative shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{modalTask.title}</h2>
              <p className="text-gray-300 mb-4 whitespace-pre-line">{modalTask.description}</p>
              <div className="flex justify-end gap-4 sticky bottom-0 bg-gray-900 py-2">
                <button
                  className="bg-green-700 px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => {
                    setEditTask(modalTask);
                    setAddTaskDiv("block");
                    setModalTask(null);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this task?")) {
                      deleteTask(modalTask._id);
                      setModalTask(null);
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 border rounded border-gray-500 hover:bg-gray-700"
                  onClick={() => setModalTask(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}


      {/* Main View */}
      <div className="p-4">
        {isPageRoute ? (
          <Outlet />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                toggleStatus={toggleStatus}
                deleteTask={deleteTask}
                setEditTask={setEditTask}
                setAddTaskDiv={setAddTaskDiv}
                setModalTask={setModalTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
