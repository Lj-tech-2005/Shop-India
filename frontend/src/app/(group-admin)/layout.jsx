import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css';
import SideMenu from "@/components/admin/SideMenu";
import Header from "@/components/admin/Header";
import { ToastContainer } from 'react-toastify';
import Storeprovider from "@/components/Storeprovider";
import AdminProtected from "@/components/admin/AdminProtected";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Panel - Shop India",
  description: "Admin dashboard for Shop India",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Storeprovider>
          <AdminProtected> {/* ✅ Protect all admin routes here */}
            <div className="grid grid-cols-12 w-full bg-blue-500 min-h-screen">
              <div className="bg-[#1F2937] w-full col-span-2 relative">
                <SideMenu />
              </div>

              <div className="bg-[#1d2d3a] col-span-10">
                <ToastContainer autoClose={1200} />
                <Header />
                {children}
              </div>
            </div>
          </AdminProtected>
        </Storeprovider>
      </body>
    </html>
  );
}
