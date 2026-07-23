'use client';
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { axiosApiInstance, notify } from '@/app/library/helper';

export default function ContactPage() {
  const user = useSelector((state) => state.user.data);
  const [topMessage, setTopMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setTopMessage({ type: 'error', text: 'Please login first to send a message.' });
      return;
    }

    try {
      const res = await axiosApiInstance.post('contact/message', {
        ...formData,
        userId: user._id,
      });

      if (res.data.flag === 1) {
        setTopMessage({ type: 'success', text: 'Your message has been sent successfully. We will reply within 7 working days.' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          subject: '',
          message: '',
        });
      } else {
        setTopMessage({ type: 'error', text: res.data.message || 'Failed to send message' });
      }
    } catch (err) {
      console.error(err);
      setTopMessage({ type: 'error', text: 'Something went wrong' });
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto py-5">
      <div className="bg-[#FFFFFF] p-7 cursor-pointer rounded-[10px] mb-6 text-[14px] text-[#999999] font-bold">
        Home / pages / <span className="text-black font-bold">Contact</span>
      </div>

      <div className="bg-white rounded-[10px] p-5">
        <h1 className="text-xl md:text-2xl font-bold text-black mb-1">READY TO WORK WITH US</h1>
        <p className="text-sm text-gray-500 my-6">Contact us for all your questions and opinions</p>

        {/* 🟥 Top message */}
        {topMessage.text && (
          <div
            className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
              topMessage.type === 'error'
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-green-100 text-green-700 border border-green-300'
            }`}
          >
            {topMessage.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-black">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-black">
                Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-black">
                Country / Region <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">Select Country</option>
                <option>India</option>
                <option>United States</option>
                <option>Canada</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-black">
                Subject <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-black">Message</label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="md:col-span-2 flex items-start gap-2 text-sm text-gray-500">
              <input type="checkbox" className="mt-1" />
              <p>
                I want to receive news and updates. By submitting, I agree to the{" "}
                <a href="#" className="text-green-600 underline">Terms & Conditions</a>.
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

          {/* 📍 Updated Contact Sidebar */}
          <div className="rounded shadow">
            <div className="bg-[#EDEFF6] flex flex-col gap-6 p-6">
              <div>
                <h4 className="uppercase text-xs font-semibold text-gray-500 mb-1">
                  India (Head Office)
                </h4>
                <p className="text-sm mt-5">Gopalpura Mod, Tonk Road, Jaipur, Rajasthan, 302018</p>
                <p className="text-sm mt-2">(+91) 97856 12345</p>
                <a href="mailto:support@swattechmart.in" className="text-[#1ABA1A] mt-2 text-sm underline">
                  support@swattechmart.in
                </a>
              </div>

              <div className="flex gap-3 mt-9 text-black text-base">
                <div className="bg-[#FFFFFF] p-2 rounded-[17.5px]"><FaFacebookF /></div>
                <div className="bg-[#FFFFFF] p-2 rounded-[17.5px]"><FaTwitter /></div>
                <div className="bg-[#FFFFFF] p-2 rounded-[17.5px]"><FaInstagram /></div>
                <div className="bg-[#FFFFFF] p-2 rounded-[17.5px]"><FaYoutube /></div>
                <div className="bg-[#FFFFFF] p-2 rounded-[17.5px]"><FaPinterestP /></div>
              </div>
            </div>
            <div className="rounded overflow-hidden">
              <Image
                src="/contact.png"
                alt="Contact Illustration"
                width={500}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="bg-white rounded-lg shadow p-4 mt-10 w-full">
        <h2 className="text-lg md:text-xl font-bold mb-4">FIND US ON GOOGLE MAP</h2>
        <div className="w-full h-[300px] md:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8018007262936!2d75.7898021752709!3d26.84734327669395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db44cf81315c5%3A0xf36c1e2c68f69c6a!2sGopalpura%20Mode%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1719149900000"
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
