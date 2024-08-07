import { Link } from 'react-router-dom';
import avatar from '../../assets/pngegg (7).png'
import { List } from '@phosphor-icons/react';
import Searchbox from '../../atoms/Searchbox';
import { useState } from 'react';
import useLogout from '../../hooks/useLogout';

const Header = ({ sidebarOpen, setSidebarOpen ,onSearch}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, loading, error } = useLogout();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action) => {
    console.log(action);
    // Add logic to handle menu item actions
    setIsOpen(false); // Close the dropdown after an action
  };

  return (
    <header className="sticky top-0 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <List />
          </button>
        </div>
        
        {/* Main header content */}
        <div className="flex items-center justify-between flex-grow">
        <Searchbox onSearch={onSearch} className="min-w-max" />

          <button className="block ml-4" onClick={toggleDropdown}>
            <img
              src={avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>
          {isOpen && (
        <div className="absolute right-0 mt-24 mr-5 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="py-2">
          
            <li>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
        </div>
      </div>
    </header>
  );
};

export default Header;
