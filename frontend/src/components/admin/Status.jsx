'use client'

import { axiosApiInstance,notify } from '@/app/library/helper'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Status({ Status, statusUrl }) {
    const token = typeof window !== 'undefined' ? localStorage.getItem("admin_token") : null;
    const router = useRouter()

    const statushandler = () => {
        if (!token) {
            notify("Session expired. Please log in again.", 0)
            return
        }

        axiosApiInstance.patch(statusUrl, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            notify(response.data.msg, response.data.flag)
            if (response.data.flag === 1) {
                router.refresh()
            }
        }).catch(err => {
            console.log("Status Update Error:", err.response?.data || err.message || err)

            if (err?.response?.status === 401) {
                notify("Unauthorized access. Please log in again.", 0)
            } else {
                notify(err?.response?.data?.msg || "Something went wrong", 0)
            }
        })
    }

    return (
        <span
            onClick={statushandler}
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full cursor-pointer 
                ${Status
                    ? "bg-green-100 text-green-800 dark:bg-green-600 dark:text-white"
                    : "bg-red-100 text-red-800 dark:bg-red-600 dark:text-white"
                }`}>
            {Status ? "Active" : "Inactive"}
        </span>
    )
}
