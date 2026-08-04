import React from 'react';
import { FiSave } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Settings = () => {
    const handleSave = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Settings Saved',
            text: 'Your system settings have been updated.',
            timer: 1500,
            showConfirmButton: false
        });
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-2xl font-bold text-secondary">System Settings</h1>
            
            <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-secondary mb-4">Store Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Store Name</label>
                            <input type="text" defaultValue="POS Pro Store" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                            <input type="email" defaultValue="contact@pospro.com" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="text" defaultValue="+1800POS001" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" defaultValue="100 Commerce Street" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-secondary mb-4">Preferences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Currency</label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2">
                                <option>TZS (TSh)</option>
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tax Percentage (%)</label>
                            <input type="number" defaultValue="10" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="flex items-center bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <FiSave className="mr-2" /> Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
