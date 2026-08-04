import React from 'react';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';

const Navbar = ({ toggleSidebar }) => {
    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
            <div className="flex items-center">
                <button 
                    onClick={toggleSidebar}
                    className="text-gray-500 hover:text-primary focus:outline-none"
                >
                    <FiMenu className="w-6 h-6" />
                </button>
            </div>
            
            <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-primary relative">
                    <FiBell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger ring-2 ring-white"></span>
                </button>
                
                <div className="flex items-center cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        <FiUser className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
