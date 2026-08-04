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
        <div className={`flex flex-col flex-shrink-0 transition-all duration-300 ${isOpen ? 'w-60' : 'w-[72px]'}`}
            style={{ background: '#1f1633', borderRight: '1px solid #362d59' }}>

            {/* Logo */}
            <div className="h-16 flex items-center px-4 gap-3" style={{ borderBottom: '1px solid #362d59' }}>
                <div className="flex-shrink-0">
                    <span style={{
                        background: '#c2ef4e', color: '#1f1633',
                        borderRadius: 6, padding: '2px 7px',
                        fontWeight: 900, fontSize: 13, letterSpacing: '.04em'
                    }}>POS</span>
                </div>
                {isOpen && <span style={{ color: '#e8e4ed', fontWeight: 700, fontSize: 16 }}>Pro</span>}
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                {filteredMenu.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={!isOpen ? item.label : ''}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
                            style={{
                                background: isActive ? 'rgba(194,239,78,.12)' : 'transparent',
                                color: isActive ? '#c2ef4e' : '#79628c',
                                fontWeight: isActive ? 600 : 500,
                                fontSize: 14,
                                borderLeft: isActive ? '2px solid #c2ef4e' : '2px solid transparent',
                            }}
                            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#e8e4ed'; e.currentTarget.style.background = 'rgba(255,255,255,.04)'; }}}
                            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#79628c'; e.currentTarget.style.background = 'transparent'; }}}
                        >
                            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                {React.cloneElement(item.icon, { className: 'w-4 h-4' })}
                            </span>
                            {isOpen && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </div>

            {/* Logout */}
            <div className="p-3" style={{ borderTop: '1px solid #362d59' }}>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all"
                    style={{ color: '#79628c', fontSize: 14, fontWeight: 500 }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(250,127,170,.12)'; e.currentTarget.style.color = '#fa7faa'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#79628c'; }}
                >
                    <FiLogOut className="w-4 h-4 flex-shrink-0" />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
