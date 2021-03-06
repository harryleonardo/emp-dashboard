import { useEffect, useState } from "react"
import dayjs from 'dayjs'
import offDay from '../lib/api/offday'

export default function whoOff() {
  const [persons, updatePerson] = useState([])

  useEffect(async () => {
    try {
      const response = await offDay.whoOff(dayjs().format('YYYY-MM-DD'))
      updatePerson(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }, []);

  return (
    <div className="flex items-center text-gray-800">
      <div className="p-4 w-full">
        <div className="flex flex-row bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">Who Off</div>
            { persons && persons.map(person => <div className="font-bold text-lg" key={person.id}>{person.employee.profile.full_name}</div>)}
            {!persons.length && <div className="font-bold text-lg">-</div>}
          </div>
        </div>
      </div>
    </div>
  )
}