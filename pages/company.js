import LayoutDashboard from '../components/layouts/dashboard'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import offDay from '../lib/api/offday'
import dayjs from 'dayjs'

function Dashboard() {
  const router = useRouter()
  const [people, updatePeople] = useState([])

	useEffect(() => componentDidMout(), []);
	
	async function componentDidMout() {
		if (!localStorage.getItem('user')) {
			router.push('/login')
    }
    try {
      const response = await offDay.history(JSON.parse(localStorage.getItem('user')).company_id)
      updatePeople(response.data.data);
    } catch (error) {
      console.error(error)
    }
  }
  
  async function handleApprove(item, status) {
    try {
      const response = await offDay.actionApproval(item,JSON.parse(localStorage.getItem('user')).employee_id,status)
      if (response) router.reload(window.location.pathname)
    } catch (error) {
      console.error(error)
    }
  }

	return (
		<LayoutDashboard>
			<div className="container mx-auto p-2 md:p-4">
				<div className="block md:flex">
					<div className="w-full">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reason
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {people && people.map(person => 
                      <tr key={person.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {person.employee.profile.full_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {person.employee.profile.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{person.employee.organization_name}</div>
                          <div className="text-sm text-gray-500">{person.employee.position}</div>
                          <div className="text-sm text-gray-300">{person.employee.level}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold">
                            {person.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.notes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {`${dayjs(person.start_date).format('DD-MM-YYYY')} - ${dayjs(person.end_date).format('DD-MM-YYYY')}`}
                        </td>
                        
                        { person.status === 'REQUESTED' &&
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div>
                            <button className="text-indigo-600 hover:text-indigo-900" onClick={()=>handleApprove(person.id, 'APPROVED')}>Approve</button>
                          </div>
                          <div>
                            <button className="text-indigo-600 hover:text-indigo-900" onClick={()=>handleApprove(person.id, 'REJECTED')}>Reject</button>
                          </div>
                        </td>
                        } 
                      </tr>)}
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
					</div>
				</div>
			</div>
		</LayoutDashboard>
	)
}

export default Dashboard