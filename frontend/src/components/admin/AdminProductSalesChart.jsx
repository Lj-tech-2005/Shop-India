// components/AdminProductSalesChart.js
'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { axiosApiInstance } from '@/app/library/helper';

export default function AdminProductSalesChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axiosApiInstance.get('admin/product-sales-stats');
            if (res.data.flag) {
                setData(res.data.data);
                console.log("Product Stats:", res.data.data);

            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full cursor-pointer bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-700">📊 Product Sales Overview</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 10, right: 20, bottom: 50, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="qty" fill="#38bdf8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
