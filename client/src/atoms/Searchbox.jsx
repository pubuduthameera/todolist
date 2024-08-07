
import React, { useState } from 'react'


const Searchbox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
    return (
        <>
        <div>
       <div className="max-w-md mx-auto">
  <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-black overflow-hidden">
    <div className="grid place-items-center h-full w-12 text-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input className="peer bg-black text-white h-full w-full outline-none text-sm  pr-2" type="text" id="search" placeholder="Search something.." 
        value={searchTerm}
        onChange={handleChange}/> 
  </div>
</div>     
        </div>
        </>
    )
}

export default Searchbox
