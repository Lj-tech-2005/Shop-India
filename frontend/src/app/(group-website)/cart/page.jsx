export default function CartPage() {
    return (
        <div className="max-w-[1360px]  mx-auto py-5">
            <div className="bg-[#FFFFFF] p-7 rounded-[10px] mb-6 text-[14px] text-[#999999] font-bold">
                Home / pages / <span className="text-black font-bold">Card</span>
            </div>
            <div className="grid grid-cols-1 p-6 bg-[#FFFFFF] rounded-[10px] lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2  space-y-6">
                    {/* Item Card Example */}
                    <div className="relative flex flex-col sm:flex-row bg-[#FAFAFA] rounded-2xl  p-4 gap-4">
                        <div className="relative w-28 h-28 shrink-0">
                            <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                SAVE $199.00
                            </span>
                            <img
                                src="/product-1.png"
                                alt="Product"
                                className="w-full h-full object-contain rounded"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-400 mb-1">(152)</p>
                            <h3 className="font-semibold text-sm sm:text-base mb-1">
                                SROK Smart Phone 128GB, Oled Retina
                            </h3>
                            <p className="text-red-500 font-bold text-lg">$579.00</p>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="w-8 h-8 border rounded hover:bg-gray-100">-</button>
                                <span className="px-2">1</span>
                                <button className="w-8 h-8 border rounded hover:bg-gray-100">+</button>
                            </div>
                            <div className="mt-2 space-x-2">
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                    FREE SHIPPING
                                </span>
                            </div>
                            <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-600 rounded-full inline-block" /> In stock
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <span className="w-5 h-5 rounded-full bg-gray-200"></span>
                            <span className="w-5 h-5 rounded-full bg-red-100"></span>
                        </div>
                    </div>
                    <div className="relative flex flex-col sm:flex-row bg-[#FAFAFA] rounded-2xl  p-4 gap-4">
                        <div className="relative w-28 h-28 shrink-0">
                            <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                SAVE $199.00
                            </span>
                            <img
                                src="/product-1.png"
                                alt="Product"
                                className="w-full h-full object-contain rounded"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-400 mb-1">(152)</p>
                            <h3 className="font-semibold text-sm sm:text-base mb-1">
                                SROK Smart Phone 128GB, Oled Retina
                            </h3>
                            <p className="text-red-500 font-bold text-lg">$579.00</p>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="w-8 h-8 border rounded hover:bg-gray-100">-</button>
                                <span className="px-2">1</span>
                                <button className="w-8 h-8 border rounded hover:bg-gray-100">+</button>
                            </div>
                            <div className="mt-2 space-x-2">
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                    FREE SHIPPING
                                </span>
                            </div>
                            <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-600 rounded-full inline-block" /> In stock
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <span className="w-5 h-5 rounded-full bg-gray-200"></span>
                            <span className="w-5 h-5 rounded-full bg-red-100"></span>
                        </div>
                    </div>
                    <div className="relative flex flex-col sm:flex-row bg-[#FAFAFA] rounded-2xl  p-4 gap-4">
                        <div className="relative w-28 h-28 shrink-0">
                            <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                SAVE $199.00
                            </span>
                            <img
                                src="/product-1.png"
                                alt="Product"
                                className="w-full h-full object-contain rounded"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-400 mb-1">(152)</p>
                            <h3 className="font-semibold text-sm sm:text-base mb-1">
                                SROK Smart Phone 128GB, Oled Retina
                            </h3>
                            <p className="text-red-500 font-bold text-lg">$579.00</p>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="w-8 h-8 border rounded hover:bg-gray-100">-</button>
                                <span className="px-2">1</span>
                                <button className="w-8 h-8 border rounded hover:bg-gray-100">+</button>
                            </div>
                            <div className="mt-2 space-x-2">
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                    FREE SHIPPING
                                </span>
                            </div>
                            <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-600 rounded-full inline-block" /> In stock
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <span className="w-5 h-5 rounded-full bg-gray-200"></span>
                            <span className="w-5 h-5 rounded-full bg-red-100"></span>
                        </div>
                    </div>

                    {/* You can duplicate the above card for the remaining products */}
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-xl p-6 shadow h-fit">
                    <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                    <div className="text-sm space-y-3">
                        <div className="flex justify-between">
                            <span>Sub Total:</span>
                            <span className="font-semibold">$1,000.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping estimate:</span>
                            <span className="font-semibold">$600.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax estimate:</span>
                            <span className="font-semibold">$137.00</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                            <span className="font-semibold">ORDER TOTAL:</span>
                            <span className="font-semibold">$1,737.00</span>
                        </div>
                    </div>
                    <button className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition">
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
}