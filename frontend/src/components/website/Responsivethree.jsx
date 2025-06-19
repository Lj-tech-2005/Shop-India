'use client';

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getproduct } from '@/app/library/api-call';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';


export default function Responsivethree() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getproduct(undefined, undefined, undefined, undefined, 0, null, null, 1, true);
            setProducts(response?.products || []);
        };

        fetchProducts();
    }, []);

    const productslice = products.slice(41, 53);

    const settings = {
        dots: true,             // Optional: hide bottom dots too
        arrows: false,           // ✅ hides left/right arrow buttons
        infinite: true,
        autoplay: true,          // ✅ enables automatic sliding
        autoplaySpeed: 2500,     // ✅ delay between slides (in ms)
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };


    return (
        <div className="slider-container p-3 my-8">
            <Slider {...settings}>
                {productslice.map((product, index) => (
                    <Link key={index} href={`/singleproduct/${product?._id}`}>
                        <div key={product._id} className="p-2">
                            <div className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer h-[400px] justify-between border border-gray-100 transform transition-transform duration-300 hover:scale-105">
                                {/* Image Section */}
                                <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-gray-50">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product.thumbnail}`}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-2"
                                    />

                                    {/* Discount Badge */}
                                    {product.discountPercentage > 0 && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                            -{product.discountPercentage}%
                                        </span>
                                    )}

                                    {/* Top Selling or New Badge */}
                                    {product.topSelling ? (
                                        <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                            Top Selling
                                        </span>
                                    ) : (
                                        <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                            New Arrival
                                        </span>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="flex flex-col flex-grow mt-4">
                                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight min-h-[40px]">
                                        {product.name}
                                    </h3>

                                    {/* Price Section */}
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-lg font-bold text-blue-600">
                                            ₹{product.finalPrice}
                                        </span>
                                        {product.originalPrice > product.finalPrice && (
                                            <span className="text-sm line-through text-gray-400">
                                                ₹{product.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* Stock Status */}
                                    <div className="mt-3">
                                        {product.stock > 0 ? (
                                            <span className="text-sm text-green-600 font-medium">
                                                In Stock ({product.stock})
                                            </span>
                                        ) : (
                                            <span className="text-sm text-red-500 font-medium">
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>


    );
}
