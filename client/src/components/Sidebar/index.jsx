import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import AddTaskButton from '../../atoms/Searchbox';
import { X } from '@phosphor-icons/react';
// import Logo from '../../images/logo/logo.svg';



const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 flex h-screen w-72.5 flex-col sm:overflow-auto lg:overflow-y-hidden duration-300 ease-linear border-r bg-black lg:static text-white lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{zIndex:1}}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="relative flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
  <button
    ref={trigger}
    onClick={() => setSidebarOpen(!sidebarOpen)}
    aria-controls="sidebar"
    aria-expanded={sidebarOpen}
    className="absolute mt-8  right-3 block lg:hidden"
  >
    <X/>
    {/* <svg
      className="fill-current"
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
        fill=""
      />
    </svg> */}
  </button>
</div>

 

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" pb-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="font-bold uppercase text-center mb-8 text-lg tracking-wide hidden xl:block">
              To-Do-List
            </h3>
            {/* <AddTaskButton className="my-8 mx-4" /> */}
            <ul className="mb-6 flex mt-5 flex-col gap-1.5">
             
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/todaytask"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                           ${pathname === '/todaytask'? "activesidebar" :""} 
                          ${
                          (pathname === '/todaytask' ||
                            pathname.includes('todaytask')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                    Today's tasks
                       
                      </NavLink>
                  
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <NavLink
                  to="/alltask"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                   ${pathname === '/alltask'? "activesidebar" :""} 
                    ${
                    pathname.includes('alltask') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                
                  All Tasks
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/completetask"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                   ${pathname === '/completetask'? "activesidebar" :""} 
                    ${
                    pathname.includes('completetask') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                
                Completed tasks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/incompletetask"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                    ${pathname === '/incompletetask'? "activesidebar" :""} 
                    ${
                    pathname.includes('incompletetask') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                
                Uncompleted tasks
                </NavLink>
              </li>
             
            </ul>
          </div>

        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
