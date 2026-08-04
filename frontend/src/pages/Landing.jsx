import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiCheckCircle, FiShoppingCart, FiCreditCard, FiZap, FiShield, FiBarChart2 } from 'react-icons/fi';

const Landing = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products using standard axios to bypass auth interceptor if any issues
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products');
                setProducts(res.data.slice(0, 4)); // Show only top 4 for landing
            } catch (err) {
                console.error("Failed to load products", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="text-2xl font-bold text-primary flex items-center">
                    <span className="bg-primary text-white p-2 rounded-lg mr-2">P</span>
                    POS Pro
                </div>
                <div className="space-x-4">
                    <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">Sign In</Link>
                    <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-white pt-24 pb-32 text-center px-4 border-b border-gray-100">
                <h1 className="text-5xl md:text-6xl font-extrabold text-secondary tracking-tight mb-6 leading-tight">
                    Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">POS System</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Streamline your retail operations, manage inventory seamlessly, and provide an effortless checkout experience for your customers.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="#products" className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-blue-200 hover:-translate-y-1 hover:shadow-xl transition-all">Explore Products</a>
                    <a href="#how-it-works" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition-colors">How it works</a>
                </div>
            </header>

            {/* Core Features */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-secondary mb-4">Why Choose POS Pro?</h2>
                        <p className="text-gray-500">Everything you need to run your retail business efficiently.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                                <FiZap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Lightning Fast</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Our optimized barcode scanning and checkout flow ensures your queues keep moving, even during rush hours.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-green-50 text-green-500 rounded-xl flex items-center justify-center mb-6">
                                <FiBarChart2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Real-time Analytics</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Make data-driven decisions with real-time sales dashboards, inventory tracking, and comprehensive reports.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mb-6">
                                <FiShield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Secure & Reliable</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Built on enterprise-grade architecture with role-based access control to keep your business data safe.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="products" className="py-20 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-secondary mb-4">Featured Products</h2>
                    <p className="text-gray-500">Discover some of the top-rated items available in our store right now.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.length > 0 ? products.map(product => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 transition-colors">
                                {/* Placeholder for product image */}
                                <FiShoppingCart className="w-12 h-12 opacity-20" />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider">{product.categoryName || 'Retail'}</span>
                                <h3 className="text-lg font-bold text-secondary mt-3 mb-1 line-clamp-1">{product.productName}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description || 'Premium quality product for everyday use.'}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-extrabold text-secondary">${product.sellingPrice.toFixed(2)}</span>
                                    <span className={`text-sm font-medium ${product.quantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {product.quantity > 0 ? 'In Stock' : 'Sold Out'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center text-gray-400 py-12">Loading products...</div>
                    )}
                </div>
            </section>

            {/* How it works (Customer Instructions) */}
            <section id="how-it-works" className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-secondary mb-4">How to Shop with Us</h2>
                        <p className="text-gray-500">A simple, seamless experience from start to finish.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <div className="w-20 h-20 mx-auto bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <span className="text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Browse & Select</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Walk into our store and browse our wide selection of high-quality products. Pick out everything you need.
                            </p>
                        </div>
                        <div>
                            <div className="w-20 h-20 mx-auto bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <span className="text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Go to Counter</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Bring your items to our modern Point of Sale checkout counter. Our cashiers will rapidly scan your items.
                            </p>
                        </div>
                        <div>
                            <div className="w-20 h-20 mx-auto bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <span className="text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Quick Payment</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Pay via cash or card. Instantly receive your digital or printed receipt and enjoy your purchase!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-20 px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to upgrade your store?</h2>
                    <p className="text-blue-100 mb-10 text-lg">Join thousands of merchants who are growing their businesses with POS Pro.</p>
                    <Link to="/login" className="inline-block px-10 py-4 bg-white text-primary rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                        Get Started Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-secondary text-gray-400 py-12 text-center">
                <p>&copy; {new Date().getFullYear()} POS Pro. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
