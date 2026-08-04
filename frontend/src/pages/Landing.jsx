import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    FiCheckCircle, FiZap, FiShield, FiBarChart2, FiUsers, FiBox, FiClock,
    FiSmartphone, FiMonitor, FiCloud, FiChevronDown, FiStar, FiMail, FiMapPin, FiPhone, FiShoppingCart
} from 'react-icons/fi';

const Landing = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 scroll-smooth">
            {/* 1. Navbar */}
            <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="text-2xl font-bold text-primary flex items-center">
                    <span className="bg-gradient-to-br from-primary to-blue-400 text-white p-2 rounded-lg mr-2 shadow-sm">P</span>
                    POS Pro
                </div>
                <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
                    <a href="#features" className="hover:text-primary transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
                    <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                    <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
                </div>
                <div className="space-x-4">
                    <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">Log In</Link>
                    <Link to="/login" className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium">Get Started</Link>
                </div>
            </nav>

            {/* 2. Hero Section */}
            <header className="bg-white pt-28 pb-24 text-center px-4 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-transparent opacity-70"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-primary font-medium text-sm mb-8 border border-blue-100">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        POS Pro v2.0 is now live!
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-secondary tracking-tight mb-8 leading-[1.1]">
                        The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Point of Sale</span> For Modern Retail
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Manage inventory, process sales, and grow your business with a lightning-fast, cloud-based POS system designed for ambition.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/login" className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-blue-200 hover:-translate-y-1 hover:shadow-xl transition-all text-lg">
                            Start Your Free Trial
                        </Link>
                        <a href="#dashboard" className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transition-all text-lg">
                            See it in action
                        </a>
                    </div>
                    <p className="mt-6 text-sm text-gray-400">No credit card required. 14-day free trial.</p>
                </div>
            </header>

            {/* 3. Trusted By */}
            <section className="py-10 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by 5,000+ businesses worldwide</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale">
                        <div className="text-2xl font-black font-serif">TechStore</div>
                        <div className="text-2xl font-black font-sans tracking-tighter">FreshMart</div>
                        <div className="text-2xl font-black font-mono">Boutique.co</div>
                        <div className="text-2xl font-black font-sans italic">Cafe Bean</div>
                        <div className="text-2xl font-black tracking-widest">LUMINA</div>
                    </div>
                </div>
            </section>

            {/* 4. Features */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-secondary mb-4">Everything you need to succeed</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Powerful features wrapped in an incredibly easy-to-use interface.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <FiZap />, title: "Lightning Fast Checkout", desc: "Process transactions in seconds. Keep your lines moving and your customers happy." },
                            { icon: <FiBox />, title: "Inventory Management", desc: "Track stock levels in real-time. Get low-stock alerts before you run out." },
                            { icon: <FiBarChart2 />, title: "Real-time Analytics", desc: "Make data-driven decisions with comprehensive sales and performance reports." },
                            { icon: <FiUsers />, title: "Customer Loyalty", desc: "Build lasting relationships with built-in customer profiles and loyalty points." },
                            { icon: <FiShield />, title: "Bank-level Security", desc: "Your data is encrypted and securely backed up to the cloud automatically." },
                            { icon: <FiCloud />, title: "Multi-Store Ready", desc: "Manage one store or one hundred from a single, centralized dashboard." }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                                <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                                    {React.cloneElement(feature.icon, { className: 'w-6 h-6' })}
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. How It Works */}
            <section id="how-it-works" className="py-24 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-secondary mb-4">How it works</h2>
                        <p className="text-xl text-gray-500">Get up and running in minutes, not days.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gray-100 -z-10"></div>
                        {[
                            { step: "01", title: "Add your products", desc: "Import your inventory via CSV or add items manually with our intuitive interface." },
                            { step: "02", title: "Start selling", desc: "Use our blazing-fast POS interface to ring up customers and process payments." },
                            { step: "03", title: "Track & Grow", desc: "Watch your sales grow in real-time through the beautiful analytics dashboard." }
                        ].map((item, i) => (
                            <div key={i} className="text-center bg-white">
                                <div className="w-20 h-20 mx-auto bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-200 ring-8 ring-white">
                                    <span className="text-2xl font-bold">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Dashboard Preview */}
            <section id="dashboard" className="py-24 bg-gray-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
                
                <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-6">A dashboard you'll love using</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16">Clean, intuitive, and designed to give you total control over your business.</p>
                    
                    <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-2xl shadow-black/50 bg-gray-800 p-2 mx-auto max-w-5xl transform hover:scale-[1.02] transition-transform duration-500">
                        {/* Mock Dashboard UI */}
                        <div className="bg-gray-50 rounded-xl overflow-hidden h-[500px] flex text-left">
                            <div className="w-48 bg-white border-r border-gray-200 p-4 hidden sm:block">
                                <div className="h-6 w-24 bg-gray-200 rounded mb-8"></div>
                                <div className="space-y-4">
                                    {[1,2,3,4,5].map(i => <div key={i} className={`h-8 rounded ${i===1 ? 'bg-blue-50' : 'bg-gray-50'}`}></div>)}
                                </div>
                            </div>
                            <div className="flex-1 p-8">
                                <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
                                <div className="grid grid-cols-4 gap-4 mb-8">
                                    {[1,2,3,4].map(i => <div key={i} className="h-24 bg-white rounded-xl shadow-sm border border-gray-100"></div>)}
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-2 h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-end gap-2">
                                        {/* Mock Chart */}
                                        <div className="flex items-end h-full gap-2 px-4">
                                            {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                                                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{height: `${h}%`}}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-1 h-64 bg-white rounded-xl shadow-sm border border-gray-100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Benefits */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-secondary mb-6">Work smarter, not harder</h2>
                            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                Our platform automates the tedious parts of running a store, freeing you up to focus on what matters most: your customers and your growth.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Cut checkout time by up to 40%",
                                    "Reduce inventory shrinkage with accurate tracking",
                                    "Save 10+ hours a week on accounting and reports",
                                    "Access your business data from anywhere, anytime"
                                ].map((benefit, i) => (
                                    <li key={i} className="flex items-center text-gray-700 font-medium">
                                        <FiCheckCircle className="text-success w-6 h-6 mr-3 flex-shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-8">
                                <div className="bg-blue-50 rounded-2xl p-6 text-center">
                                    <p className="text-4xl font-black text-primary mb-2">40%</p>
                                    <p className="text-sm font-medium text-gray-600">Faster Checkout</p>
                                </div>
                                <div className="bg-green-50 rounded-2xl p-6 text-center">
                                    <p className="text-4xl font-black text-success mb-2">99%</p>
                                    <p className="text-sm font-medium text-gray-600">Uptime Reliability</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-purple-50 rounded-2xl p-6 text-center">
                                    <p className="text-4xl font-black text-purple-600 mb-2">10h+</p>
                                    <p className="text-sm font-medium text-gray-600">Saved Weekly</p>
                                </div>
                                <div className="bg-orange-50 rounded-2xl p-6 text-center">
                                    <p className="text-4xl font-black text-orange-500 mb-2">24/7</p>
                                    <p className="text-sm font-medium text-gray-600">Support Access</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Industries Served */}
            <section className="py-24 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-4xl font-bold text-secondary mb-4">Built for your industry</h2>
                    <p className="text-xl text-gray-500 mb-16">Flexible enough to handle any retail environment.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Retail & Apparel", icon: <FiShoppingCart /> },
                            { name: "Supermarkets", icon: <FiBox /> },
                            { name: "Electronics", icon: <FiMonitor /> },
                            { name: "Pharmacies", icon: <FiShield /> },
                        ].map((ind, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group cursor-pointer">
                                <div className="w-12 h-12 mx-auto bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white rounded-full flex items-center justify-center mb-4 transition-colors">
                                    {React.cloneElement(ind.icon, { className: 'w-5 h-5' })}
                                </div>
                                <h3 className="font-bold text-gray-800">{ind.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Pricing */}
            <section id="pricing" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-secondary mb-4">Simple, transparent pricing</h2>
                        <p className="text-xl text-gray-500">No hidden fees. Cancel anytime.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { name: "Basic", price: "29", desc: "Perfect for single-location small businesses.", features: ["1 Register", "Up to 1,000 Products", "Basic Reporting", "Email Support"] },
                            { name: "Pro", price: "79", desc: "For growing businesses that need more power.", features: ["3 Registers", "Unlimited Products", "Advanced Analytics", "Inventory Alerts", "24/7 Priority Support"], popular: true },
                            { name: "Enterprise", price: "199", desc: "Full-scale solution for retail chains.", features: ["Unlimited Registers", "Multi-store Management", "API Access", "Custom Integrations", "Dedicated Account Manager"] }
                        ].map((tier, i) => (
                            <div key={i} className={`bg-white rounded-3xl border ${tier.popular ? 'border-primary shadow-2xl relative scale-105 z-10' : 'border-gray-200 shadow-sm'} p-8 flex flex-col`}>
                                {tier.popular && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</span>}
                                <h3 className="text-2xl font-bold text-secondary mb-2">{tier.name}</h3>
                                <p className="text-gray-500 text-sm mb-6 h-10">{tier.desc}</p>
                                <div className="mb-8">
                                    <span className="text-5xl font-black text-secondary">${tier.price}</span>
                                    <span className="text-gray-500 font-medium">/mo</span>
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="flex items-center text-sm font-medium text-gray-700">
                                            <FiCheckCircle className="text-primary mr-3 w-5 h-5 flex-shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-4 rounded-xl font-bold transition-colors ${tier.popular ? 'bg-primary text-white hover:bg-blue-700' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}>
                                    Choose {tier.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. Testimonials */}
            <section className="py-24 bg-blue-50 border-y border-blue-100">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-4xl font-bold text-secondary mb-16">Loved by business owners</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Jenkins", role: "Owner, The Daily Grind", quote: "Switching to POS Pro was the best decision for my cafe. Training new cashiers takes 5 minutes, and the analytics helped me optimize my inventory." },
                            { name: "Marcus Chen", role: "Manager, TechHaven", quote: "The barcode scanning is incredibly fast, and the real-time stock alerts have completely eliminated our out-of-stock issues." },
                            { name: "Emily Rodriguez", role: "CEO, Style Boutique", quote: "Beautiful interface and rock-solid reliability. We processed over 500 transactions on Black Friday without a single hiccup." }
                        ].map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left relative">
                                <div className="flex text-yellow-400 mb-4">
                                    {[1,2,3,4,5].map(star => <FiStar key={star} className="fill-current w-4 h-4" />)}
                                </div>
                                <p className="text-gray-600 italic mb-6">"{t.quote}"</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                    <div>
                                        <h4 className="font-bold text-sm text-secondary">{t.name}</h4>
                                        <p className="text-xs text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. Statistics */}
            <section className="py-20 bg-primary text-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
                        <div>
                            <div className="text-4xl md:text-5xl font-black mb-2">10M+</div>
                            <div className="text-blue-100 font-medium text-sm uppercase tracking-wide">Transactions Processed</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black mb-2">5,000+</div>
                            <div className="text-blue-100 font-medium text-sm uppercase tracking-wide">Active Stores</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black mb-2">$2B+</div>
                            <div className="text-blue-100 font-medium text-sm uppercase tracking-wide">Sales Volume</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black mb-2">99.9%</div>
                            <div className="text-blue-100 font-medium text-sm uppercase tracking-wide">Uptime</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 12. FAQ */}
            <section id="faq" className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: "What hardware do I need?", a: "POS Pro runs in any modern web browser. You can use your existing PC, Mac, iPad, or Android tablet. It integrates seamlessly with standard USB/Bluetooth barcode scanners and receipt printers." },
                            { q: "Can I use it offline?", a: "POS Pro is primarily cloud-based to ensure real-time syncing across devices. However, our Pro and Enterprise plans offer an offline mode that syncs automatically once your connection is restored." },
                            { q: "How easy is it to import my existing inventory?", a: "Very easy! You can upload a standard CSV file with your product details, barcodes, and stock levels, and our system will instantly populate your store database." },
                            { q: "Is there a contract or commitment?", a: "No. POS Pro operates on a month-to-month subscription. You can upgrade, downgrade, or cancel your account at any time without penalty." }
                        ].map((faq, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                                <button 
                                    className="w-full px-6 py-4 text-left font-bold text-secondary flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                                    onClick={() => toggleFaq(i)}
                                >
                                    {faq.q}
                                    <FiChevronDown className={`transform transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                {activeFaq === i && (
                                    <div className="px-6 py-4 text-gray-600 bg-white border-t border-gray-100">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. Call To Action */}
            <section className="bg-secondary py-24 px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to transform your retail business?</h2>
                    <p className="text-gray-400 mb-10 text-lg">Join thousands of merchants who are growing their businesses with POS Pro. Start your 14-day free trial today.</p>
                    <Link to="/login" className="inline-block px-10 py-5 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-blue-900/50 hover:shadow-2xl hover:scale-105 transition-all">
                        Create Your Free Account
                    </Link>
                </div>
            </section>

            {/* 14. Contact & 15. Footer */}
            <footer className="bg-gray-900 text-gray-400 pt-20 pb-10 px-8 border-t border-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="text-2xl font-bold text-white flex items-center mb-6">
                                <span className="bg-primary text-white p-1.5 rounded-lg mr-2 text-sm">P</span>
                                POS Pro
                            </div>
                            <p className="text-sm leading-relaxed mb-6">
                                The smartest, fastest, and most reliable point of sale system for modern retail businesses.
                            </p>
                            <div className="flex space-x-4">
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors">in</div>
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors">tw</div>
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors">fb</div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-white font-bold mb-6">Product</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Hardware</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Updates</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-white font-bold mb-6">Company</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Contact Section within Footer */}
                        <div>
                            <h4 className="text-white font-bold mb-6">Contact Us</h4>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start">
                                    <FiMapPin className="mr-3 mt-1 text-gray-500 shrink-0" />
                                    <span>100 Innovation Drive,<br/>Tech City, TC 90210</span>
                                </li>
                                <li className="flex items-center">
                                    <FiPhone className="mr-3 text-gray-500 shrink-0" />
                                    <span>+1 (800) 123-4567</span>
                                </li>
                                <li className="flex items-center">
                                    <FiMail className="mr-3 text-gray-500 shrink-0" />
                                    <span>support@pospro.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
                        <p>&copy; {new Date().getFullYear()} POS Pro Technologies Inc. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
