import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';

const Unauthorized = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100 text-center">
                <div className="flex justify-center text-red-500 mb-6">
                    <FiShield className="w-16 h-16" />
                </div>
                <h1 className="text-2xl font-bold text-secondary mb-2">Access Denied</h1>
                <p className="text-gray-500 mb-8">
                    You do not have permission to view this page. If you believe this is an error, please contact your administrator.
                </p>
                <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;
