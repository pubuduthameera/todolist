import axios from "axios";
import { useState } from "react";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const logout = async () => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/logout', {
          credentials: 'include', 
        });
        if (response.data) {
            localStorage.removeItem('test-practical')
            window.location.href = '/login'; 
        }
       
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { logout, loading, error };
  };

  export default useLogout;