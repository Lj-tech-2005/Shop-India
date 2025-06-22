import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaPinterestP,
} from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white text-gray-700 text-sm ">
            {/* Left & Right Parts */}
            <div className="max-w-[1330px] mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Left Part */}
                    <div>
                        <h3 className="font-bold text-[18px]  mb-2 text-black text-base">
                            SHOP INDIA - 1ST NYC TECH ONLINE MARKET
                        </h3>
                        <p className="text-xs mt-9">HOTLINE 24/7</p>
                        <p className="text-[30px] font-bold text-[#E15E43]">(025) 3686 25 16</p>
                        <p className="mt-2 font-normal text-[14px]">
                            Gopalpura mod, jaipur, Rajasthan, India
                        </p>
                        <p className="font-normal text-[14px]">contact@shopindiamart.com</p>

                        {/* Social Icons */}
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

                        {/* Language / Currency */}
                        <div className="flex flex-wrap gap-4 mt-6 text-xs">
                            <div className="flex items-center border border-[#99999933] cursor-pointer px-3 py-1 rounded">
                                USD <ChevronDown className="w-3 h-3 ml-1" />
                            </div>
                            <div className="flex items-center gap-1 border border-[#99999933] cursor-pointer px-3 py-2 rounded">
                                <img width={19} src="ind.jpg" alt="" /> Eng <ChevronDown className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {/* Top Categories */}
                        <div>
                            <h4 className="text-[18px] font-bold mb-2 text-black">TOP CATEGORIES</h4>
                            <ul className="space-y-1 text-[#666666] font-normal text-[14px]">
                                <li>Laptops</li>
                                <li>PC & Computers</li>
                                <li>Cell Phones</li>
                                <li>Tablets</li>
                                <li>Gaming & VR</li>
                                <li>Networks</li>
                                <li>Cameras</li>
                                <li>Sounds</li>
                                <li>Office</li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="text-[18px] font-bold mb-2 text-black">COMPANY</h4>
                            <ul className="space-y-1 text-[#666666] font-normal text-[14px]">
                                <li>About Swoo</li>
                                <li>Contact</li>
                                <li>Career</li>
                                <li>Blog</li>
                                <li>Sitemap</li>
                                <li>Store Locations</li>
                            </ul>
                        </div>

                        {/* Help Center */}
                        <div>
                            <h4 className="text-[18px] font-bold mb-2 text-black">HELP CENTER</h4>
                            <ul className="space-y-1 text-[#666666] font-normal text-[14px] mb-4">
                                <li>Customer Service</li>
                                <li>Policy</li>
                                <li>Terms & Conditions</li>
                                <li>Track Order</li>
                                <li>FAQs</li>
                                <li>My Account</li>
                                <li>Product Support</li>
                            </ul>
                        </div>

                        {/* Partner */}
                        <div>
                            <h4 className="text-[18px] font-bold mb-2 text-black">PARTNER</h4>
                            <ul className="space-y-1 text-[#666666] font-normal text-[14px]">
                                <li>Become Seller</li>
                                <li>Affiliate</li>
                                <li>Advertise</li>
                                <li>Partnership</li>
                            </ul>
                        </div>

                        {/* Subscribe */}
                        <div className="col-span-2 sm:col-span-4 mt-6">
                            <h4 className="text-[18px] font-bold text-[#000000] mb-2">
                                SUBSCRIBE & GET <span className="text-red-600">10% OFF</span> FOR YOUR FIRST ORDER
                            </h4>
                            <form className="flex flex-col sm:flex-row border-b-1 border-[#CCCCCC] items-center gap-2 mt-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full sm:w-auto flex-1  px-4 py-2 text-sm rounded"
                                />
                                <button
                                    type="submit"
                                    className="text-[#E15E43] text-[14px] font-bold uppercase"
                                >
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-[13px]  font-normal text-[#666666] mt-2 italic">
                                By subscribing, you're accepting our{" "}
                                <a href="#" className="underline">Policy</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-[#99999955] text-[14px] font-normal py-6 px-4 sm:px-6 lg:px-8 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2024 <span className="font-bold">Shopindia</span>. All Rights Reserved</p>
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <img src="pay1.png" alt="visa" className="h-4" />
                        <img src="pay2.png" alt="visa" className="h-4" />
                        <img src="pay3.png" alt="visa" className="h-4" />
                        <img src="pay4.png" alt="visa" className="h-4" />
                        <img src="pay5.png" alt="visa" className="h-4" />

                    </div>
                    <a href="#" className="text-blue-600 hover:underline">Mobile Site</a>
                </div>
            </div>
        </footer>
    );
}

