import React from 'react'
import { ArrowLeft, ArrowRight, CaretLeft, CaretRight, Check, CirclesFour, ListDashes, PencilSimple, Plus, ShareFat, User, UsersThree } from "@phosphor-icons/react"

const SortButton = ({isListInView1,sortedBy,setSortedBy,setIsListInView1}) => {
    
const sortValues = [
    { value: "order-added", title: "Order added" },
    { value: "min-date", title: "Earlier first" },
    { value: "max-date", title: "Later first" },
    { value: "completed-first", title: "Completed first" },
    { value: "uncompleted-first", title: "Uncompleted first" },
  ]

  return (
    <div className=''>

    <div className=" flex children-styles ">
      <button onClick={() => setIsListInView1(true)} title="view in list">
      <ListDashes size={32} color="#5f5d5d" className={!isListInView1 ? "text-violet-600" : ""}/>
      </button>
      <button onClick={() => setIsListInView1(false)} title="view in grid">
        <CirclesFour className={!isListInView1 ? "text-violet-600" : ""} />
      </button>
      <select
        className="ml-auto inputStyles"
        value={sortedBy}
        onChange={({ target }) => setSortedBy(target.value)}
      >
        <option value="" disabled>
          Sort by
        </option>
        {sortValues.map((val) => (
          <option
            key={val.value}
            value={val.value}
            className="bg-slate-100 dark:bg-slate-800"
          >
            {val.title}
          </option>
        ))}
      </select>
</div>
    </div>
  )
}

export default SortButton
