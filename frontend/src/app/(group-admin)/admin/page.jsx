
import AdminProductRevenueChart from '@/components/admin/AdminProductRevenueChart';
import AdminProductSalesChart from '@/components/admin/AdminProductSalesChart';
import AdminSalesOverTimeChart from '@/components/admin/AdminSalesOverTimeChart';
import AdminTopProducts from '@/components/admin/AdminTopProducts';

export default function AdminDashboard() {
 

  return (
    <div className="max-w-[1400px] mt-17 mx-auto p-4 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-white">Product Sales (Qty & Revenue)</h3>
          <AdminProductSalesChart />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Revenue Share by Product</h3>
          <AdminProductRevenueChart />
        </div>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-white mb-2">Sales Over Time</h3>
        <AdminSalesOverTimeChart />
      </section>

      <section>
        <AdminTopProducts />
      </section>
    </div>
  );
}
