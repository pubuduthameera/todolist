import React, { useState } from "react"
import { Trash } from "@phosphor-icons/react/dist/ssr"
import useDeleteTask from "../hooks/useDeleteTask";


const BtnDeleteTask= ({ taskId }) => {
  const { deleteTask, loading } = useDeleteTask();

  const handleDelete = async () => {
    await deleteTask(taskId);
    window.location.reload();
  };

  return (
    <>
     
      <button
       onClick={handleDelete}
        title="delete task"
        className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200"
      >
        <Trash className="w-5 h-5 sm:w-6 sm:h-6" />
        {loading ? "Deleting..." : ""}
      </button>
    </>
  )
}

export default BtnDeleteTask
