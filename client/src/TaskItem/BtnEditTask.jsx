import { DotsThreeVertical } from "@phosphor-icons/react";
import React, { useState } from "react";
import ModalCreateTask from "../atoms/ModelFrorm";

const BtnEditTask = ({ task }) => {
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState(false);

  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };
  const openModalEditTask = () => {

    setModalEditTaskOpen(true);
 
  };

  const editTaskHandler = (updatedTask) => {

    // console.log("Edited Task:", updatedTask);
    closeModalEditTask();
  };


  return (
    <>
      <button
        title="edit task"
        className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700"
        onClick={openModalEditTask}
      >
        <DotsThreeVertical weight="bold" className="w-4 sm:w-5 h-4 sm:h-5" />
      </button>
      {modalEditTaskOpen && (
        <ModalCreateTask
          onClose={closeModalEditTask}
          task={task}
          nameForm="Edit Task"
          open={modalEditTaskOpen}
          onConfirm={editTaskHandler}
        />
      )}
    </>
  );
};

export default BtnEditTask;