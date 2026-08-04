import React, { useState, useEffect, useRef } from 'react';
import { FiTrash2, FiSearch, FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { getAllProducts, getProductByBarcode } from '../services/productService';
import { getAllCustomers } from '../services/customerService';
import { createSale } from '../services/saleService';
import Swal from 'sweetalert2';

const POS = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [barcodeInput, setBarcodeInput] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('CASH');
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(10); // 10% default tax
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const barcodeRef = useRef(null);

    useEffect(() => {
        Promise.all([getAllProducts(), getAllCustomers()])
            .then(([prodRes, custRes]) => {
                setProducts(prodRes.data.filter(p => p.status === 'ACTIVE' && p.quantity > 0));
                setCustomers(custRes.data);
            })
            .catch(() => Swal.fire('Error', 'Failed to load data', 'error'));
        barcodeRef.current?.focus();
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(i => i.productId === product.id);
            if (existing) {
                if (existing.quantity >= product.quantity) {
                    Swal.fire({ icon: 'warning', title: 'Stock Limit', text: 'Insufficient stock!', timer: 1500, showConfirmButton: false });
                    return prev;
                }
                return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.unitPrice } : i);
            }
            return [...prev, { productId: product.id, productName: product.productName, unitPrice: parseFloat(product.sellingPrice), quantity: 1, discount: 0, total: parseFloat(product.sellingPrice), maxQty: product.quantity }];
        });
    };

    const updateQty = (productId, delta) => {
        setCart(prev => prev.map(i => {
            if (i.productId !== productId) return i;
            const newQty = Math.max(1, Math.min(i.quantity + delta, i.maxQty));
            return { ...i, quantity: newQty, total: newQty * i.unitPrice };
        }));
    };

    const removeFromCart = (productId) => setCart(prev => prev.filter(i => i.productId !== productId));

    const clearCart = () => setCart([]);

    const subTotal = cart.reduce((acc, i) => acc + i.total, 0);
    const taxAmount = (subTotal * tax) / 100;
    const discountAmount = parseFloat(discount) || 0;
    const grandTotal = subTotal + taxAmount - discountAmount;

    const handleBarcodeSearch = async (e) => {
        if (e.key === 'Enter' && barcodeInput.trim()) {
            try {
                const res = await getProductByBarcode(barcodeInput.trim());
                addToCart(res.data);
                setBarcodeInput('');
            } catch {
                Swal.fire({ icon: 'error', title: 'Not Found', text: `No product with barcode: ${barcodeInput}`, timer: 2000, showConfirmButton: false });
            }
        }
    };

    const handleCheckout = async () => {
        if (cart.length === 0) { Swal.fire('Empty Cart', 'Please add items to the cart.', 'warning'); return; }
        try {
            setLoading(true);
            const saleData = {
                customerId: customerId || null,
                subTotal, tax: taxAmount, discount: discountAmount, grandTotal,
                paymentMethod, notes,
                items: cart.map(i => ({ productId: i.productId, quantity: i.quantity, unitPrice: i.unitPrice, discount: i.discount, total: i.total }))
            };
            const res = await createSale(saleData);
            Swal.fire({ icon: 'success', title: `Sale Completed!`, text: `Receipt: ${res.data.receiptNumber}`, timer: 2500, showConfirmButton: false });
            clearCart();
            setCustomerId(''); setDiscount(0); setNotes('');
            // Refresh products to update stock
            const prodRes = await getAllProducts();
            setProducts(prodRes.data.filter(p => p.status === 'ACTIVE' && p.quantity > 0));
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Checkout failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.productName?.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-full gap-6">
            {/* Left: Products Panel */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex gap-3 mb-4">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <input
                        ref={barcodeRef}
                        type="text" placeholder="Scan barcode..."
                        className="w-48 px-3 py-2.5 border-2 border-primary rounded-lg font-mono focus:outline-none"
                        value={barcodeInput} onChange={e => setBarcodeInput(e.target.value)} onKeyDown={handleBarcodeSearch}
                    />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                        {filteredProducts.map(p => (
                            <button key={p.id} onClick={() => addToCart(p)} className="bg-white rounded-xl p-4 border border-gray-100 text-left hover:border-primary hover:shadow-md transition-all group">
                                <div className="w-full h-20 bg-gray-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                    <FiShoppingCart className="w-8 h-8 text-gray-400 group-hover:text-primary" />
                                </div>
                                <p className="text-sm font-medium text-secondary truncate">{p.productName}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Stock: {p.quantity}</p>
                                <p className="text-primary font-bold mt-1">${parseFloat(p.sellingPrice).toFixed(2)}</p>
                            </button>
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="col-span-4 text-center py-16 text-gray-400">No products found.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Cart Panel */}
            <div className="w-96 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="font-bold text-secondary text-lg">Cart</h2>
                    {cart.length > 0 && <button onClick={clearCart} className="text-xs text-danger hover:underline">Clear All</button>}
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <FiShoppingCart className="w-12 h-12 mb-3" />
                            <p>Cart is empty</p>
                        </div>
                    ) : cart.map(item => (
                        <div key={item.productId} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-secondary truncate">{item.productName}</p>
                                <p className="text-xs text-gray-500">${item.unitPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => updateQty(item.productId, -1)} className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"><FiMinus className="w-3 h-3" /></button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <button onClick={() => updateQty(item.productId, 1)} className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"><FiPlus className="w-3 h-3" /></button>
                            </div>
                            <span className="text-sm font-bold text-primary w-16 text-right">${item.total.toFixed(2)}</span>
                            <button onClick={() => removeFromCart(item.productId)} className="text-danger ml-1"><FiTrash2 className="w-4 h-4" /></button>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t space-y-3">
                    <div>
                        <label className="text-xs font-medium text-gray-600">Customer</label>
                        <select className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" value={customerId} onChange={e => setCustomerId(e.target.value)}>
                            <option value="">Walk-in Customer</option>
                            {customers.map(c => <option key={c.id} value={c.id}>{c.customerName}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs font-medium text-gray-600">Tax (%)</label>
                            <input type="number" className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" value={tax} onChange={e => setTax(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-600">Discount ($)</label>
                            <input type="number" className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-600">Payment Method</label>
                        <select className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                            <option value="CASH">Cash</option>
                            <option value="CARD">Card</option>
                            <option value="MOBILE_MONEY">Mobile Money</option>
                        </select>
                    </div>

                    <div className="space-y-1 text-sm border-t pt-2">
                        <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subTotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-gray-500"><span>Tax ({tax}%)</span><span>${taxAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between text-gray-500"><span>Discount</span><span>-${discountAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-base border-t pt-1"><span>Total</span><span className="text-success">${grandTotal.toFixed(2)}</span></div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={loading || cart.length === 0}
                        className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : `Complete Sale • $${grandTotal.toFixed(2)}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default POS;
