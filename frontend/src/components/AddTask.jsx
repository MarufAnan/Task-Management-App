import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function AddTask({ fetchTasks, editTask, setEditTask, setAddTaskDiv }) {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
    });


    useEffect(() => {
        if (editTask) {
            setForm({
                title: editTask.title,
                description: editTask.description,
                priority: editTask.priority || 'medium',
                dueDate: editTask.dueDate ? editTask.dueDate.split('T')[0] : ''
            });
        }

    }, [editTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${getToken()}` };
        if (editTask) {
            await axios.put(`${BASE_URL}/api/tasks/${editTask._id}`, form, { headers });
            setEditTask(null);
        } else {
            await axios.post(`${BASE_URL}/api/tasks`, form, { headers });
        }
        setForm({ title: '', description: '' });
        fetchTasks();
        setAddTaskDiv("hidden");
    };

    return (
        <div className='bg-white rounded px-4 py-4 w-[40%]'>
            <h1 className="text-center font-semibold text-xl">Add Task</h1>
            <hr className="mb-4 mt-2" />
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    placeholder="Title"
                    className="border px-2 py-1 rounded boder-zinc-300 outline-none"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                />
                <div>
                    <select
                        value={form.priority}
                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                        className="border px-2 py-1 rounded border-zinc-300 outline-none"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <input
                        type="date"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                        className="border px-2 py-1 rounded border-zinc-300 outline-none"
                    />

                </div>
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className='border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh] '
                />
                <div className="flex justify-center items-center gap-4">
                    <button type="submit" className='w-full py-2 bg-blue-800 hover:bg-blue-700 transition-all duration-300 text-white rounded'>{editTask ? 'Update Task' : 'Add Task'}</button>
                    <button className='w-full py-2 border border-black hover:bg-zinc-100 transition-all duration-300 rounded' onClick={() => setAddTaskDiv("hidden")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
