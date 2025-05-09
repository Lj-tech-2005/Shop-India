'use client'

import { axiosApiInstance, notify } from '@/app/library/helper'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Delete({ id, color }) {
  const router = useRouter()

  const deletehandler = () => {
    let url = ''
    if (color) {
      url = `color/delete/${id}`
    } else {
      url = `category/delete/${id}` 
    }

    axiosApiInstance.delete(url)
      .then((res) => {
        notify(res.data.msg, res.data.flag)
        if (res) {
          router.refresh()
        }
      })
      .catch(() => {
        notify('something went wrong', 0)
      })
  }

  return (
    <button
      onClick={deletehandler}
      className="px-4 py-1 cursor-pointer text-white bg-red-600 rounded-md hover:bg-red-700 transition">
      Delete
    </button>
  )
}

