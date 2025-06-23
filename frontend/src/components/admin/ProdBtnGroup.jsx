'use client';
import Swal from 'sweetalert2';
import { axiosApiInstance, notify } from '@/app/library/helper';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaTimesCircle, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

export default function ProdBtnGroup({ product }) {
  const [toggle, settoggle] = useState(null);
  const router = useRouter();

  const statushandler = (id, flag) => {
    axiosApiInstance
      .patch(`product/status/${id}`, { flag })
      .then((response) => {
        notify(response.data.msg, response.data.flag);
        if (response.data.flag === 1) {
          router.refresh();
        }
      })
      .catch((err) => {
        console.log(err);
        notify('Something went wrong', 0);
      });
  };

  const deletehandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosApiInstance
          .delete(`product/delete/${id}`)
          .then((response) => {
            notify(response.data.msg, response.data.flag);
            if (response.data.flag === 1) {
              router.refresh();
            }
          })
          .catch((err) => {
            console.log(err);
            notify('Something went wrong', 0);
          });
      }
    });
  };

  return (
    <>
      {/* Stock Status */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          onClick={() => statushandler(product._id, 1)}
          className={`px-2 cursor-pointer py-1 text-xs rounded-full font-semibold ${product.stock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}
        >
          {product.stock ? 'In Stock' : 'Out of Stock'}
        </span>
      </td>

      {/* Top Selling Toggle */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          onClick={() => statushandler(product._id, 2)}
          className={`inline-block cursor-pointer w-11 h-6 rounded-full relative ${product.topSelling ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition transform ${product.topSelling ? 'translate-x-full' : ''
              }`}
          />
        </span>
      </td>

      {/* Status Toggle */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          onClick={() => statushandler(product._id, 3)}
          className={`inline-block cursor-pointer w-11 h-6 rounded-full relative ${product.status ? 'bg-blue-600' : 'bg-gray-300'
            }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition transform ${product.status ? 'translate-x-full' : ''
              }`}
          />
        </span>
      </td>

      {/* Action Buttons */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex flex-wrap gap-2">
          <Link href={`/admin/product/multipalimage/${product._id}`}>
            <button className="w-24 flex items-center justify-center gap-1 bg-amber-600 text-white px-3 py-1 rounded text-xs cursor-pointer hover:bg-amber-700">
              Image
            </button>
          </Link>

          <button
            onClick={() => settoggle(product)}
            className="w-24 flex items-center justify-center gap-1 bg-amber-200 text-black px-3 py-1 rounded text-xs cursor-pointer hover:text-blue-700"
          >
            <FaEye className="inline" /> View
          </button>

          <Link href={`/admin/product/edit/${product._id}`}>
            <button className="w-24 flex items-center justify-center gap-1 bg-black text-yellow-500 px-3 py-1 rounded text-xs cursor-pointer hover:text-yellow-600">
              <FaEdit className="inline" /> Edit
            </button>
          </Link>

          <button
            onClick={() => deletehandler(product._id)}
            className="w-24 flex items-center justify-center gap-1 bg-teal-300 text-red-500 px-3 py-1 rounded text-xs cursor-pointer hover:text-red-700"
          >
            <FaTrash className="inline" /> Delete
          </button>
        </div>

        {toggle && <ProductDetail product={toggle} onClose={() => settoggle(null)} />}
      </td>

    </>
  );
}

// Modal Component
const ProductDetail = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto px-4">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 cursor-pointer text-gray-600 hover:text-red-500 z-10"
      >
        <FaTimesCircle className="w-6 h-6" />
      </button>

      <div className="max-w-3xl mx-auto pt-16 pb-10 space-y-8">
        {product.thumbnail && (
          <div className="flex justify-center">
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product.thumbnail}`}
              alt={product.name}
              className="w-full max-w-md object-contain rounded-lg shadow"
            />
          </div>
        )}

        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-gray-800 break-words max-w-full text-wrap">
            {product.name}
          </h1>

          <p className="text-sm text-gray-500 mt-1 break-words">
            Slug: {product.slug}
          </p>
        </div>


        <div className="bg-gray-100 p-4 rounded space-y-2">
          <p><strong>Original Price:</strong> ₹{product.originalPrice}</p>
          <p><strong>Discount:</strong> {product.discountPercentage}%</p>
          <p className="text-green-700 font-bold">Final Price: ₹{product.finalPrice}</p>
          <p>
            <strong>Stock:</strong>{' '}
            <span className={product.stock ? 'text-green-600' : 'text-red-600'}>
              {product.stock ? 'Available' : 'Out of Stock'}
            </span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <p><strong>Category:</strong> {product.categoryId?.name}</p>
          <p><strong>Brand:</strong> {product.brandId?.name || 'N/A'}</p>
        </div>

        {product.colors?.length > 0 && (
          <div>
            <p className="font-semibold mb-1">Colors:</p>
            <div className="flex gap-2">
              {product.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border shadow"
                  style={{ backgroundColor: color.Hexcode }}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="font-semibold">Short Description:</p>
          <p className="text-gray-700 text-sm mt-1 whitespace-pre-wrap">
            {product.shortDescription}
          </p>
        </div>

        <div>
          <p className="font-semibold">Long Description:</p>
          <div
            className="prose prose-sm text-gray-700 max-w-none mt-1"
            dangerouslySetInnerHTML={{ __html: product.longDescription }}
          />
        </div>

        {product.images?.length > 0 && (
          <div>
            <p className="font-semibold mb-2">Gallery:</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${img}`}
                  alt={`img-${i}`}
                  className="h-24 w-24 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
