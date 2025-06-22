
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="max-w-[1360px]  mx-auto py-5">

            <div className="bg-[#FFFFFF] p-7 rounded-[10px] mb-6 text-[14px] text-[#999999] font-bold">
                Home / pages / <span className="text-black font-semibold">About</span>
            </div>

            <div className="bg-white  p-6 rounded-2xl">


                <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl overflow-hidden   flex flex-col md:flex-row items-center justify-between gap-6">

                    <Image
                        src="/about-banner.png"
                        alt="Boxes"
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
                            <p className="text-sm text-gray-500">ORDERS DELIVERED SUCCESSFUL ON EVERYDAY</p>
                        </div>
                        <div>
                            <p className="text-[40px] font-bold text-gray-800">725+</p>
                            <p className="text-sm text-gray-500">STORE AND OFFICE IN U.S AND WORLDWIDE</p>
                        </div>
                    </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-2">
                    <div className="rounded-xl overflow-hidden">
                        <Image
                            src="/about1.png"
                            alt="Delivery Person"
                            className="w-full object-cover"
                            height={900}
                            width={900}
                        />
                    </div>
                    <div className="bg-[#E2E4EB] rounded-xl shadow p-6 flex flex-col justify-center px-21 gap-9">
                        <h2 className="text-[18px] md:text-xl font-bold text-gray-900 mb-2">
                            We connect millions of buyers and sellers around the world, empowering people & creating economic opportunity for all.
                        </h2>
                        <p className="text-[14px] text-gray-600 mb-4">
                            Within our markets, millions of people around the world connect, both online and offline, to make, sell and buy unique goods. We also offer a wide range of Seller Services and tools that help creative entrepreneurs start, manage & scale their businesses.
                        </p>
                        <button className="self-start bg-teal-600 hover:bg-teal-700 text-white p-4 px-6 rounded-[10px] text-[12px ]font-medium">OUR SHOWREEL</button>
                    </div>
                </div>
            </div>

            <div className=" mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center  justify-between">
                            <h3 className="text-sm font-bold text-black mb-2">100% AUTHENTIC <br /> PRODUCTS</h3>
                            <div className="p-5 rounded-full bg-teal-500 " />
                        </div>
                        <p className="text-[14px] mt-8 text-gray-600">
                            Shop india just distribute 100% authorized products & guarantee quality. Nulla porta nulla nec orci
                            vulputate, id rutrum sapien varius.
                        </p>
                    </div>

                </div>


                <div className="bg-white  rounded-lg shadow p-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center  justify-between">
                            <h3 className="text-sm font-bold text-black mb-2">fast <br /> DELIVERY</h3>
                            <div className="p-5 rounded-full bg-teal-500 " />
                        </div>
                        <p className="text-[14px] mt-8 text-gray-600">
                            Fast shipping with a lots of option to delivery. 100% guarantee that your goods away on time and preserve
                            quality.
                        </p>
                    </div>

                </div>

                <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center  justify-between">
                            <h3 className="text-sm font-bold text-black mb-2">AFFORDABLE  <br /> PRICE</h3>
                            <div className="p-5 rounded-full bg-teal-500 " />
                        </div>
                        <p className="text-[14px] mt-8 text-gray-600">
                            We offer an affordable & competitive price with a lots of special promotions.

                        </p>
                    </div>

                </div>
            </div>


            <div className="bg-white mt-5 rounded-2xl  mx-auto p-5 space-y-12">


                <section>
                    <h2 className="text-xl font-bold mb-2">OUR MISSION AND VISION</h2>
                    <p className="text-gray-600 mb-4">
                        Nam maximus nunc a augue pulvinar, non euismod mauris tempor. Cras non elit vel magna molestie pellentesque in eu dui.
                        Donec laoreet quis erat vitae finibus. Vestibulum enim eros, porta eget quam et, euismod dictum elit. Nullam eu tempor magna.
                        Fusce malesuada nisi id felis placerat porta vel sed augue. <strong className="text-black">Vivamus mollis mauris</strong> vitae rhoncus egestas.
                    </p>
                    <div className="w-full h-[400px] relative rounded-lg overflow-hidden shadow">
                        <Image
                            src="/about3.png"
                            alt="Office Building"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </section>


                <section>
                    <h2 className="text-xl font-bold mb-4">FROM A RETAIL STORE TO THE GLOBAL CHAIN OF STORES</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                        <ul className="space-y-2">
                            <li><strong>1997:</strong> A small store located in Brooklyn Town, USA</li>
                            <li><strong>1998:</strong> In a time so established that it was hard to be attracted by the readable</li>
                            <li><strong>2000:</strong> Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                            <li><strong>2002:</strong> Lorem Ipsum has been the industry's standard dummy text since the 1500s</li>
                            <li><strong>2006:</strong> Contrary to popular belief, Lorem Ipsum is not simply random text</li>
                            <li><strong>2007:</strong> The point of using Lorem Ipsum is that it has a more-or-less normal distribution</li>
                            <li><strong>2011:</strong> There are many variations of passages of Lorem Ipsum available</li>
                            <li><strong>2012:</strong> Lorem Ipsum comes from sections 1.10.32</li>
                        </ul>
                        <ul className="space-y-2">
                            <li><strong>2014:</strong> There are many variations of passages of Lorem Ipsum available</li>
                            <li><strong>2016:</strong> All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks</li>
                            <li><strong>2018:</strong> Lorem Ipsum comes from sections 1.10.32</li>
                            <li><strong>2020:</strong> Making this the first true generator on the Internet</li>
                            <li><strong>2022:</strong> Lorem Ipsum is therefore always free from repetition</li>
                            <li><strong>2023:</strong> There are many variations of passages of Lorem Ipsum available</li>
                            <li><strong>2025:</strong> New era begins for the global chain expansion</li>
                        </ul>
                    </div>
                </section>


                <section>
                    <h2 className="text-xl font-bold mb-4">LEADERSHIPS</h2>
                    <div className="bg-white">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">

                            {/* Card 1 */}
                            <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src="/ab1.png"
                                    alt="Henry Avery"
                                    width={300}
                                    height={400}
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Henry Avery</h2>
                                    <p className="text-gray-500 text-sm mt-1">CHAIRMAN</p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src="/ab2.png"
                                    alt="Michael Edward"
                                    width={300}
                                    height={400}
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Michael Edward</h2>
                                    <p className="text-gray-500 text-sm mt-1">VICE PRESIDENT</p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src="/ab3.png"
                                    alt="Eden Hazard"
                                    width={300}
                                    height={400}
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Eden Hazard</h2>
                                    <p className="text-gray-500 text-sm mt-1">CEO</p>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src="/ab4.png"
                                    alt="Robert Downey Jr"
                                    width={300}
                                    height={400}
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Robert Downey Jr</h2>
                                    <p className="text-gray-500 text-sm mt-1">CEO</p>
                                </div>
                            </div>

                            {/* Card 5 */}
                            <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src="/ab5.png"
                                    alt="Nathan Drake"
                                    width={300}
                                    height={400}
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">Nathan Drake</h2>
                                    <p className="text-gray-500 text-sm mt-1">STRATEGIST DIRECTOR</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="text-right mt-3">
                        <a href="#" className="text-sm text-blue-500 hover:underline">
                            View All
                        </a>
                    </div>
                </section>
            </div>
            <div className="max-w-[1340px] mt-15">
                <Image
                    src="/abbt.png"
                    alt="Nathan Drake"
                    width={900}
                    height={900}
                    className="w-full  object-cover"
                />
            </div>

        </div >
    );
}
