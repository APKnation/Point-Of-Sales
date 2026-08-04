import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiBox } from 'react-icons/fi';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import api from '../services/api';
import { getAllSales } from '../services/saleService';
import { formatTZS } from '../utils/currency';

const CHART_TOOLTIP_STYLE = {
    contentStyle: { background: '#1f1633', border: '1px solid #362d59', borderRadius: 8, color: '#e8e4ed' },
    labelStyle: { color: '#bdb8c0' }
};

const Dashboard = () => {
    const [stats, setStats] = useState({ todaySales: 0, totalProducts: 0, totalCustomers: 0, lowStockProducts: 0 });
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const statsRes = await api.get('/dashboard');
                setStats(statsRes.data);
                const salesRes = await getAllSales();
                const rawSales = salesRes.data;
                const salesMap = {};
                for (let i = 6; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    salesMap[d.toLocaleDateString('en-US', { weekday: 'short' })] = 0;
                }
                rawSales.forEach(sale => {
                    const dateStr = new Date(sale.saleDate).toLocaleDateString('en-US', { weekday: 'short' });
                    if (salesMap[dateStr] !== undefined) salesMap[dateStr] += sale.grandTotal;
                });
                setSalesData(Object.keys(salesMap).map(key => ({ name: key, sales: salesMap[key] })));
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const summaryCards = [
        { title: "Today's Sales", value: formatTZS(stats.todaySales || 0), icon: <FiDollarSign />, accent: '#c2ef4e', bg: 'rgba(194,239,78,.12)' },
        { title: "Total Products", value: stats.totalProducts || 0, icon: <FiBox />, accent: '#fa7faa', bg: 'rgba(250,127,170,.12)' },
        { title: "Total Customers", value: stats.totalCustomers || 0, icon: <FiUsers />, accent: '#c2ef4e', bg: 'rgba(194,239,78,.12)' },
        { title: "Low Stock Items", value: stats.lowStockProducts || 0, icon: <FiShoppingBag />, accent: '#fa7faa', bg: 'rgba(250,127,170,.12)' },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="w-10 h-10 rounded-full border-2 border-[#362d59] border-t-[#c2ef4e] animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold" style={{ color: '#e8e4ed' }}>Dashboard Overview</h1>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card, index) => (
                    <div key={index} className="rounded-xl p-5 flex items-center gap-4 transition-transform hover:-translate-y-1"
                        style={{ background: '#1f1633', border: '1px solid #362d59' }}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: card.bg, color: card.accent }}>
                            {React.cloneElement(card.icon, { className: 'w-5 h-5' })}
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#79628c' }}>{card.title}</p>
                            <p className="text-2xl font-bold" style={{ color: '#e8e4ed' }}>{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl p-6" style={{ background: '#1f1633', border: '1px solid #362d59' }}>
                    <h2 className="text-base font-semibold mb-6 uppercase tracking-widest text-xs" style={{ color: '#79628c' }}>Weekly Sales Trend</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#362d59" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#79628c', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#79628c', fontSize: 12 }} />
                                <Tooltip {...CHART_TOOLTIP_STYLE} />
                                <Legend />
                                <Line type="monotone" dataKey="sales" stroke="#c2ef4e" strokeWidth={2.5} dot={{ r: 3, fill: '#c2ef4e' }} activeDot={{ r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-xl p-6" style={{ background: '#1f1633', border: '1px solid #362d59' }}>
                    <h2 className="text-base font-semibold mb-6 uppercase tracking-widest text-xs" style={{ color: '#79628c' }}>Sales Volume (Weekly)</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#362d59" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#79628c', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#79628c', fontSize: 12 }} />
                                <Tooltip {...CHART_TOOLTIP_STYLE} cursor={{ fill: 'rgba(194,239,78,.05)' }} />
                                <Bar dataKey="sales" fill="#422082" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
