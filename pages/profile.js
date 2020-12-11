import LayoutDashboard from '../components/layouts/dashboard'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import userAPI from '../lib/api/user'
import offDayAPI from '../lib/api/offday'
import dayjs from 'dayjs'

function Profile() {
  const router = useRouter()
  useEffect(() => componentDidMout(), []);
  const [menu, updateMenu] = useState('profile')
  const [profile, updateProfile] = useState({})
  const [loading, updateLoading] = useState(true)
  const [cuti, updateListCuti] = useState([])

  async function componentDidMout() {
		if (!localStorage.getItem('user')) {
			router.push('/login')
    }
    try {
      updateLoading(true)
      const response = await userAPI.userDetail(JSON.parse(localStorage.getItem('user')).employee_id)
      const responseCuti = await offDayAPI.history('','','','',JSON.parse(localStorage.getItem('user')).employee_id)
      updateProfile(response.data.data)
      updateListCuti(responseCuti.data.data)
      updateLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCancel(item, status) {
    try {
      const response = await offDayAPI.actionApproval(item,JSON.parse(localStorage.getItem('user')).employee_id,status)
      if (response) router.reload(window.location.pathname)
    } catch (error) {
      console.error(error)
    }
  }


	return (
		<LayoutDashboard>
      <div className="container mx-auto p-2 md:p-4">
        <div style={{borderBottom: '2px solid #eaeaea'}}>
          <div className="block md:flex">
            <ul className='flex cursor-pointer'>
              <li className={`py-2 px-6 bg-white rounded-t-lg${menu === 'profile' ? '' : ' text-gray-500 bg-gray-200'}`} onClick={(e)=>updateMenu('profile')}>Profile</li>
              <li className={`py-2 px-6 bg-white rounded-t-lg${menu === 'cuti' ? '': ' text-gray-500 bg-gray-200'}`} onClick={(e)=>updateMenu('cuti')}>Cuti</li>
            </ul>
          </div>
        </div>
        {menu === 'profile' && !loading && <div>
          { <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Branch</div>
                    <div className="text-sm text-gray-500">{profile.branch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Organization</div>
                    <div className="text-sm text-gray-500">{profile.organization_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Position</div>
                    <div className="text-sm text-gray-500">{profile.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Level</div>
                    <div className="text-sm text-gray-500">{profile.level}</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Full name</div>
                    <div className="text-sm text-gray-500">{profile.profile.full_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">DOB</div>
                    <div className="text-sm text-gray-500">{profile.profile.date_of_birth}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Email</div>
                    <div className="text-sm text-gray-500">{profile.profile.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Status</div>
                    <div className="text-sm text-gray-500">{profile.status}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          }
          </div>}
        {menu === 'cuti' && !loading &&
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Start
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave End
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cuti && cuti.map(x=> 
                <tr key={x.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {dayjs(x.start_date).format('DD MMMM YYYY')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {dayjs(x.end_date).format('DD MMMM YYYY')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {x.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {x.status}
                  </td>
                  {x.status === 'REQUESTED' && <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div>
                      <button className="text-indigo-600 hover:text-indigo-900" onClick={()=>handleCancel(x.id, 'REJECTED')}>Cancel</button>
                    </div>
                  </td>}
                </tr>)}
            </tbody>
          </table>
        }

          {loading && <div>Loading</div>}
      </div>
		</LayoutDashboard>
	)
}

export default Profile