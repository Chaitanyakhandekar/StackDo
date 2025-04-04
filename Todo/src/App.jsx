import { useState } from 'react';
import './App.css';
import { Client, Databases, ID } from "appwrite";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    <div className="bg-[#0F172A] w-[100vw] h-[100vh]">
      <h1 className="text-2xl bg-[#F3F4F6] text-white p-3 rounded-xl font-bold">
        Todo Application
      </h1>
      
      <button 
        onClick={handleCreateDocument}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Creating...' : 'Create Document'}
      </button>
      
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          Document created successfully!
        </div>
      )}
    </div>
  );
}

export default App;