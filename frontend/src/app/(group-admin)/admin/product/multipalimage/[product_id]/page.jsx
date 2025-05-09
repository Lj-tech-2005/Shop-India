'use client'
import { axiosApiInstance, notify } from "@/app/library/helper";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";



export default function productPage({ params }) {


    const submithandler = (e) => {
        e.preventDefault();

        const formdata = new FormData();
        for (let image of e.target.multiImage.files) {
            formdata.append("images", image);
        }

        axios.post(`http://localhost:5000/product/multi-images/${params?.product_id}`, formdata)
            .then((response) => {
                notify(response.data.msg, response.data.flag);
                if (response.data.flag === 1) {
                    console.log("hhhhhh")
                    console.log(response);
                }
            })
            .catch((err) => {
                console.log("jjjjjjj")
                console.log(err)
                notify("Something went wrong", 0);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Upload Image</h2>
                <form onSubmit={submithandler} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-2">Choose an image</label>
                        <input
                            type="file"
                            name="multiImage"
                            multiple
                            accept="image/*"
                            className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
