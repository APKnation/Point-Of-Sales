import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiHome, FiBox, FiUsers, FiShoppingCart, 
    FiSettings, FiLogOut, FiList, FiTrendingUp 
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { logout, userRole } = useAuth();

    const menuItems = [
        { path: '/dashboard', icon: <FiHome />, label: 'Dashboard', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
        { path: '/pos', icon: <FiShoppingCart />, label: 'POS', roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CASHIER'] },
        { path: '/products', icon: <FiBox />, label: 'Products', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
        { path: '/categories', icon: <FiList />, label: 'Categories', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
        { path: '/sales', icon: <FiTrendingUp />, label: 'Sales History', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
        { path: '/customers', icon: <FiUsers />, label: 'Customers', roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CASHIER'] },
        { path: '/reports', icon: <FiTrendingUp />, label: 'Reports', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
        { path: '/settings', icon: <FiSettings />, label: 'Settings', roles: ['ROLE_ADMIN'] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

    return (
        <div className={`bg-secondary text-white transition-all duration-300 flex flex-col ${isOpen ? 'w-64' : 'w-20'} flex-shrink-0`}>
            <div className="h-16 flex items-center justify-center border-b border-gray-700">
                <h1 className={`font-bold text-xl ${!isOpen && 'hidden'}`}>POS Pro</h1>
                {!isOpen && <span className="font-bold text-xl">P</span>}
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-2">
                    {filteredMenu.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                                    isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <div className={`flex-shrink-0 ${isOpen ? 'mr-3' : 'mx-auto'}`}>
                                    {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                                </div>
                                <span className={`${!isOpen && 'hidden'}`}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            
            <div className="p-4 border-t border-gray-700">
                <button 
                    onClick={logout}
                    className="flex items-center w-full px-3 py-2 text-gray-300 rounded-md hover:bg-danger hover:text-white transition-colors"
                >
                    <FiLogOut className={`w-5 h-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                    <span className={`${!isOpen && 'hidden'}`}>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
