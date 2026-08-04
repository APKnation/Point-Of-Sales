import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiBox } from 'react-icons/fi';
import { formatTZS } from '../utils/currency';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import api from '../services/api';
import { getAllSales } from '../services/saleService';

const Dashboard = () => {
    const [stats, setStats] = useState({
        todaySales: 0,
        monthlySales: 0,
        totalProducts: 0,
        totalCustomers: 0,
        lowStockProducts: 0
    });
    
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch stats from Dashboard API
                const statsRes = await api.get('/dashboard');
                setStats(statsRes.data);

                // Fetch real sales to generate chart data
                const salesRes = await getAllSales();
                const rawSales = salesRes.data;

                // Create a map of Date -> Total Sales
                const salesMap = {};
                
                // Initialize last 7 days with 0
                for (let i = 6; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    salesMap[d.toLocaleDateString('en-US', { weekday: 'short' })] = 0;
                }

                // Populate with real data
                rawSales.forEach(sale => {
                    const dateStr = new Date(sale.saleDate).toLocaleDateString('en-US', { weekday: 'short' });
                    if (salesMap[dateStr] !== undefined) {
                        salesMap[dateStr] += sale.grandTotal;
                    }
                });

                const formattedSalesData = Object.keys(salesMap).map(key => ({
                    name: key,
                    sales: salesMap[key]
                }));

                setSalesData(formattedSalesData);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const summaryCards = [
        { title: "Today's Sales", value: formatTZS(stats.todaySales || 0), icon: <FiDollarSign />, color: "bg-primary" },
        { title: "Total Products", value: stats.totalProducts || 0, icon: <FiBox />, color: "bg-success" },
        { title: "Total Customers", value: stats.totalCustomers || 0, icon: <FiUsers />, color: "bg-warning" },
        { title: "Low Stock Items", value: stats.lowStockProducts || 0, icon: <FiShoppingBag />, color: "bg-danger" },
    ];

    if (loading) {
        return (
            <div className="flex justify-center py-12 text-secondary">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center transition-transform hover:-translate-y-1">
                        <div className={`${card.color} text-white p-4 rounded-lg mr-4`}>
                            {React.cloneElement(card.icon, { className: 'w-6 h-6' })}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                            <p className="text-2xl font-bold text-secondary">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-secondary mb-4">Weekly Sales Trend</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-secondary mb-4">Sales Volume (Weekly)</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="sales" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
