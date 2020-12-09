import { useEffect, useState } from "react"
import userAPI from '../lib/api/user'

export default function empList() {
  const [persons, updatePerson ] = useState([])
  useEffect(async () => {
    try {
      const company_id = JSON.parse(localStorage.getItem('user')).company_id
      const response = await userAPI.listUser(company_id)
      updatePerson(response.data.data)
    } catch (error) {
      console.error(error)
    }
  },[]);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-gray-200">
        <dl>
          {persons && persons.map((person,idx) => 
          <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${idx % 2 ? 'bg-gray-50': 'bg-white'}`} key={idx}>
            <dt className="text-sm font-medium text-gray-500">
              <div>{person.position}</div>
              <div>{person.profile.full_name}</div>
            </dt>
          </div>)}
          {!persons.length && <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50"></div>}
        </dl>
      </div>
    </div>
  )
}