import Image from 'next/image';
import { FaHeart, FaBalanceScale } from 'react-icons/fa';
import { PiMinus, PiPlus } from 'react-icons/pi';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaPinterestP,
} from "react-icons/fa";
import { ChevronDown } from "lucide-react";
export default function ProductPage() {
    return (

        <div className='max-w-[1360px] mx-auto'>
            <div className="text-sm rounded-[10px] p-6 w-full my-5 bg-white text-gray-500">
                Home / Shop / Top Cell Phones & Tablets / <span className="text-black font-semibold">Somseng Galatero X6 Ultra LTE 4G/128 GB Black Smartphone</span>
            </div>
            <div className="bg-white p-4 rounded-2xl md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Images */}
                    <div className="flex flex-col items-center">
                        <span className="text-xs bg-black text-white px-2 py-0.5 rounded mb-2">NEW</span>
                        <div className=" w-full">
                            <Image src="/m1.png" alt="Phone" width={400} height={400} />
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Image src="/m2.png" alt="thumb1" width={40} height={60} className="object-contain" />
                            <Image src="/m3.png" alt="thumb2" width={40} height={60} className="object-contain" />
                            <Image src="/m4.png" alt="thumb3" width={40} height={60} className="object-contain" />
                        </div>
                    </div>

                    {/* Middle Info */}
                    <div className="space-y-4">
                        <h2 className="font-semibold text-lg">Somseng Galatero X6 Ultra LTE 4G/128GB, Black Smartphone</h2>
                        <p className="text-xl font-semibold">$569.00 - $609.00</p>

                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core</li>
                            <li>DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory</li>
                            <li>Commanding Power Design: Twin 16+1+2 Phases Digital VRM</li>
                        </ul>

                        <div className="flex gap-2">
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">FREE SHIPPING</span>
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">FREE GIFT</span>
                        </div>

                        <div>
                            <p className="text-sm font-medium">COLOR: <span className="text-gray-600">Midnight Blue</span></p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <button className={`border px-3 py-2 text-xs rounded flex flex-col items-center justify-center`}>
                                    <Image src="/m2.png" width={30} height={30} alt='img' />
                                    <span>{'$569.00'}</span>
                                </button>
                                <button className={`border px-3 py-2 text-xs rounded flex flex-col items-center justify-center`}>
                                    <Image src={`/m5.png`} width={30} height={30} alt='img' />
                                    <span>{'$569.00'}</span>
                                </button>
                                <button className={`border px-3 py-2 text-xs rounded flex flex-col items-center justify-center`}>
                                    <Image src={`/m6.png`} width={30} height={30} alt='img' />
                                    <span>{'$569.00'}</span>
                                </button>

                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium">MEMORY SIZE: <span className="text-gray-600">128GB</span></p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {['64GB', '128GB', '256GB', '512GB'].map((size, idx) => (
                                    <button
                                        key={idx}
                                        className={`border px-4 py-1 rounded text-sm ${size === '128GB' ? 'bg-green-100 border-green-500' : 'border-gray-300'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-green-50 flex items-center gap-3 p-4 rounded">
                            <Image src={"/gift.png"} width={90} height={90} alt='gift'></Image>
                            <div>
                                <p className="text-sm"><span className="text-red-600 font-semibold">Buy 02</span> boxes get a <strong>Snack Tray</strong></p>
                                <p className="text-sm"><span className="text-red-600 font-semibold">Buy 04</span> boxes get a <strong>free Block Toys</strong></p>
                                <p className="text-xs text-right mt-1 text-gray-500">Promotion will expire in: 9h00pm, 25/5/2024</p>
                            </div>
                        </div>

                        <div className="text-sm text-black">
                            <p><strong>SKU:</strong> ABC025168</p>
                            <p><strong>CATEGORY:</strong> Cell Phones & Tablets</p>
                            <p><strong>BRAND:</strong> somsong</p>
                        </div>

                        <div className="flex gap-3 mt-9 text-gray-600 text-base">
                            <div className="bg-[#E1E3EB] p-2 rounded-[17.5px]">

                                <FaFacebookF />
                            </div>
                            <div className="bg-[#E1E3EB] p-2 rounded-[17.5px]">

                                <FaTwitter />
                            </div>
                            <div className="bg-[#E1E3EB] p-2 rounded-[17.5px]">

                                <FaInstagram />
                            </div>
                            <div className="bg-[#E1E3EB] p-2 rounded-[17.5px]">

                                <FaYoutube />
                            </div>

                            <div className="bg-[#E1E3EB] p-2 rounded-[17.5px]">
                                <FaPinterestP />
                            </div>


                        </div>
                    </div>

                    {/* Right Summary */}
                    <div >
                        <div className="bg-[#EDEFF6] max-w-[302.5px] p-4 rounded-2xl space-y-4">
                            <h2 className="text-2xl font-bold">$609.00</h2>
                            <p className="text-sm text-gray-600">affirm <strong>$49/m</strong> in 12 months. <a href="#" className="text-blue-500">See more</a></p>
                            <p className="text-green-600 text-sm">In stock</p>

                            <div className="flex items-center gap-4">
                                <button className="p-2 border rounded"><PiMinus /></button>
                                <span>1</span>
                                <button className="p-2 border rounded"><PiPlus /></button>
                            </div>

                            <button className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">ADD TO CART</button>
                            <button className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500">BUY WITH PayPal</button>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <p><FaHeart className="inline mr-1" /> Wishlist added</p>
                                <p><FaBalanceScale className="inline mr-1" /> Compare</p>
                            </div>

                            <div className="border-t pt-2">
                                <p className="text-sm font-semibold">Guaranteed Safe Checkout</p>
                                <Image className='mt-4' src="/pay.png" alt="Payments" width={250} height={30} />
                            </div>
                        </div>

                        <div className='mt-9 p-5 py-9 rounded-2xl max-w-[302.5px]  bg-[#EDEFF6]'>

                            <div className="bg-[#333333] text-white p-2 w-[151.08999633789062px] rounded text-center">
                                <p className="text-sm">Quick Order 24/7</p>
                            </div>
                            <p className="text-xl font-bold">(025) 3886 25 16</p>
                        </div>
                        <div className='flex gap-4 mt-4 text-[14px] items-center'>
                            <img src="/symbol.png" alt="" />
                            <p className="text-xs  text-black">Ships from <strong>United States</strong></p>

                        </div>

                    </div>

                </div>


            </div>
        </div>
    );
}
