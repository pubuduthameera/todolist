import { useEffect, useState } from "react";
import axios from "axios";

  const useGetTasks = (userid,condition) => {
	const [loading, setLoading] = useState(false);
	const [ taskData, setTaskData ] = useState([]);


	useEffect(() => {
		const getLanding = async () => {
			setLoading(true);
			try {
				setTimeout(async () => {
					const res = await axios.get(`${import.meta.env.VITE_APP_URL}/api/tasks/tasks/${userid}`,
					{ params: { condition } });
					const data = await res.data;
					if (data.error) throw new Error(data.error);
					setTaskData(data);
				// 	console.log(data);	
					setLoading(false);
				},2000)
				
			} catch (error) {
				
				console.log(error.message);
			} finally {
				
			}
		};
		if (userid) {
			getLanding();
		  }
	}, [userid,condition]);

	return { taskData, loading };
};

export default useGetTasks;