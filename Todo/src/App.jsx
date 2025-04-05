import { useState } from 'react';
import './App.css';
import { Client, Databases, ID } from "appwrite";
import { useDispatch,useSelector } from 'react-redux';
import { increament,decreament } from './store/slices/todoSlice';
import Login from './components/Login';
import Signup from './components/Signip';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleCreateDocument = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your endpoint
        .setProject('67efd413003a478100a0');
      
      const databases = new Databases(client);
      
      let response = await databases.getDocument(
        '67efd6330013881c7e66',
        '67efd64b00020a82b9d1',
        '67efd94700244887da08',
        
      );
      console.log(response)
      
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-[100vw] h-[100vh]">
     <Login/>
     {/* <Signup/> */}
     
    </div>
  );
}

export default App;