import React, { useState } from 'react'
import SortButton from '../atoms/SortButton'
import ModalCreateTask from '../atoms/ModelFrorm'
import { useAuthContext } from '../context/AuthContext'

import useGetTasks from '../hooks/useGetTasks'
import BtnDeleteTask from '../TaskItem/BtnDeleteTask'
import BtnEditTask from '../TaskItem/BtnEditTask'
import { Calendar, Check, X } from '@phosphor-icons/react'
import { format } from 'date-fns'

const LayoutTaskSort = ({ title, tasks, condition ,searchTerm}) => {
  const [isListInView1, setIsListInView1] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { authUser } = useAuthContext()
  const [sortedBy, setSortedBy] = useState('order-added');
  const { loading, taskData } = useGetTasks(authUser.user.id,condition)



  const onOpenModal = () => {
    setIsOpen(true)
  }

  const onCloseModal = () => {
    setIsOpen(false)
  }

  const filteredTasks = taskData.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortTasks = (tasks, criteria) => {
    switch (criteria) {
      case 'min-date':
        return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      case 'max-date':
        return [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
      case 'completed-first':
        return [...tasks].sort((a, b) => b.completed - a.completed);
      case 'uncompleted-first':
        return [...tasks].sort((a, b) => a.completed - b.completed);
      case 'order-added':
      default:
        return tasks;
    }
  };

  const sortedTaskData = sortTasks(taskData, sortedBy);

  const isOverdue = (dueDate, completed) => {
    const taskDueDate = new Date(dueDate);
    const now = new Date();
    console.log('Task Due Date:', taskDueDate);
    console.log('Current Date:', now);
    return !completed && taskDueDate < now;
  };

  return (
    <div>
      <section>
        <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg dark:text-slate-200">
          {/* {tasksTitle} */}
        </h1>
        <SortButton
          isListInView1={isListInView1}
          setIsListInView1={setIsListInView1}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
        />
        <ul
          className={`tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 text-white ${isListInView1
              ? "grid-cols-1"
              : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
            }`}
        >
          {sortedTaskData
            .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase())) // Apply search filter
          .map((task) => (
            // <TaskItem key={task._id} isListInView1={isListInView1} task={task} />
            <li key={task.id}>

              <article
                className={`bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent 
                  ${isListInView1 ? "flex-row sm:h-32" : "flex-col h-52 sm:h-64"}
                  ${isOverdue(task.dueDate, task.completed) ? 'bg-red-600 dark:bg-red-800' : ''}`}
              >
                {/* <InfosTask task={task} isListInView1={isListInView1} /> */}
                <div className={`flex flex-col flex-1 ${isListInView1 ? "mr-6" : ""}`}>
                  <div
                    className={`flex items-center justify-between ${isListInView1 ? "mb-1" : "mb-2"
                      }`}
                  >
                    <span className="block font-medium dark:text-slate-200">
                      {task.title}
                    </span>
                  </div>
                  <p
                    title={task.description}
                    className={`description mb-2 text-slate-500 dark:text-slate-500 ${isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"
                      }`}
                  >
                    {task.description}
                  </p>
                  <time className="mt-auto flex w-full items-center">
                    <Calendar className="mr-2 w-4 sm:w-5 " /> {format(new Date(task.dueDate), 'dd MM yyyy')}
                  </time>
                </div>
                
                <div
                  className={`flex justify-between border-dashed border-slate-200 dark:border-slate-700/[.3] ${isListInView1 ? "items-center" : "border-t-2 w-full pt-4 mt-4"
                    }`}
                >
                  <button
                    
                    className={`
                       ${isOverdue(task.dueDate, task.completed) ? "bg-red-300" : (task.completed ? "bg-teal-300" : "bg-yellow-300")}
     ${task.completed ? 'bg-teal-300':'bg-yellow-300'}
      ${isListInView1 ? "mr-4" : "mr-4 order-0"} rounded-full font-medium`}

                  >
                    <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
                    {isOverdue(task.dueDate, task.completed) ? "Overdue" : (task.completed ? "Completed" : "Uncompleted")}
                    </span>
                    <span className=" sm:hidden w-6 h-6 grid place-items-center">
                      {task.completed ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </span>
                  </button>
                  <div className='flex'>
                    <BtnDeleteTask taskId={task._id} />
                  <BtnEditTask task={task} />
                  </div>
                  
                </div>
              </article>
            </li>
          ))}
          <li>
            <button
              onClick={onOpenModal}
              className={`border-2 border-slate-300 text-slate-400 w-full rounded-lg border-dashed transition hover:bg-slate-300 hover:text-slate-500 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${isListInView1 ? "h-20 sm:h-32" : "h-52 sm:h-64"
                }`}
            >
              Add new task
            </button>
          </li>
        </ul>

        {isOpen && (
          <ModalCreateTask
          open={isOpen}
            onClose={onCloseModal}
            nameForm="Create New Task"
          // onConfirm={handleConfirmTask}
          />
        )}
      </section>
    </div>
  )
}

export default LayoutTaskSort
