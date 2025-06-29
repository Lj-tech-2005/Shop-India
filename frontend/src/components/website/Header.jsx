'use client';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdSearch } from 'react-icons/io';
import { FaBars } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { MdShoppingCart } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, lstocart } from '@/redux/features/cartSlice';
import { logoutUser, lstoUser } from '@/redux/features/userSlice';
import { useRouter } from 'next/navigation';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";

export default function Header() {
    const router = useRouter();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [toggle, settoggle] = useState(false);
    const handleMobileLinkClick = () => {
        settoggle(false);
    };
    const [showPagesDropdown, setShowPagesDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    useEffect(() => {
        dispatch(lstocart());
        dispatch(lstoUser());
    }, []);

    const logoutHandler = () => {
        dispatch(logoutUser());
        dispatch(emptyCart());
        router.push('/login');
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-[1360px] mx-auto p-2 md:p-4">
                {/* Top Bar */}
                <div className="hidden md:flex justify-between px-2 sm:px-5 text-sm">
                    <div className="flex gap-4">
                        <span className="bg-[#EBEEF6] rounded px-2 py-1 text-xs">Hotline 24/7</span>
                        <span className="font-bold text-xs">(025) 3886 25 16</span>
                    </div>
                    <div className="flex gap-4 items-center text-sm">
                        <span className="cursor-pointer">Sell on Shop india</span>
                        <span className="cursor-pointer">Order Track</span>
                        <span className="border-r pr-2 cursor-pointer">IND</span>
                        <span className="flex items-center gap-1 cursor-pointer">
                            <img src="/ind.jpg" className="w-4 h-4" />
                            Eng <IoIosArrowDown />
                        </span>
                    </div>
                </div>

                {/* Main Nav */}
                <nav className="mt-5 flex flex-wrap md:flex-nowrap justify-between items-center gap-4 px-2 sm:px-5">
                    {/* Logo & Menu */}
                    <div className="flex justify-between w-full md:w-auto items-center gap-4">
                        <Link href={"/"}>
                            <div className="flex items-center gap-2 cursor-pointer">
                                {/* <div className="bg-[#01A49E] rounded-full w-[55px] h-[49px] flex justify-center items-center">
                                <img src="/vector1.png" className="mt-2" />
                            </div> */}
                                <img src="/2.png" alt="logo" width={65} />
                                <div className="text-[18px] font-bold leading-5 font-mono">
                                    <p>Shop</p>
                                    <p>India</p>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Nav Items */}
                        <ul className="hidden ms-3 md:flex items-center gap-5 font-bold text-sm">
                            <Link href="/"><li className="cursor-pointer">Home</li></Link>

                            {/* Pages Dropdown */}
                            <div
                                className="relative group cursor-pointer"
                                onMouseEnter={() => setShowPagesDropdown(true)}
                                onMouseLeave={() => setShowPagesDropdown(false)}
                            >
                                <li className="flex items-center gap-1">Pages <IoIosArrowDown className="mt-1" /></li>
                                <ul className={`absolute top-6 left-0 z-30 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 ${showPagesDropdown ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                                    {user.data && (
                                        <Link href="/profile">
                                            <li className="px-5 py-2 text-sm hover:bg-gray-100 transition cursor-pointer">👤 Profile</li>
                                        </Link>
                                    )}
                                    <Link href="/about">
                                        <li className="px-5 py-2 text-sm hover:bg-gray-100 transition cursor-pointer">📘 About</li>
                                    </Link>
                                    <Link href="/contact">
                                        <li className="px-5 py-2 text-sm hover:bg-gray-100 transition cursor-pointer">📞 Contact</li>
                                    </Link>
                                    <Link href="/login">
                                        <li className="px-5 py-2 text-sm hover:bg-gray-100 transition cursor-pointer">🔐 Login</li>
                                    </Link>
                                </ul>
                            </div>

                            <Link href="/store"><li className="cursor-pointer">Store</li></Link>
                            <Link href="/contact"><li className="cursor-pointer">Contact</li></Link>
                        </ul>

                        {/* Mobile Toggle */}
                        {toggle ? (
                            <IoClose onClick={() => settoggle(false)} className="text-3xl md:hidden cursor-pointer" />
                        ) : (
                            <FaBars onClick={() => settoggle(true)} className="text-3xl md:hidden cursor-pointer" />
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden fixed top-0 z-20 bg-black text-white h-screen w-[50vw] duration-500 p-5 ${toggle ? "left-0" : "left-[-100%]"}`}>
                        <ul className="flex flex-col gap-4 text-sm font-bold">
                            <Link href="/" onClick={handleMobileLinkClick}><li className="cursor-pointer">Home</li></Link>
                            {user.data && (
                                <Link href="/profile" onClick={handleMobileLinkClick}><li className="cursor-pointer">👤 Profile</li></Link>
                            )}
                            <Link href="/about" onClick={handleMobileLinkClick}><li className="cursor-pointer">📘 About</li></Link>
                            <Link href="/contact" onClick={handleMobileLinkClick}><li className="cursor-pointer">📞 Contact</li></Link>
                            <Link href="/login" onClick={handleMobileLinkClick}><li className="cursor-pointer">🔐 Login</li></Link>
                            <Link href="/store" onClick={handleMobileLinkClick}><li className="cursor-pointer">🛍️ Store</li></Link>
                        </ul>
                    </div>


                    {/* Profile + Cart */}
                    {/* Profile + Cart */}
                    <div className="w-full md:w-auto flex justify-between md:justify-start gap-5 items-center relative">

                        {/* Cart Icon (left on mobile) */}
                        <Link href="/cart">
                            <div className="relative flex flex-col items-center cursor-pointer text-[#01A49E] text-2xl">
                                <div className="bg-[#EBEEF6] text-2xl w-[40px] ms-3 h-[40px] rounded-full flex justify-center items-center relative">
                                    <MdShoppingCart />
                                    <span className="absolute bottom-[-6px]  right-[-6px] bg-[#01A49E] text-white text-xs w-[18px] h-[18px] rounded-full flex justify-center items-center">
                                        {cart?.items?.length ?? 0}
                                    </span>
                                </div>
                                <p className="text-[#666666] ms-3 text-xs mt-1 font-semibold">Cart</p>
                            </div>
                        </Link>

                        {/* Profile Icon (right on mobile) */}
                        <div className="relative">
                            <div
                                className="flex flex-col items-center cursor-pointer text-[#01A49E] text-2xl"
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            >
                                <FaUserCircle />
                                <span className="text-xs mt-1 text-gray-700 font-semibold">Profile</span>
                            </div>

                            {showProfileDropdown && (
                                <div className="absolute right-0 top-[40px] bg-white border border-gray-200 shadow-md rounded-md w-52 z-50 p-2">
                                    {user.data ? (
                                        <>
                                            <div className="px-4 py-2 text-xs text-gray-600">
                                                Hello, <span className="font-semibold">{user.data.name}</span>
                                            </div>
                                            <Link href="/profile">
                                                <div className="px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer">👤 My Profile</div>
                                            </Link>
                                            <div
                                                onClick={logoutHandler}
                                                className="px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
                                            >
                                                🔓 Logout
                                            </div>
                                            <Link href="/wishlist">
                                                <div className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer">
                                                    <FaRegHeart className="text-red-400" /> My Wishlist
                                                </div>
                                            </Link>
                                            <Link href="/myorder">
                                                <div className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer">
                                                    <MdOutlineBookmarkBorder /> My Orders
                                                </div>
                                            </Link>
                                        </>
                                    ) : (
                                        <Link href="/login?ref=header">
                                            <div className="px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer">
                                                🔐 Login / Register
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>


                </nav>
            </div>

            {/* Bottom Search */}
            <div className="bg-[#01A49E]">
                <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-3 px-4">
                    <div className="w-full md:w-[50%] flex items-center gap-2 bg-white rounded-full p-2">
                        <div className="text-sm font-bold whitespace-nowrap flex items-center gap-2 cursor-pointer">
                            All Categories <IoIosArrowDown className="mt-1" />
                        </div>
                        <input className="text-sm p-1 outline-none w-full" placeholder="Search anything..." />
                        <IoMdSearch className="text-lg cursor-pointer" />
                    </div>
                    <div className="hidden md:flex gap-5 text-white text-xs font-medium uppercase justify-center md:justify-end w-full md:w-[50%] text-center">
                        <p>Free shipping over ₹199</p>
                        <p>30 days money back</p>
                        <p>100% secure payment</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
