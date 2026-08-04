import React, { useState, useEffect } from 'react';
import { FiEye, FiSearch } from 'react-icons/fi';
import { getAllSales } from '../services/saleService';
import Modal from '../components/Modal';
import { formatTZS } from '../utils/currency';
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
                                        <td className="px-6 py-4 text-sm font-bold text-success">{formatTZS(s.grandTotal)}</td>
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
                                        <span>{formatTZS(item.total)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t pt-3 space-y-1 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatTZS(selectedSale.subTotal)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>{formatTZS(selectedSale.tax)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Discount</span><span>-{formatTZS(selectedSale.discount)}</span></div>
                            <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span className="text-success">{formatTZS(selectedSale.grandTotal)}</span></div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default SalesHistory;
