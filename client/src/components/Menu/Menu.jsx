import React, { useState } from 'react'
import LayoutMenus from '../../layout/DefaultLayout'
import AddTaskButton from '../../atoms/Searchbox'

import DefaultLayout from '../../layout/DefaultLayout'
import LayoutTaskSort from '../../layout/LayoutTaskSort'
import ModalCreateTask from '../../atoms/ModelFrorm'

const Menu = ({ condition }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };



  return (
    <DefaultLayout className="left-0" onSearch={handleSearch}>
     <LayoutTaskSort title="All tasks" condition={condition} searchTerm={searchTerm}></LayoutTaskSort>;
     
        </DefaultLayout>
  )
}

export default Menu
