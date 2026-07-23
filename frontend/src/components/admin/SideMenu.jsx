'use client';
import {
  FaProjectDiagram,
  FaChartBar,
  FaShoppingCart,
  FaMailBulk,
  FaGlobe,
  FaAngleRight,
} from 'react-icons/fa';
import { TbCategory } from "react-icons/tb";
import { IoMdColorPalette } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa6";
import { SiBrandfolder } from "react-icons/si";
import Link from 'next/link';

export default function SideMenu() {
  return (
    <aside className="h-screen  fixed  bg-[#1F2937] text-white p-5 shadow-lg z-50">
      {/* Title / Logo */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold  tracking-wide">
          <span>S</span>
          <span className='text-amber-400'>h</span>
          <span>o</span>
          <span className='text-amber-400'>p</span>
          <span>India</span>

        </h1>
      </div>

      {/* Main Menu */}
      <div className="mb-6">
        <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-3">Menu</h2>
        <ul className="space-y-2">
          <Link href={"/admin"}>
            <li className="flex items-center gap-3 px-4 py-2 bg-[#111827] rounded-lg text-teal-500 font-medium cursor-pointer">
              <FaProjectDiagram />
              <span>Dashboards</span>
            </li>
          </Link>
      
           <Link href={"/admin/orderdetails"}>
            <li className="flex mt-4 items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#374151] hover:text-red-400 text-gray-300 cursor-pointer transition-all">
              <SiBrandfolder />
              <span>Order Details</span>
            </li>
          </Link>
        </ul>
      </div>

      {/* Pages */}
      <div>
        <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-3">Pages</h2>
        <ul className="space-y-2">
          <Link href={"/admin/category"}>
            <li className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[#374151] hover:text-red-400 text-gray-300 cursor-pointer transition-all">
              <div className="flex items-center gap-3">
                <TbCategory />
                <span>Category</span>
              </div>
              <FaAngleRight className="text-gray-400" />
            </li>
          </Link>
          <Link href={"/admin/product"}>
            <li className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#374151] hover:text-red-400 text-gray-300 cursor-pointer transition-all">
              <FaProductHunt />
              <span>Product</span>
            </li>
          </Link>
          <Link href={"/admin/color"}>
            <li className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#374151] hover:text-red-400 text-gray-300 cursor-pointer transition-all">
              <IoMdColorPalette />
              <span>Color</span>
            </li>
          </Link>
          <Link href={"/admin/brand"}>
            <li className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#374151] hover:text-red-400 text-gray-300 cursor-pointer transition-all">
              <SiBrandfolder />
              <span>Brand</span>
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
}
