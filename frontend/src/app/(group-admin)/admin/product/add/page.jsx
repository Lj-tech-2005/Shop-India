'use client';

import { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { axiosApiInstance, createSlug, notify } from '@/app/library/helper';
import Select from 'react-select';
import dynamic from 'next/dynamic';
import { getBrand, getCategory, getColor } from '@/app/library/api-call';
import Link from 'next/link';

// Dynamically import RichTextEditor to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

export default function AddProductForm() {
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [color, setColor] = useState();
  const [selColors, setSelColors] = useState([]);
  const [description, setdiscription] = useState("");

  const nameRef = useRef();
  const slugRef = useRef();
  const originalPriceRef = useRef();
  const discountPriceRef = useRef();
  const finalPriceRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const categoryJSON = await getCategory();
      setCategory(categoryJSON?.categorys);

      const colorJSON = await getColor();
      setColor(colorJSON?.colors);

      const brandJSON = await getBrand();
      setBrand(brandJSON?.brands);
    };
    fetchData();
  }, []);

  const changeHandler = () => {
    const slug = createSlug(nameRef.current.value);
    slugRef.current.value = slug;
  };

  const finalPrice = () => {
    const op = originalPriceRef.current.value;
    const dp = discountPriceRef.current.value;
    const final = Math.floor(op - op * (dp / 100));
    finalPriceRef.current.value = final;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("slug", slugRef.current.value);
    formData.append("shortDescription", e.target.shortDesc.value);
    formData.append("longDescription", description);
    formData.append("originalPrice", originalPriceRef.current.value);
    formData.append("discountPercentage", discountPriceRef.current.value);
    formData.append("finalPrice", finalPriceRef.current.value);
    formData.append("categoryId", e.target.categoryId.value);
    formData.append("brandId", e.target.brandId.value);
    formData.append("colors", JSON.stringify(selColors));
    formData.append("thumbnail", e.target.productImage.files[0]);

    axiosApiInstance.post("/product/create", formData)
      .then((res) => {
        notify(res.data.msg, res.data.flag);
        if (res.data.flag === 1) {
          e.target.reset();
          setdiscription("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
        <div className='flex justify-between'>
          <h2 className="text-2xl cursor-pointer font-semibold text-gray-800 mb-8">Add a New Product</h2>
          <Link href="/admin/product">
            <button className="flex items-center gap-2 text-sm cursor-pointer font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full shadow hover:shadow-md transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </button>
          </Link>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Product Name</label>
              <input type="text" ref={nameRef} onChange={changeHandler} placeholder="Enter product name" required className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600 p-3" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Product Slug</label>
              <input type="text" ref={slugRef} readOnly required className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600 p-3" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Pricing</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
              <input type="number" ref={originalPriceRef} onChange={finalPrice} placeholder="Original Price" required className="p-3 rounded-xl border border-gray-300" />
              <input type="number" ref={discountPriceRef} onChange={finalPrice} placeholder="Discount %" required className="p-3 rounded-xl border border-gray-300" />
              <input type="number" ref={finalPriceRef} placeholder="Final Price" readOnly required className="p-3 rounded-xl border border-gray-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Select name="categoryId" options={category?.map(c => ({ value: c._id, label: c.name }))} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Brand</label>
              <Select name="brandId" options={brand?.map(b => ({ value: b._id, label: b.name }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Available Colors</label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                onChange={colors => setSelColors(colors.map(c => c.value))}
                options={color?.map(c => ({ value: c._id, label: c.name }))}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Short Description</label>
            <textarea name="shortDesc" rows="3" placeholder="Brief description" className="w-full p-3 rounded-xl border border-gray-300"></textarea>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Detailed Description</label>
            <RichTextEditor value={description} change={setdiscription} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Product Image</label>
            <input type="file" name="productImage" required className="w-full p-3 border rounded-xl border-gray-300" />
          </div>

          <button type="submit" className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md">
            <FaPlus /> Add Product
          </button>
        </form>
      </div>
    </section>

  );
}
