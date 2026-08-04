import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';
import Modal from '../components/Modal';
import { confirmDelete } from '../components/ConfirmDialog';
import Swal from 'sweetalert2';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [form, setForm] = useState({ customerName: '', phone: '', email: '', address: '' });

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getAllCustomers();
            setCustomers(res.data);
        } catch (err) {
            Swal.fire('Error', 'Failed to load customers', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const openModal = (customer = null) => {
        if (customer) { setEditingCustomer(customer); setForm({ ...customer }); }
        else { setEditingCustomer(null); setForm({ customerName: '', phone: '', email: '', address: '' }); }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCustomer) { await updateCustomer(editingCustomer.id, form); }
            else { await createCustomer(form); }
            Swal.fire({ icon: 'success', title: 'Success!', timer: 1500, showConfirmButton: false });
            setIsModalOpen(false); fetchData();
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Action failed', 'error');
        }
    };

    const handleDelete = async (customer) => {
        if (await confirmDelete(customer.customerName)) {
            try { await deleteCustomer(customer.id); fetchData(); }
            catch { Swal.fire('Error', 'Could not delete', 'error'); }
        }
    };

    const filtered = customers.filter(c =>
        c.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        c.phone?.includes(search) || c.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-secondary">Customers</h1>
                <button onClick={() => openModal()} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <FiPlus className="mr-2" /> Add Customer
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-4 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search customers..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {loading ? (
                    <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>{['#', 'Name', 'Phone', 'Email', 'Address', 'Loyalty Pts', 'Actions'].map(h => (
                                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtered.map((c, i) => (
                                    <tr key={c.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-500">{i + 1}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-secondary">{c.customerName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{c.phone}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{c.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{c.address}</td>
                                        <td className="px-6 py-4 text-sm"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">{c.loyaltyPoints || 0} pts</span></td>
                                        <td className="px-6 py-4 text-sm flex space-x-2">
                                            <button onClick={() => openModal(c)} className="text-primary hover:text-blue-700"><FiEdit2 className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(c)} className="text-danger hover:text-red-700"><FiTrash2 className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No customers found.</div>}
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} title={editingCustomer ? 'Edit Customer' : 'Add Customer'} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer Name *</label>
                        <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea rows={2} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">{editingCustomer ? 'Update' : 'Save'}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Customers;
