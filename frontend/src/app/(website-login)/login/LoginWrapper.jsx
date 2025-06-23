'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { axiosApiInstance, notify } from '@/app/library/helper';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/userSlice';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lsCart = JSON.parse(localStorage.getItem('cart'));
      setCart(lsCart ? lsCart.items : null);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await axiosApiInstance.post('user/login', data);
      notify(res.data.msg, res.data.flag);

      if (res.data.flag === 1) {
        dispatch(setUser({ data: res.data.user, token: res.data.token }));

        const updatedCart = await axiosApiInstance.post('cart/move-to-db', {
          user_id: res.data?.user?._id,
          cart: cart || null,
        });

        let final_total = 0;
        let original_total = 0;

        const dbCart = updatedCart.data?.cart?.map((cd) => {
          final_total += cd.product_id?.finalPrice * cd.qty;
          original_total += cd.product_id?.originalPrice * cd.qty;
          return {
            productId: cd.product_id._id,
            qty: cd.qty,
          };
        });

        localStorage.setItem(
          'cart',
          JSON.stringify({ items: dbCart, final_total, original_total })
        );

        if (params.get('ref') === 'checkout') {
          router.push('/checkout');
        } else {
          router.push('/');
        }
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-teal-600">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded" />
        <span className="text-red-500 text-sm">{error}</span>
        <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded">
          LOGIN
        </button>
      </form>
    </>
  );
}

function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState();

  const registerSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await axiosApiInstance.post('user/register', data);
      notify(res.data.msg, res.data.flag);
      if (res.data.flag === 1) {
        dispatch(setUser({ data: res.data.user, token: res.data.token }));
        router.push('/');
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-teal-600">Register</h2>
      <form onSubmit={registerSubmit} className="space-y-4 mt-4">
        <input name="name" type="text" placeholder="Name" required className="w-full px-4 py-2 border rounded" />
        <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded" />
        <span className="text-red-500 text-sm">{error}</span>
        <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded">
          REGISTER
        </button>
      </form>
    </>
  );
}

export default function LoginWrapper() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-center mb-8 gap-4">
        <button className={`px-6 py-2 font-semibold ${isLogin ? 'bg-teal-600 text-white' : 'bg-gray-300'}`} onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className={`px-6 py-2 font-semibold ${!isLogin ? 'bg-teal-600 text-white' : 'bg-gray-300'}`} onClick={() => setIsLogin(false)}>
          Register
        </button>
      </div>
      <div className="bg-white p-8 shadow rounded-xl">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
