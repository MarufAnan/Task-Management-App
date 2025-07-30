import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { isLoggedIn } from './utils/auth';
import Profile from './pages/Profile';
import Contact from './pages/Constact';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Layout */}
        <Route path="/" element={isLoggedIn() ? <Dashboard /> : <Login />}>
          <Route path="profile" element={<Profile />} />
          <Route path="contact" element={<Contact />} />
          {/* You can also add default task list page like: */}
          {/* <Route index element={<TaskList />} /> */}
        </Route>
      </Routes>
      <div className='fixed bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
