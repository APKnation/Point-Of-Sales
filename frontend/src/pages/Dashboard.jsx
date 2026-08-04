import React from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiBox } from 'react-icons/fi';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';

const Dashboard = () => {
    // Mock Data
    const summaryCards = [
        { title: "Today's Sales", value: "$2,450.00", icon: <FiDollarSign />, color: "bg-primary" },
        { title: "Total Products", value: "345", icon: <FiBox />, color: "bg-success" },
        { title: "Total Customers", value: "1,204", icon: <FiUsers />, color: "bg-warning" },
        { title: "Today's Orders", value: "45", icon: <FiShoppingBag />, color: "bg-danger" },
    ];

    const salesData = [
        { name: 'Mon', sales: 4000 },
        { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 2000 },
        { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 1890 },
        { name: 'Sat', sales: 2390 },
        { name: 'Sun', sales: 3490 },
    ];

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
                    <h2 className="text-lg font-bold text-secondary mb-4">Sales by Category</h2>
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
