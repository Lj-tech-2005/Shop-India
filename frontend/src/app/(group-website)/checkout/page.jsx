export default function CheckoutPage() {
    return (
        <div className="min-h-[523.3900146484375px] max-w-[1360px]  mx-auto  py-5">
            <div className="bg-[#FFFFFF] p-7  rounded-[10px] mb-6 text-[14px] text-[#999999] font-bold">
                Home / pages / <span className="text-black font-semibold">Register</span>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md p-6">


                <h2 className="text-xl font-bold mb-4">CHECKOUT</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-100 p-4 rounded">Returning customer? <a href="#" className="text-red-500">Click here to log in</a></div>
                    <div className="bg-gray-100 p-4 rounded">Have a coupon? <a href="#" className="text-red-500">Click here to enter your code</a></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">Billing Detail</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">First Name <span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full border rounded px-3 py-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Last Name <span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full border rounded px-3 py-2" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Company Name (Optional)</label>
                                <input type="text" className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Country / Region</label>
                                <select className="w-full border rounded px-3 py-2">
                                    <option>United States (US)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Street Address</label>
                                <input type="text" placeholder="House number and street name" className="w-full border rounded px-3 py-2 mb-2" />
                                <input type="text" placeholder="Apartment, suite, unit, etc (Optional)" className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Town / City <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">State / County</label>
                                <select className="w-full border rounded px-3 py-2">
                                    <option>Washington</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Zip Code <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" className="w-full border rounded px-3 py-2" />
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="create-account" className="mr-2" />
                                <label htmlFor="create-account" className="text-sm">Create an account?</label>
                            </div>
                            <div>
                                <h4 className="text-md font-medium">Additional Information</h4>
                                <label className="block text-sm font-medium">Order Notes (Optional)</label>
                                <textarea className="w-full border rounded px-3 py-2" placeholder="Note about your order, etc"></textarea>
                            </div>
                        </form>
                    </div>

                    <div className="rounded-md  md:mt-120">
                        <h3 className="text-lg font-semibold mb-4">Your Order</h3>

                        <div className="rounded-md bg-[#E1E3EB]">

                            <div className="bg-[#EDEFF5] rounded-md p-5">
                                <div className="grid grid-cols-2 font-semibold border-b pb-2">
                                    <span>PRODUCT</span>
                                    <span className="text-right">SUBTOTAL</span>
                                </div>
                                <div className="grid grid-cols-2 py-2 ">
                                    <span>Pineapple Macbook Pro 2022 M1 / 512GB × 3</span>
                                    <span className="text-right">$3,150.00</span>
                                </div>
                                <div className="grid grid-cols-2 border-[#DEE2E6] border-b py-2 text-[14px] ">
                                    <span className="text-nowrap" >Worldwide Standard Shipping Fee</span>
                                    <span className="text-right text-red-500">+ $9.50</span>
                                </div>
                                <div className="grid grid-cols-2 py-2 font-semibold ">
                                    <span>Order Total</span>
                                    <span className="text-right text-green-600 ">$1,746.50</span>
                                </div>
                            </div>
                            <div className="p-5 rounded-md space-y-3">
                                <div className="flex items-start space-x-2">
                                    <input
                                        type="checkbox"
                                        name="payment"
                                        defaultChecked
                                        className="mt-1 accent-green-600 w-4 h-4"
                                    />
                                    <div>
                                        <p className="font-semibold">Direct Bank Transfer</p>
                                        <p className="text-gray-500 text-xs">
                                            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="payment"
                                        className="accent-green-600 w-4 h-4"
                                    />
                                    <span className="text-sm">Cash on Delivery</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="payment"
                                        className="accent-green-600 w-4 h-4"
                                    />
                                  
                                    <span className="text-sm">PayPal</span>
                                    <a href="#" className="text-xs text-blue-600 hover:underline">What’s PayPal?</a>
                                </div>

                                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded">
                                    PLACE ORDER
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 