import React from 'react';

export default function Profile() {
  return (
    <div className="min-h-[523.3900146484375px] max-w-[1360px]  mx-auto py-5">
   
    <div className="bg-[#FFFFFF] p-7 rounded-[10px] mb-6 text-[14px] text-[#999999] font-bold">
      Home / pages / <span className="text-black font-semibold">Profile</span>
    </div>

      <div className="bg-white rounded-xl shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-18">
       
        <div className="">
          <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-start">
            <img
              src="/profile.png"
              alt="User Avatar"
              className="w-[214.5px] object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">Mark Cole</h3>
            <p className="text-sm text-gray-500 mb-6">swoo@gmail.com</p>

            <div className="space-y-3 w-full">
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition">
                Account info <span>→</span>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100 transition">
                My order <span>→</span>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100 transition">
                My address <span>→</span>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100 transition">
                Change password <span>→</span>
              </button>
            </div>
          </div>
        </div>

     
        <div className="w-full lg:w-2/3">
          <h2 className="text-[24px] font-bold mb-6">Account Info</h2>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Mark"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Cole"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="swoo@gmail.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="tel"
                placeholder="+1 0231 4554 452"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-teal-500 hover:bg-teal-600 cursor-pointer text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
