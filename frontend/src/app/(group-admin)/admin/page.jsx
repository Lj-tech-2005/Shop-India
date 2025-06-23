import AdminProductRevenueChart from "@/components/admin/AdminProductRevenueChart";
import AdminProductSalesChart from "@/components/admin/AdminProductSalesChart";
import AdminSalesOverTimeChart from "@/components/admin/AdminSalesOverTimeChart";
import AdminTopProducts from "@/components/admin/AdminTopProducts";

export default function AdminDashboard() {
  return (
    <div className="max-w-[1400px] mt-17 mx-auto p-4 space-y-10">
      {/* <h2 className="text-3xl font-bold text-amber-400 mb-4">Admin Dashboard</h2> */}

      {/* 👇 Grid: Product Sales & Revenue Share side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📊 Product Sales (Bar Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-white">
            Product Sales (Qty & Revenue)
          </h3>
          <AdminProductSalesChart  />
        </div>

        {/* 🍩 Revenue Share (Doughnut Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Revenue Share by Product
          </h3>
          <AdminProductRevenueChart />
        </div>
      </div>

      {/* 📈 Sales Over Time (Full Width) */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-2">
          Sales Over Time
        </h3>
        <AdminSalesOverTimeChart />
      </section>

      {/* 🏆 Top 5 Selling Products (Full Width) */}
      <section>
       
        <AdminTopProducts />
      </section>
    </div>
  );
}
