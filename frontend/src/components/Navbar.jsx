import React from 'react';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';

const Navbar = ({ toggleSidebar }) => {
    return (
        <header className="h-16 flex items-center justify-between px-6 z-10 flex-shrink-0"
            style={{ background: '#1f1633', borderBottom: '1px solid #362d59' }}>
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="transition-colors"
                    style={{ color: '#79628c' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c2ef4e'}
                    onMouseLeave={e => e.currentTarget.style.color = '#79628c'}
                >
                    <FiMenu className="w-5 h-5" />
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative transition-colors" style={{ color: '#79628c' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c2ef4e'}
                    onMouseLeave={e => e.currentTarget.style.color = '#79628c'}>
                    <FiBell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full"
                        style={{ background: '#fa7faa', border: '2px solid #1f1633' }}></span>
                </button>

                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: '#422082', border: '2px solid #362d59' }}>
                        <FiUser className="w-4 h-4" style={{ color: '#c2ef4e' }} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
