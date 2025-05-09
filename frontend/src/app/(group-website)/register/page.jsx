import React from 'react';
import Image from 'next/image';

export default function Register() {
    return (
        <div className="min-h-[523.3900146484375px] max-w-[1360px]  mx-auto  py-5">
        
            <div className="bg-[#FFFFFF] p-7  rounded-[10px] mb-6 text-[14px] text-[#999999] font-bold">
                Home / pages / <span className="text-black font-semibold">Register</span>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
                <div className="w-full lg:w-1/2 flex justify-center">
                    <Image
                        src="/login.png" 
                        alt="Login Illustration"
                        width={400}
                        height={300}
                        className="object-contain w-[401.3299865722656px] h-auto"
                    />
                </div>

                <div className="w-full lg:w-1/2">
                    <h2 className="text-[28px] sm:text-3xl font-bold text-teal-600 mb-2">Register</h2>
                    <p className="text-gray-500 text-sm sm:text-base mb-6">JOIN TO US</p>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Your name</label>
                            <input
                                type="text"
                                placeholder="Jhon Deo"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="p-5 bg-[#01A49E] text-[14px] cursor-pointer hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                        >
                            REGISTER
                        </button>

                        <p className="text-sm text-gray-500 ">
                            Already a user?{' '}
                            <a href="/login" className="text-[#1ABA1A] font-semibold hover:underline">
                                LOGIN
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
