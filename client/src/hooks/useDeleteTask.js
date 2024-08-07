import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useDeleteTask = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      if (!taskId) {
        throw new Error("Task ID is undefined");
      }
      const res = await axios.delete(`${import.meta.env.VITE_APP_URL}/api/tasks/tasks/${taskId}`, {
        withCredentials: true,
      });
      const data = await res.data;
      if (data.error) throw new Error(data.error);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading };
};

export default useDeleteTask;
