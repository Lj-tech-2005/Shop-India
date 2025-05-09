import Image from "next/image";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaPinterestP,
} from "react-icons/fa";

export default function ContactPage() {
    return (
        <div className="max-w-[1360px] mx-auto py-5">
         
            <div className="bg-[#FFFFFF] p-7  cursor-pointer rounded-[10px] mb-6 text-[14px] text-[#999999] font-bold">
                Home / pages / <span className="text-black font-bold">Contact</span>
            </div>

        

            <div className="bg-white rounded-[10px] p-5">


                <h1 className="text-xl md:text-2xl font-bold text-black mb-1">
                    READY TO WORK WITH US
                </h1>
                <p className="text-sm text-gray-500 my-6">
                    Contact us for all your questions and opinions
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <form className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                       
                        <div>
                            <label className="block text-sm font-medium mb-1 text-black">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                                required
                            />
                        </div>

                       
                        <div>
                            <label className="block text-sm font-medium mb-1 text-black">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                                required
                            />
                        </div>

                    
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-black">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                                required
                            />
                        </div>

                     
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-black">
                                Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="tel"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>

                      
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-black">
                                Country / Region <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                                <option>United States (US)</option>
                                <option>United Kingdom (UK)</option>
                                <option>Canada</option>
                            </select>
                        </div>

                    
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-black">
                                Subject <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>

                        
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-black">
                                Message
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Note about your order, e.g. special note for delivery"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>

                   
                        <div className="md:col-span-2 flex items-start gap-2 text-sm text-gray-500">
                            <input type="checkbox" className="mt-1" />
                            <p>
                                I want to receive news and updates once in a while. By submitting,
                                I'm agreed to the{" "}
                                <a href="#" className="text-green-600 underline">
                                    Terms & Conditions
                                </a>
                            </p>
                        </div>

                  
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="bg-teal-600 text-white text-sm px-6 py-2 rounded hover:bg-teal-700 transition"
                            >
                                SEND MESSAGE
                            </button>
                        </div>
                    </form>

                
                    <div className="  rounded shadow ">
                   
                        <div className="bg-[#EDEFF6] flex flex-col gap-6 p-6">
                            <div >
                                <h4 className="uppercase text-xs font-semibold text-gray-500 mb-1">
                                    United States (Head Quarter)
                                </h4>
                                <p className="text-sm mt-5">152 Thatcher Road St, Mahattan, 10463, US</p>
                                <p className="text-sm mt-2">(+025) 3886 25 16</p>
                                <a href="#" className="text-[#1ABA1A] mt-2 text-sm underline">
                                    hello@swattechmart.com
                                </a>
                            </div>

                           
                            <div>
                                <h4 className="uppercase text-xs font-semibold text-gray-500 mb-1">
                                    United Kingdom (Branch)
                                </h4>
                                <p className="text-sm mt-5">12 Buckingham Rd, Thornthwaite, HG3 4TY, UK</p>
                                <p className="text-sm mt-2">(+718) 895-5350</p>
                                <a href="#" className="text-[#1ABA1A] mt-2 text-sm underline">
                                    contact@swattechmart.co.uk
                                </a>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-3 mt-9 text-black text-base">
                                <div className="bg-[#FFFFFF]  p-2 rounded-[17.5px]">

                                    <FaFacebookF />
                                </div>
                                <div className="bg-[#FFFFFF] p-2 rounded-[17.5px]">

                                    <FaTwitter />
                                </div>
                                <div className="bg-[#FFFFFF]  p-2 rounded-[17.5px]">

                                    <FaInstagram />
                                </div>
                                <div className="bg-[#FFFFFF]  p-2 rounded-[17.5px]">

                                    <FaYoutube />
                                </div>

                                <div className="bg-[#FFFFFF]  p-2 rounded-[17.5px]">
                                    <FaPinterestP />
                                </div>


                            </div>
                        </div>
                        {/* Image */}
                        <div className="rounded overflow-hidden">
                            <Image
                                src="/contact.png"
                                alt="Laptop"
                                width={500}
                                height={300}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Map Section */}
            <div className="bg-white rounded-lg shadow p-4 mt-10 w-full">
                <h2 className="text-lg md:text-xl font-bold mb-4">
                    FIND US ON GOOGLE MAP
                </h2>
                <div className="w-full h-[300px] md:h-[400px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.7520591458447!2d10.503480815378356!3d43.843174879114734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a9b0fd774cbf9%3A0x72f4963d0b4047b0!2sChiesa%20di%20San%20Francesco!5e0!3m2!1sen!2sit!4v1617100840213!5m2!1sen!2sit"
                        className="w-full h-full rounded-md border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

        </div>
    );
}
