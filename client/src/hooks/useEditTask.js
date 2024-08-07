import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";


const useEditTask=()=>{
    const {authUser}=useAuthContext()
    console.log(authUser.user.email);
    
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;
    const editTask=async(taskdata)=>{
        console.log(taskdata);
        
        setLoading(true);
        try {
          const res = await axios.put(`${import.meta.env.VITE_APP_URL}/api/tasks/edittasks/${taskdata.id}`, taskdata,{
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
    return {editTask,loading}
}

export default useEditTask