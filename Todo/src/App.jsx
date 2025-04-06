import { useEffect } from 'react';
import './App.css';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signip';
import Home from './pages/user/Home';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from './store/userSlice/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const appwriteUserId = localStorage.getItem('appwriteUserId');
    const createdAt = localStorage.getItem('createdAt');
    const updatedAt = localStorage.getItem('updatedAt');

    if (userId && appwriteUserId) {
      dispatch(
        setUserData({
          userId,
          appwriteUserId,
          createdAt,
          updatedAt,
        })
      );
    }
  }, []);

  return (
    <div className="w-[100vw] h-[100vh]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
