import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import Modal from '../components/Modal';
import { confirmDelete } from '../components/ConfirmDialog';
import Swal from 'sweetalert2';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [form, setForm] = useState({ name: '', description: '' });

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getAllCategories();
            setCategories(res.data);
        } catch (err) {
            Swal.fire('Error', 'Failed to load categories', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const openModal = (category = null) => {
        if (category) { setEditingCategory(category); setForm({ ...category }); }
        else { setEditingCategory(null); setForm({ name: '', description: '' }); }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) { await updateCategory(editingCategory.id, form); }
            else { await createCategory(form); }
            Swal.fire({ icon: 'success', title: 'Success!', timer: 1500, showConfirmButton: false });
            setIsModalOpen(false); fetchData();
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Action failed', 'error');
        }
    };

    const handleDelete = async (category) => {
        if (await confirmDelete(category.name)) {
            try { await deleteCategory(category.id); fetchData(); }
            catch { Swal.fire('Error', 'Could not delete category', 'error'); }
        }
    };

    const filtered = categories.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-secondary">Categories</h1>
                <button onClick={() => openModal()} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <FiPlus className="mr-2" /> Add Category
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-4 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search categories..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {loading ? (
                    <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>{['#', 'Name', 'Description', 'Actions'].map(h => (
                                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtered.map((c, i) => (
                                    <tr key={c.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-500">{i + 1}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-secondary">{c.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{c.description}</td>
                                        <td className="px-6 py-4 text-sm flex space-x-2">
                                            <button onClick={() => openModal(c)} className="text-primary hover:text-blue-700"><FiEdit2 className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(c)} className="text-danger hover:text-red-700"><FiTrash2 className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No categories found.</div>}
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} title={editingCategory ? 'Edit Category' : 'Add Category'} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category Name *</label>
                        <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">{editingCategory ? 'Update' : 'Save'}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Categories;
