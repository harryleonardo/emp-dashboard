import { useState, useEffect } from "react"
import offDay from '../lib/api/offday'

export default function offDaysLeft() {
  const [offLeft, updateOffLeft] = useState(0)


  useEffect(async () => {
    try {
      const response = await offDay.offLeft(JSON.parse(localStorage.getItem('user')).employee_id)
      updateOffLeft(response.data.data.quota_left)
    } catch (error) {
      console.error(error)
    }
  }, []);

  return (
    <div className="flex items-center text-gray-800">
      <div className="py-2 px-4 w-full">
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <div className="flex flex-row bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl">
              <img src="/calendar.svg" />
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <div className="text-sm text-gray-500">Sisa Cuti</div>
              <div className="font-bold text-lg">{offLeft}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}