import React, { useRef, useState, useEffect } from "react";
import useSendTask from "../hooks/AddTask";
import { format } from 'date-fns'
import useEditTask from "../hooks/useEditTask";

const InputCheckbox = ({ label, isChecked, setChecked, open }) => {
  return (
    <label className={`mb-0 flex items-center cursor-pointer ${!open && 'hidden'}`}>
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (
          <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
        )}
      </div>
      <span className="order-1 flex-1 text-black">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev) => !prev)}
      />
    </label>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ''; // Return empty string if date is invalid

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
};

const ModalCreateTask = ({ onClose, task, nameForm, open }) => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const todayDate = `${year}-${month}-${day}`;
  const maxDate = `${year + 1}-${month}-${day}`;

  const [description, setDescription] = useState(task?.description || "");
  const [title, setTitle] = useState(task?.title || "");
  const [date, setDate] = useState(task ? formatDate(task.dueDate ): todayDate);
  const [isCompleted, setIsCompleted] = useState(task?.completed || false);

  const isTitleValid = useRef(false);
  const isDateValid = useRef(false);

  const { sendTask, loading: sending } = useSendTask();
  const { editTask, loading: editing } = useEditTask();

  const loading = sending || editing;

  const addNewTaskHandler = async (event) => {
    event.preventDefault();
  
    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;


    if (isTitleValid.current && isDateValid.current) {
      const newTask = {
        title,
        description,
        dueDate: date,
        completed: isCompleted,
        id: task?._id ? task._id : Date.now().toString(),
      };
     
      if (task?._id) {
        await editTask(newTask);
      } else {
        await sendTask(newTask);
      }
      onClose();
      window.location.reload()
    }
  };

  return (
    <div className={`fixed inset-0 flex z-10 items-center justify-center transition-colors backdrop-blur-sm ${open ? "visible bg-black/20" : "invisible"}`}>
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl mb-4">{nameForm}</h2>
        <form className="flex flex-col" onSubmit={addNewTaskHandler}>
          <label className="text-black mb-2">
            Title
            <input
              type="text"
              placeholder="e.g., study for the test"
              required
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              className="w-full border p-2 rounded"
            />
          </label>
          <label className="text-black mb-2">
            Date
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={date}
              required
              onChange={({ target }) => setDate(target.value)}
              min={todayDate}
              max={maxDate}
            />
          </label>
          <label className="text-black mb-2">
            Description (optional)
            <textarea
              placeholder="e.g., study for the test"
              className="w-full border p-2 rounded"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            ></textarea>
          </label>
          <InputCheckbox
            isChecked={isCompleted}
            setChecked={setIsCompleted}
            label="Mark as completed"
            open={true}
          />
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="btn btn-secondary mr-2">Cancel</button>
            <button type="submit" className="btn btn-primary">
              {loading ? "Saving..." : nameForm}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateTask;
