import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="max-w-[1360px] mx-auto py-5">
            <div className="bg-[#FFFFFF] p-7 rounded-[10px] mb-6 text-[14px] text-[#999999] font-bold">
                Home / pages / <span className="text-black font-semibold">About</span>
            </div>

            <div className="bg-white p-6 rounded-2xl">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                    <Image
                        src="/about-banner.png"
                        alt="About Shop India"
                        className="w-full"
                        width={900}
                        height={900}
                    />
                </div>

                <div className="bg-white rounded-xl text-[18px] shadow p-6 md:p-10 flex flex-col md:flex-row gap-10">
                    <div className="md:w-1/3 text-center md:text-left">
                        <p className="font-bold text-black">
                            OUR PURPOSE IS TO <span className="text-green-600">ENRICH</span>
                        </p>
                        <p className="font-bold text-black whitespace-nowrap">
                            AND <span className="text-green-600">ENHANCE LIVES THROUGH</span>
                        </p>
                        <p className="font-bold text-black">TECHNOLOGY</p>
                    </div>

                    <div className="md:w-2/3 flex flex-col sm:flex-row justify-between gap-6 text-center sm:text-left">
                        <div>
                            <p className="text-[40px] font-bold text-gray-800">₹12.5M</p>
                            <p className="text-sm text-gray-500">TOTAL REVENUE FROM 2001 - 2023</p>
                        </div>
                        <div>
                            <p className="text-[40px] font-bold text-gray-800">12K+</p>
                            <p className="text-sm text-gray-500">ORDERS DELIVERED EVERY DAY ACROSS INDIA</p>
                        </div>
                        <div>
                            <p className="text-[40px] font-bold text-gray-800">725+</p>
                            <p className="text-sm text-gray-500">WAREHOUSES AND OFFICES ACROSS INDIA & GLOBALLY</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-2">
                    <div className="rounded-xl overflow-hidden">
                        <Image
                            src="/myabout.png"
                            alt="Shop India Delivery"
                            className="w-full object-cover"
                            height={900}
                            width={900}
                        />
                    </div>
                    <div className="bg-[#E2E4EB] rounded-xl shadow p-6 flex flex-col justify-center px-21 gap-9">
                        <h2 className="text-[18px] md:text-xl font-bold text-gray-900 mb-2">
                            We connect millions of buyers and sellers across India, empowering local businesses and creating economic opportunities for all.
                        </h2>
                        <p className="text-[14px] text-gray-600 mb-4">
                            Shop India helps small businesses and independent sellers grow with digital tools to start, manage, and scale their online stores. We bring buyers and sellers together on one trusted platform.
                        </p>
                        <button className="self-start bg-teal-600 hover:bg-teal-700 text-white p-4 px-6 rounded-[10px] text-[12px ]font-medium">OUR SHOWREEL</button>
                    </div>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-black mb-2">100% AUTHENTIC <br /> PRODUCTS</h3>
                            <div className="p-5 rounded-full bg-teal-500" />
                        </div>
                        <p className="text-[14px] mt-8 text-gray-600">
                            Shop India delivers only 100% genuine and quality-checked products sourced from verified sellers.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-black mb-2">FAST <br /> DELIVERY</h3>
                            <div className="p-5 rounded-full bg-teal-500" />
                        </div>
                        <p className="text-[14px] mt-8 text-gray-600">
                            Shop India ensures quick delivery with multiple shipping options and on-time service across the country.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-black mb-2">AFFORDABLE <br /> PRICES</h3>
                            <div className="p-5 rounded-full bg-teal-500" />
                        </div>
                        <p className="text-[14px] mt-8 text-gray-600">
                            We offer competitive pricing and frequent deals to ensure you always get the best value at Shop India.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white mt-5 rounded-2xl mx-auto p-5 space-y-12">
                <section>
                    <h2 className="text-xl font-bold mb-2">OUR MISSION AND VISION</h2>
                    <p className="text-gray-600 mb-4">
                        At Shop India, our mission is to make e-commerce accessible and affordable for every Indian. We aim to empower individuals and businesses by giving them a platform to grow and thrive.
                        <strong className="text-black"> Our goal is to transform retail </strong> in India through digital innovation and customer-centric service.
                    </p>
                    <div className="w-full h-[400px] relative rounded-lg overflow-hidden shadow">
                        <Image
                            src="/about3.png"
                            alt="Shop India Office"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">OUR JOURNEY FROM A LOCAL STORE TO A NATIONAL BRAND</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                        <ul className="space-y-2">
                            <li><strong>2001:</strong> Small retail store started in Jaipur, Rajasthan</li>
                            <li><strong>2005:</strong> Expanded to 5 cities with logistics partnerships</li>
                            <li><strong>2010:</strong> Introduced e-commerce platform for pan-India reach</li>
                            <li><strong>2014:</strong> Crossed 1 lakh customers milestone</li>
                            <li><strong>2018:</strong> Opened 100+ fulfillment centers across India</li>
                            <li><strong>2020:</strong> Partnered with thousands of local sellers & artisans</li>
                            <li><strong>2023:</strong> Became a household name in Indian online shopping</li>
                            <li><strong>2025:</strong> Expanding globally with new ventures</li>
                        </ul>
                        <ul className="space-y-2">
                            <li><strong>2002:</strong> Launched our first online store</li>
                            <li><strong>2006:</strong> Focused on mobile-first experience</li>
                            <li><strong>2012:</strong> Adopted fast delivery systems for rural areas</li>
                            <li><strong>2016:</strong> Won national awards for digital retail innovation</li>
                            <li><strong>2019:</strong> Shop India mobile app crossed 10M downloads</li>
                            <li><strong>2021:</strong> Launched exclusive seller onboarding program</li>
                            <li><strong>2024:</strong> Introduced AI-based recommendation engine</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">OUR LEADERSHIP TEAM</h2>
                    <div className="bg-white">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                            {/* Cards remain unchanged, only company context is Indian */}
                            {/* Add or replace members if needed */}
                            <div className="rounded-xl cursor-pointer overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image src="/d1.webp" alt="Bahgirath-Giri" width={300} height={400} className="w-full h-[300px] object-cover" />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Bahgirath-Giri</h2>
                                    <p className="text-gray-500 text-sm mt-1">CHAIRMAN</p>
                                </div>
                            </div>
                            <div className="rounded-xl  cursor-pointer overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image src="/d2.jpg" alt="Virendra Singh" width={300} height={400} className="w-full h-[300px] object-cover" />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Virendra Singh</h2>
                                    <p className="text-gray-500 text-sm mt-1">VICE PRESIDENT</p>
                                </div>
                            </div>
                            <div className="rounded-xl  cursor-pointer overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image src="/d3.jfif" alt="Mahaveer Kumawat" width={300} height={400} className="w-full h-[300px] object-cover" />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Mahaveer Kumawat</h2>
                                    <p className="text-gray-500 text-sm mt-1">CEO</p>
                                </div>
                            </div>
                            <div className="rounded-xl  cursor-pointer overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image src="/d4.jpg" alt="Nikhil Khandelwal" width={300} height={400} className="w-full h-[300px] object-cover" />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Nikhil Khandelwal</h2>
                                    <p className="text-gray-500 text-sm mt-1">CEO</p>
                                </div>
                            </div>
                            <div className="rounded-xl  cursor-pointer overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image src="/d5.jpg" alt="Lokesh jangir" width={300} height={400} className="w-full h-[300px] object-cover" />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Lokesh jangir</h2>
                                    <p className="text-gray-500 text-sm mt-1">STRATEGIST DIRECTOR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </section>
            </div>

            <div className="max-w-[1340px] mt-15">
                <Image
                    src="/abbt.png"
                    alt="Shop India Promo"
                    width={900}
                    height={900}
                    className="w-full object-cover"
                />
            </div>
        </div>
    );
}
