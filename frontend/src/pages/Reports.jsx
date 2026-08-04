import React, { useState, useEffect } from 'react';
import { FiDownload, FiCalendar, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import api from '../services/api';
import Swal from 'sweetalert2';

const Reports = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch real sales data for reports
        const fetchReportData = async () => {
            try {
                // Assuming we get sales from the backend
                const res = await api.get('/sales');
                const rawSales = res.data;
                
                // Group sales by date
                const grouped = rawSales.reduce((acc, sale) => {
                    const date = new Date(sale.saleDate).toLocaleDateString();
                    acc[date] = (acc[date] || 0) + sale.grandTotal;
                    return acc;
                }, {});

                const chartData = Object.keys(grouped).map(date => ({
                    date,
                    total: grouped[date]
                }));

                setSalesData(chartData);
            } catch (err) {
                console.error("Failed to load report data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    const handleDownload = () => {
        Swal.fire('Exporting...', 'Your report is being generated.', 'info');
        // In a real app, you would trigger a CSV download or PDF generation here.
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-secondary">Sales Reports</h1>
                <button onClick={handleDownload} className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <FiDownload className="mr-2" /> Export CSV
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-blue-100 text-primary p-4 rounded-lg mr-4">
                        <FiDollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <p className="text-2xl font-bold text-secondary">
                            ${salesData.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-green-100 text-success p-4 rounded-lg mr-4">
                        <FiTrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Average Order Value</p>
                        <p className="text-2xl font-bold text-secondary">
                            ${salesData.length > 0 ? (salesData.reduce((acc, curr) => acc + curr.total, 0) / salesData.length).toFixed(2) : '0.00'}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-purple-100 text-purple-600 p-4 rounded-lg mr-4">
                        <FiCalendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Days</p>
                        <p className="text-2xl font-bold text-secondary">{salesData.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-secondary mb-4">Revenue Overview</h2>
                <div className="h-96">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        </div>
                    ) : salesData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="total" fill="#2563EB" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex justify-center items-center h-full text-gray-400">
                            No sales data available for reports.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
