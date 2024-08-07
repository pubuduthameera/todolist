import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";


const useSendTask=()=>{
    const {authUser}=useAuthContext()
    console.log(authUser.user.email);
    
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;
    const sendTask=async(newTask)=>{
        setLoading(true);
        try {
          const res = await axios.post(`${import.meta.env.VITE_APP_URL}/api/tasks/tasks/${authUser.user.id}`, newTask,{
            withCredentials: true,
          });
          const data = await res.data;
          if (data.error) throw new Error(data.error);
      
          
        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
    }
    return {sendTask,loading}
}

export default useSendTask