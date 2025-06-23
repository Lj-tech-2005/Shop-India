'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { axiosApiInstance, createSlug, notify } from '@/app/library/helper';
import Select from 'react-select';
import { getBrand, getCategory, getColor } from '@/app/library/api-call';
import RichTextEditor from '@/components/admin/RichTextEditor';
import Link from 'next/link';

export default function AddProductForm() {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [color, setColor] = useState([]);
  const [selColors, setSelColors] = useState([]);
  const [description, setdiscription] = useState("");
  const nameRef = useRef();
  const slugRef = useRef();
  const originalPriceRef = useRef();
  const discountPriceRef = useRef();
  const finalPriceRef = useRef();

  const fetchData = async () => {
    try {
      const [categoryJSON, brandJSON, colorJSON] = await Promise.all([
        getCategory(),
        getBrand(),
        getColor(),
      ]);

      setCategory(categoryJSON?.categorys || []);
      setBrand(brandJSON?.brands || []);
      setColor(colorJSON?.colors || []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const changeHandler = () => {
    const slug = createSlug(nameRef.current.value);
    slugRef.current.value = slug;
  };

  const finalPrice = () => {
    const op = Number(originalPriceRef.current.value);
    const dp = Number(discountPriceRef.current.value);
    const final = Math.floor(op - op * (dp / 100));
    finalPriceRef.current.value = final;
  };

  const submitHandler = async (e) => {
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

    try {
      const res = await axiosApiInstance.post("product/create", formData);
      notify(res.data.msg, res.data.flag);
      if (res.data.flag === 1) {
        e.target.reset();
        setdiscription("");
        setSelColors([]);
      }
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Add a New Product</h2>
          <Link href="/admin/product">
            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full shadow">
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
              <input type="text" ref={nameRef} onChange={changeHandler} placeholder="Enter product name" required className="mt-1 block w-full rounded-xl border p-3" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Product Slug</label>
              <input type="text" ref={slugRef} readOnly placeholder="example-product-name" required className="mt-1 block w-full rounded-xl border p-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <inputGroup ref={originalPriceRef} onChange={finalPrice} label="Original Price" placeholder="1000" />
            <inputGroup ref={discountPriceRef} onChange={finalPrice} label="Discount Price" placeholder="800" />
            <inputGroup ref={finalPriceRef} label="Final Price" placeholder="750" readOnly />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField name="categoryId" label="Category" options={category} />
            <SelectField name="brandId" label="Brand" options={brand} />
            <MultiSelectField label="Color" options={color} setSelected={setSelColors} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Short Description</label>
            <textarea name="shortDesc" rows="3" placeholder="Brief description of the product" className="mt-1 block w-full rounded-xl border p-3"></textarea>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Long Description</label>
            <RichTextEditor value={description} change={setdiscription} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Upload Image</label>
            <input type="file" name="productImage" required className="mt-1 block w-full rounded-xl border p-3" />
          </div>

          <div className="pt-4">
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md">
              <FaPlus /> Add Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function inputGroup({ ref, onChange, label, placeholder, readOnly }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        ref={ref}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        required
        className="mt-1 block w-full rounded-xl border p-3"
      />
    </div>
  );
}

function SelectField({ name, label, options }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Select name={name} options={options.map(opt => ({ value: opt._id, label: opt.name }))} />
    </div>
  );
}

function MultiSelectField({ label, options, setSelected }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={options.map(opt => ({ value: opt._id, label: opt.name }))}
        onChange={selected => setSelected(selected.map(s => s.value))}
      />
    </div>
  );
}
