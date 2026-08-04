import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiCheckCircle, FiZap, FiShield, FiBarChart2, FiUsers, FiBox,
    FiMonitor, FiCloud, FiChevronDown, FiStar, FiMail, FiMapPin, FiPhone, FiShoppingCart
} from 'react-icons/fi';

const Landing = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const toggleFaq = (i) => setActiveFaq(activeFaq === i ? null : i);

    return (
        <div style={{ fontFamily: "'Rubik', -apple-system, system-ui, sans-serif" }}
            className="min-h-screen bg-[#1f1633] text-white">

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');
                @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
                .float { animation: float 4s ease-in-out infinite; }
                .stars-bg {
                    background-image: radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px),
                                      radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px);
                    background-size: 60px 60px, 30px 30px;
                    background-position: 0 0, 15px 15px;
                }
                .lime-chip {
                    background:#c2ef4e; color:#1f1633; border-radius:4px; padding:0 10px; display:inline;
                }
                .btn-inverted {
                    background:#fff; color:#1f1633; border-radius:8px; padding:12px 20px;
                    font-size:14px; font-weight:700; letter-spacing:.2px; text-transform:uppercase;
                    box-shadow: rgba(0,0,0,.08) 0 2px 8px 0; cursor:pointer; display:inline-block;
                    transition: background .15s;
                }
                .btn-inverted:hover { background:#f0f0f0; }
                .btn-ghost {
                    background:rgba(255,255,255,.1); color:#fff; border-radius:12px; padding:10px 18px;
                    font-size:14px; font-weight:500; letter-spacing:.2px; text-transform:uppercase; cursor:pointer; display:inline-block;
                    transition: background .15s;
                }
                .btn-ghost:hover { background:rgba(255,255,255,.18); }
                .card-dark { background:#1f1633; border:1px solid #362d59; border-radius:18px; padding:32px; }
                .squiggle { color:#c2ef4e; font-size:28px; letter-spacing:-2px; }
            `}</style>

            {/* 1. NAVBAR */}
            <nav className="sticky top-0 z-50 border-b border-[#362d59]"
                style={{ background: 'rgba(31,22,51,.9)', backdropFilter: 'blur(16px)' }}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xl font-bold text-white">
                        <span className="bg-[#c2ef4e] text-[#1f1633] px-2 py-0.5 rounded font-black text-sm tracking-wider">POS</span>
                        <span>Pro</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-[#bdb8c0]">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="btn-ghost">Log In</Link>
                        <Link to="/login" className="btn-inverted">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* 2. HERO */}
            <header className="stars-bg pt-28 pb-32 text-center px-4 relative overflow-hidden border-b border-[#362d59]">
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#422082] rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-[#c2ef4e] rounded-full opacity-10 blur-3xl"></div>
                <div className="float absolute top-24 right-16 text-6xl opacity-70 select-none hidden lg:block">🛒</div>
                <div className="float absolute bottom-20 left-20 text-5xl opacity-60 select-none hidden lg:block" style={{animationDelay:'.8s'}}>📊</div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#150f23] border border-[#362d59] text-[#bdb8c0] text-xs font-semibold uppercase tracking-widest mb-10">
                        <span className="w-2 h-2 bg-[#c2ef4e] rounded-full animate-pulse"></span>
                        Powering retail across Tanzania
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                        The POS System built for{' '}
                        <span className="lime-chip">modern</span>{' '}retail
                    </h1>
                    <p className="text-lg text-[#bdb8c0] max-w-2xl mx-auto mb-12 leading-[2]">
                        Manage your inventory, process sales in seconds, and grow your business — all from one beautifully simple platform.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/login" className="btn-inverted">Start Free Trial</Link>
                        <a href="#dashboard" className="btn-ghost">See it in action →</a>
                    </div>
                    <p className="mt-6 text-xs text-[#79628c] tracking-wider uppercase">No credit card required · 14-day free trial</p>
                </div>
            </header>

            {/* 3. TRUSTED BY */}
            <section className="py-12 border-b border-[#362d59]">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#79628c] mb-8">Trusted by businesses across Tanzania</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40">
                        {["TechStore DSM", "FreshMart Arusha", "Boutique Mwanza", "Cafe Zanzibar", "LUMINA Retail"].map(b => (
                            <div key={b} className="text-xl font-black tracking-tight">{b}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FEATURES */}
            <section id="features" className="py-24 border-b border-[#362d59]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#c2ef4e] mb-4">What POS Pro Does</p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need to <span className="lime-chip">succeed</span></h2>
                        <p className="text-[#bdb8c0] text-lg max-w-2xl mx-auto leading-relaxed">Powerful features wrapped in a simple interface. No training required.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <FiZap />, title: "Lightning Fast Checkout", desc: "Process transactions in under 3 seconds. Barcode scanning, custom discounts, and multi-payment support.", color: "text-[#c2ef4e]", bg: "bg-[#c2ef4e]/10" },
                            { icon: <FiBox />, title: "Smart Inventory", desc: "Track stock in real-time. Get low-stock alerts before you run out and reorder automatically.", color: "text-[#fa7faa]", bg: "bg-[#fa7faa]/10" },
                            { icon: <FiBarChart2 />, title: "Real-time Analytics", desc: "Beautiful dashboards showing your daily sales, top products, and revenue trends — always live.", color: "text-[#c2ef4e]", bg: "bg-[#c2ef4e]/10" },
                            { icon: <FiUsers />, title: "Customer Profiles", desc: "Track who your best customers are. Build loyalty and understand their purchasing patterns.", color: "text-[#fa7faa]", bg: "bg-[#fa7faa]/10" },
                            { icon: <FiShield />, title: "Role-based Access", desc: "Separate admin, manager, and cashier views. Sensitive data stays secure at every level.", color: "text-[#c2ef4e]", bg: "bg-[#c2ef4e]/10" },
                            { icon: <FiCloud />, title: "Cloud Synced", desc: "All your data is safely backed up to the cloud. Access your store from any device, anywhere.", color: "text-[#fa7faa]", bg: "bg-[#fa7faa]/10" },
                        ].map((f, i) => (
                            <div key={i} className="card-dark hover:border-[#79628c] transition-colors group">
                                <div className={`w-12 h-12 ${f.bg} ${f.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    {React.cloneElement(f.icon, { className: 'w-5 h-5' })}
                                </div>
                                <h3 className="text-lg font-semibold mb-3">{f.title}</h3>
                                <p className="text-[#bdb8c0] text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. HOW IT WORKS */}
            <section id="how-it-works" className="py-24 border-b border-[#362d59] stars-bg">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#c2ef4e] mb-4">Simple Setup</p>
                        <h2 className="text-4xl font-bold">Up and running in <span className="lime-chip">minutes</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Add Your Products", desc: "Import your inventory via CSV or add items manually. Set prices, barcodes, and stock levels in seconds." },
                            { step: "02", title: "Start Selling", desc: "Our blazing-fast POS interface lets cashiers ring up customers and process payments instantly." },
                            { step: "03", title: "Track & Grow", desc: "Watch your sales grow in real-time through your analytics dashboard. Make data-driven decisions daily." },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-20 h-20 mx-auto bg-[#150f23] border-2 border-[#c2ef4e] text-[#c2ef4e] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(194,239,78,.2)]">
                                    <span className="text-2xl font-black font-mono">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-[#bdb8c0] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. DASHBOARD PREVIEW */}
            <section id="dashboard" className="py-24 border-b border-[#362d59]">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#c2ef4e] mb-4">Product Preview</p>
                    <h2 className="text-4xl font-bold mb-4">A dashboard you'll <span className="lime-chip">love</span> using</h2>
                    <p className="text-[#bdb8c0] mb-16 max-w-xl mx-auto leading-relaxed">Clean, intuitive, and designed for total visibility into your business.</p>
                    <div className="rounded-[18px] overflow-hidden border border-[#362d59] shadow-2xl bg-[#150f23] p-1.5 mx-auto max-w-5xl hover:scale-[1.01] transition-transform duration-500">
                        <div className="bg-gray-100 rounded-[14px] overflow-hidden h-[480px] flex text-left">
                            <div className="w-44 bg-[#1f1633] border-r border-[#362d59] p-4 hidden sm:block">
                                <div className="flex items-center gap-1.5 mb-8">
                                    <span className="bg-[#c2ef4e] text-[#1f1633] px-1.5 py-0.5 rounded text-xs font-black">POS</span>
                                    <span className="text-white font-bold text-sm">Pro</span>
                                </div>
                                <div className="space-y-2">
                                    {["Dashboard","Products","POS","Sales","Reports","Settings"].map((item, i) => (
                                        <div key={item} className={`h-8 rounded-lg px-3 flex items-center text-xs font-medium ${i === 0 ? 'bg-[#422082] text-white' : 'text-[#79628c]'}`}>{item}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 p-6 bg-gray-50">
                                <div className="h-7 w-52 bg-gray-200 rounded mb-6"></div>
                                <div className="grid grid-cols-4 gap-3 mb-6">
                                    {[['#dbeafe','#2563eb'],['#d1fae5','#059669'],['#fef9c3','#d97706'],['#fce7f3','#db2777']].map(([bg, c], i) => (
                                        <div key={i} className="h-20 bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{background: bg}}>
                                                <div className="w-4 h-4 rounded" style={{background: c, opacity:.6}}></div>
                                            </div>
                                            <div><div className="h-2 w-10 bg-gray-200 rounded mb-1.5"></div><div className="h-3 w-14 bg-gray-300 rounded"></div></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 h-56 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                        <div className="h-3 w-28 bg-gray-200 rounded mb-4"></div>
                                        <div className="flex items-end h-36 gap-2 px-2">
                                            {[40,70,45,90,65,100,80].map((h,i) => (
                                                <div key={i} className="flex-1 rounded-t" style={{height:`${h}%`, background: i === 5 ? '#c2ef4e' : '#422082', opacity: i === 5 ? 1 : .6}}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-1 h-56 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                        <div className="h-3 w-20 bg-gray-200 rounded mb-4"></div>
                                        <div className="space-y-3 mt-2">
                                            {[80,65,50,40,30].map((w, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-[#422082] flex-shrink-0"></div>
                                                    <div className="h-2 rounded bg-gray-200" style={{width:`${w}%`}}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. BENEFITS */}
            <section className="py-24 border-b border-[#362d59] stars-bg">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#c2ef4e] mb-4">Why Switch to POS Pro</p>
                            <h2 className="text-4xl font-bold mb-6 leading-tight">Work <span className="lime-chip">smarter</span>,<br />not harder</h2>
                            <p className="text-[#bdb8c0] mb-10 leading-[2]">Our platform automates the tedious parts of running a store, freeing you to focus on your customers and growth.</p>
                            <ul className="space-y-4">
                                {["Cut checkout time by up to 40%","Reduce inventory errors with real-time tracking","Save 10+ hours a week on reports and accounting","Access your store data from anywhere, anytime"].map((b, i) => (
                                    <li key={i} className="flex items-center gap-3 font-medium">
                                        <span className="w-5 h-5 bg-[#c2ef4e]/20 text-[#c2ef4e] rounded-full flex items-center justify-center flex-shrink-0">
                                            <FiCheckCircle className="w-3 h-3" />
                                        </span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { v: "40%", l: "Faster Checkout", cls: "bg-[#c2ef4e]/10 border border-[#c2ef4e]/20 text-[#c2ef4e]" },
                                { v: "99.9%", l: "Uptime SLA", cls: "bg-[#fa7faa]/10 border border-[#fa7faa]/20 text-[#fa7faa]" },
                                { v: "10h+", l: "Saved Weekly", cls: "bg-[#422082]/60 border border-[#362d59] text-white" },
                                { v: "24/7", l: "Support", cls: "bg-[#c2ef4e]/10 border border-[#c2ef4e]/20 text-[#c2ef4e]" },
                            ].map((s, i) => (
                                <div key={i} className={`rounded-2xl p-6 text-center ${s.cls}`}>
                                    <p className="text-4xl font-black mb-2">{s.v}</p>
                                    <p className="text-sm font-medium text-[#bdb8c0]">{s.l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. INDUSTRIES SERVED */}
            <section className="py-24 border-b border-[#362d59]">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#c2ef4e] mb-4">Industries</p>
                    <h2 className="text-4xl font-bold mb-4">Built for your <span className="lime-chip">industry</span></h2>
                    <p className="text-[#bdb8c0] mb-16 max-w-xl mx-auto">Flexible enough to handle any retail environment in Tanzania.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "Retail & Apparel", emoji: "👗" },
                            { name: "Supermarkets", emoji: "🛒" },
                            { name: "Electronics", emoji: "📱" },
                            { name: "Pharmacies", emoji: "💊" },
                        ].map((ind, i) => (
                            <div key={i} className="card-dark hover:border-[#c2ef4e]/50 group cursor-pointer transition-all text-center">
                                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{ind.emoji}</div>
                                <h3 className="font-semibold text-sm">{ind.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. PRICING */}
            <section id="pricing" className="py-24 border-b border-[#362d59] stars-bg">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#c2ef4e] mb-4">Pricing</p>
                        <h2 className="text-4xl font-bold mb-4">Simple, <span className="lime-chip">transparent</span> pricing</h2>
                        <p className="text-[#bdb8c0]">No hidden fees. All prices in Tanzania Shillings. Cancel anytime.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
                        {[
                            { name: "Starter", price: "50,000", desc: "Perfect for small single-location shops.", features: ["1 Register", "Up to 1,000 Products", "Basic Reporting", "Email Support"], featured: false },
                            { name: "Pro", price: "150,000", desc: "For growing businesses that need more power.", features: ["3 Registers", "Unlimited Products", "Advanced Analytics", "Low-stock Alerts", "24/7 Priority Support"], featured: true },
                            { name: "Enterprise", price: "400,000", desc: "Full-scale for retail chains across Tanzania.", features: ["Unlimited Registers", "Multi-store Management", "API Access", "Dedicated Manager"], featured: false },
                        ].map((tier, i) => (
                            <div key={i} className={`relative flex flex-col rounded-xl p-8 border ${tier.featured ? 'bg-[#150f23] border-[#c2ef4e]/40' : 'bg-[#1f1633] border-[#362d59]'}`}>
                                {tier.featured && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c2ef4e] text-[#150f23] text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</span>
                                )}
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <p className="text-[#bdb8c0] text-sm mb-6 h-10">{tier.desc}</p>
                                <div className="mb-8">
                                    <span className="text-xs font-semibold text-[#79628c] uppercase tracking-widest">TZS </span>
                                    <span className="text-4xl font-black">{tier.price}</span>
                                    <span className="text-[#79628c] text-sm">/mo</span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm font-medium text-[#bdb8c0]">
                                            <span className="text-[#c2ef4e]">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors ${tier.featured ? 'bg-[#c2ef4e] text-[#150f23] hover:bg-[#d4f76a]' : 'bg-[#150f23] text-white border border-[#362d59] hover:border-[#79628c]'}`}>
                                    Choose {tier.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. TESTIMONIALS */}
            <section className="py-24 border-b border-[#362d59]">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#c2ef4e] mb-4">Testimonials</p>
                    <h2 className="text-4xl font-bold mb-16">Loved by <span className="lime-chip">business owners</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Amina Salehe", role: "Owner, Salehe Boutique – Dar es Salaam", quote: "Switching to POS Pro was the best business decision I made. My cashiers learned it in 5 minutes and queue times dropped dramatically." },
                            { name: "John Mkude", role: "Manager, TechHub – Arusha", quote: "The barcode scanning speed is unreal. Real-time stock alerts mean we never run out of best-selling items anymore." },
                            { name: "Fatuma Ali", role: "CEO, Style Hub – Zanzibar", quote: "Beautiful interface and rock-solid reliability. We processed 500+ transactions during Eid weekend without a single hiccup." },
                        ].map((t, i) => (
                            <div key={i} className="card-dark text-left">
                                <div className="flex text-[#c2ef4e] mb-4 gap-0.5">
                                    {[1,2,3,4,5].map(s => <FiStar key={s} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-[#bdb8c0] italic mb-6 leading-relaxed text-sm">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#422082] rounded-full flex items-center justify-center text-sm font-bold">{t.name[0]}</div>
                                    <div>
                                        <h4 className="font-semibold text-sm">{t.name}</h4>
                                        <p className="text-xs text-[#79628c]">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. STATISTICS */}
            <section className="py-20 bg-[#150f23] border-b border-[#362d59]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#362d59]">
                        {[
                            { v: "10M+", l: "Transactions Processed" },
                            { v: "5,000+", l: "Active Stores" },
                            { v: "TZS 2T+", l: "Sales Volume" },
                            { v: "99.9%", l: "Uptime" },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="text-4xl md:text-5xl font-black text-[#c2ef4e] mb-2">{s.v}</div>
                                <div className="text-[#79628c] font-medium text-xs uppercase tracking-widest">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. FAQ */}
            <section id="faq" className="py-24 border-b border-[#362d59] stars-bg">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#c2ef4e] mb-4">FAQ</p>
                        <h2 className="text-4xl font-bold">Common <span className="lime-chip">questions</span></h2>
                    </div>
                    <div className="space-y-3">
                        {[
                            { q: "What hardware do I need?", a: "POS Pro works in any modern browser. Use your existing PC, Mac, iPad, or Android tablet. Supports standard USB/Bluetooth barcode scanners and receipt printers." },
                            { q: "Can I use it offline?", a: "POS Pro is cloud-based for real-time syncing. Our Pro and Enterprise plans include an offline mode that syncs automatically when reconnected." },
                            { q: "How do I import my existing inventory?", a: "Simply upload a CSV file with your product details, barcodes, and stock levels. Our system populates your store database instantly." },
                            { q: "Is there a contract or commitment?", a: "No contracts. Month-to-month subscription. Upgrade, downgrade, or cancel anytime without penalty." },
                            { q: "Is my data safe?", a: "All data is encrypted and backed up to secure cloud servers. We use bank-level security with role-based access controls throughout." },
                        ].map((faq, i) => (
                            <div key={i} className="border border-[#362d59] rounded-xl overflow-hidden bg-[#150f23]">
                                <button className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center hover:bg-[#1f1633] transition-colors" onClick={() => toggleFaq(i)}>
                                    {faq.q}
                                    <FiChevronDown className={`transition-transform flex-shrink-0 text-[#79628c] ${activeFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                {activeFaq === i && (
                                    <div className="px-6 py-4 text-[#bdb8c0] bg-[#1f1633] border-t border-[#362d59] text-sm leading-relaxed">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. CALL TO ACTION */}
            <section className="py-28 px-6 text-center relative overflow-hidden bg-[#150f23] border-b border-[#362d59]">
                <div className="absolute inset-0 stars-bg"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#422082] rounded-full opacity-30 blur-3xl"></div>
                <div className="float absolute top-10 right-20 text-5xl select-none hidden lg:block">🚀</div>
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Ready to <span className="lime-chip">transform</span><br />your retail business?
                    </h2>
                    <p className="text-[#bdb8c0] mb-12 text-lg leading-[2]">Join thousands of Tanzanian merchants growing with POS Pro. Your 14-day free trial starts today.</p>
                    <Link to="/login" className="btn-inverted text-lg px-10 py-5">Create Your Free Account →</Link>
                </div>
            </section>

            {/* 14. CONTACT + 15. FOOTER */}
            <footer className="bg-[#0e0a19] text-[#bdb8c0] pt-20 pb-10 px-8 border-t border-[#362d59]">
                <div className="text-center mb-12">
                    <div className="squiggle">〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜</div>
                </div>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div>
                            <div className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                                <span className="bg-[#c2ef4e] text-[#1f1633] px-2 py-0.5 rounded font-black text-sm">POS</span>
                                <span>Pro</span>
                            </div>
                            <p className="text-sm leading-relaxed mb-6">The smartest, fastest, and most reliable POS for Tanzania's modern retail businesses.</p>
                            <div className="flex gap-3">
                                {["in","tw","fb"].map(s => (
                                    <div key={s} className="w-9 h-9 rounded-full border border-[#362d59] flex items-center justify-center text-xs font-bold hover:bg-[#c2ef4e] hover:text-[#150f23] hover:border-[#c2ef4e] cursor-pointer transition-all">{s}</div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Product</h4>
                            <ul className="space-y-3 text-sm">
                                {["Features","Pricing","Hardware","Integrations","Changelog"].map(l => (
                                    <li key={l}><a href="#" className="hover:text-[#c2ef4e] transition-colors">{l}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Company</h4>
                            <ul className="space-y-3 text-sm">
                                {["About Us","Careers","Blog","Contact","Partners"].map(l => (
                                    <li key={l}><a href="#" className="hover:text-[#c2ef4e] transition-colors">{l}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Contact Us</h4>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3"><FiMapPin className="mt-1 text-[#79628c] flex-shrink-0" /><span>Kinondoni, Dar es Salaam,<br />Tanzania</span></li>
                                <li className="flex items-center gap-3"><FiPhone className="text-[#79628c] flex-shrink-0" /><span>+255 800 123 456</span></li>
                                <li className="flex items-center gap-3"><FiMail className="text-[#79628c] flex-shrink-0" /><span>support@pospro.co.tz</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-[#362d59] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#79628c]">
                        <p>© {new Date().getFullYear()} POS Pro Technologies Ltd. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
                                <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
