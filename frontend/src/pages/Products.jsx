import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { getAllCategories } from '../services/categoryService';
import Modal from '../components/Modal';
import { confirmDelete } from '../components/ConfirmDialog';
import Swal from 'sweetalert2';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState({
        productName: '', barcode: '', sku: '', categoryId: '',
        costPrice: '', sellingPrice: '', quantity: '', reorderLevel: '',
        description: '', status: 'ACTIVE'
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [prodRes, catRes] = await Promise.all([getAllProducts(), getAllCategories()]);
            setProducts(prodRes.data);
            setCategories(catRes.data);
        } catch (err) {
            Swal.fire('Error', 'Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setForm({ ...product, categoryId: product.categoryId || '' });
        } else {
            setEditingProduct(null);
            setForm({ productName: '', barcode: '', sku: '', categoryId: '', costPrice: '', sellingPrice: '', quantity: '', reorderLevel: '', description: '', status: 'ACTIVE' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, form);
                Swal.fire({ icon: 'success', title: 'Product Updated!', timer: 1500, showConfirmButton: false });
            } else {
                await createProduct(form);
                Swal.fire({ icon: 'success', title: 'Product Created!', timer: 1500, showConfirmButton: false });
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Action failed', 'error');
        }
    };

    const handleDelete = async (product) => {
        const confirmed = await confirmDelete(product.productName);
        if (confirmed) {
            try {
                await deleteProduct(product.id);
                Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1500, showConfirmButton: false });
                fetchData();
            } catch (err) {
                Swal.fire('Error', 'Could not delete product', 'error');
            }
        }
    };

    const filtered = products.filter(p =>
        p.productName?.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-secondary">Products</h1>
                <button onClick={() => openModal()} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <FiPlus className="mr-2" /> Add Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-4 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products by name or barcode..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['#', 'Product Name', 'Barcode', 'Category', 'Cost', 'Price', 'Qty', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtered.map((p, i) => (
                                    <tr key={p.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-500">{i + 1}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-secondary">{p.productName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{p.barcode || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{categories.find(c => c.id === p.categoryId)?.name || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">${p.costPrice}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-success">${p.sellingPrice}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`font-medium ${p.quantity <= 0 ? 'text-danger' : p.quantity <= (p.reorderLevel || 10) ? 'text-warning' : 'text-success'}`}>
                                                {p.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm flex space-x-2">
                                            <button onClick={() => openModal(p)} className="text-primary hover:text-blue-700">
                                                <FiEdit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(p)} className="text-danger hover:text-red-700">
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filtered.length === 0 && (
                            <div className="text-center py-12 text-gray-400">No products found.</div>
                        )}
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} title={editingProduct ? 'Edit Product' : 'Add Product'} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                            <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.productName} onChange={e => setForm({ ...form, productName: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Barcode</label>
                            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.barcode} onChange={e => setForm({ ...form, barcode: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">SKU</label>
                            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cost Price *</label>
                            <input required type="number" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.costPrice} onChange={e => setForm({ ...form, costPrice: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Selling Price *</label>
                            <input required type="number" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.sellingPrice} onChange={e => setForm({ ...form, sellingPrice: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity *</label>
                            <input required type="number" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Reorder Level</label>
                            <input type="number" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.reorderLevel} onChange={e => setForm({ ...form, reorderLevel: e.target.value })} />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea rows={2} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">{editingProduct ? 'Update' : 'Save'}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Products;
