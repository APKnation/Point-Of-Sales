import os

base_path = "src"

files = {
    "services/productService.js": """import api from './api';

export const getAllProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const getProductByBarcode = (barcode) => api.get(`/products/barcode/${barcode}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
""",
    "services/categoryService.js": """import api from './api';

export const getAllCategories = () => api.get('/categories');
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
""",
    "services/customerService.js": """import api from './api';

export const getAllCustomers = () => api.get('/customers');
export const createCustomer = (data) => api.post('/customers', data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);
""",
    "services/saleService.js": """import api from './api';

export const getAllSales = () => api.get('/sales');
export const getSaleById = (id) => api.get(`/sales/${id}`);
export const createSale = (data) => api.post('/sales', data);
""",
    "components/Modal.jsx": """import React from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, title, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="bg-white rounded-xl shadow-xl z-10 w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-bold text-secondary">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-danger">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
""",
    "components/ConfirmDialog.jsx": """import Swal from 'sweetalert2';

export const confirmDelete = async (itemName = 'this item') => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete ${itemName}. This cannot be undone!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#64748B',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    });
    return result.isConfirmed;
};

export default confirmDelete;
""",
    "pages/Products.jsx": """import React, { useState, useEffect } from 'react';
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
""",
    "pages/Customers.jsx": """import React, { useState, useEffect } from 'react';
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
""",
    "pages/SalesHistory.jsx": """import React, { useState, useEffect } from 'react';
import { FiEye, FiSearch } from 'react-icons/fi';
import { getAllSales } from '../services/saleService';
import Modal from '../components/Modal';
import Swal from 'sweetalert2';

const SalesHistory = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedSale, setSelectedSale] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const res = await getAllSales();
                setSales(res.data);
            } catch {
                Swal.fire('Error', 'Failed to load sales', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchSales();
    }, []);

    const filtered = sales.filter(s =>
        s.receiptNumber?.toLowerCase().includes(search.toLowerCase()) ||
        s.paymentMethod?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Sales History</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-4 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search by receipt number or payment method..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                {loading ? (
                    <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>{['#', 'Receipt No.', 'Date', 'Payment', 'Total', 'Actions'].map(h => (
                                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtered.map((s, i) => (
                                    <tr key={s.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-500">{i + 1}</td>
                                        <td className="px-6 py-4 text-sm font-mono font-medium text-secondary">{s.receiptNumber}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(s.saleDate).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{s.paymentMethod}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-success">${s.grandTotal?.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <button onClick={() => setSelectedSale(s)} className="text-primary hover:text-blue-700"><FiEye className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No sales found.</div>}
                    </div>
                )}
            </div>

            <Modal isOpen={!!selectedSale} title={`Receipt: ${selectedSale?.receiptNumber}`} onClose={() => setSelectedSale(null)}>
                {selectedSale && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="text-gray-500">Date:</span><p className="font-medium">{new Date(selectedSale.saleDate).toLocaleString()}</p></div>
                            <div><span className="text-gray-500">Payment:</span><p className="font-medium">{selectedSale.paymentMethod}</p></div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
                            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                                {selectedSale.items?.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span>Product #{item.productId} x{item.quantity}</span>
                                        <span className="font-medium">${item.total?.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t pt-3 space-y-1 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${selectedSale.subTotal?.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>${selectedSale.tax?.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Discount</span><span>-${selectedSale.discount?.toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span className="text-success">${selectedSale.grandTotal?.toFixed(2)}</span></div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default SalesHistory;
"""
}

for filepath, content in files.items():
    with open(os.path.join(base_path, filepath), "w") as f:
        f.write(content)

print("Services, Product, Customer, and SalesHistory pages created successfully.")
