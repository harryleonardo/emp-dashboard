import { Transition } from '@headlessui/react'
import dayjs from 'dayjs'
import Router from 'next/router'
import {useState} from 'react'
import userAPI from '../lib/api/user'

export default function modalRequestOff({isOpen, setClose}) {
  const [fullName, updateFullName] = useState('')
  const [email, updateEmail] = useState('')
  const [idNumber, updateIdNumber] = useState('')
  const [address, updateAddress] = useState('')
  const [dob, updateDob] = useState('')
  const [phone, updatePhone] = useState('')
  const [gender, updateGender] = useState('M')
  const [marital, updateMarital] = useState('BELUM KAWIN')
  const [religion, updateReligion] = useState('ISLAM')
  const [organization, updateOrganization] = useState('')
  const [organizationOther, updateOrgOther] = useState('')
  const [businessPosition] = useState([{value: '', label: ''},{value: 'BUSINESS DEVELOPMENT', label: 'BUSINESS DEVELOPMENT'},{value: 'PARTNERSHIP MANAGER', label: 'PARTNERSHIP MANAGER'}])
  const [techPosition] = useState([{value: '', label: ''},{value: 'SOFTWARE ENGINEER', label: 'SOFTWARE ENGINEER'},{value: 'QUALITY ASSURANCE', label: 'QUALITY ASSURANCE'}])
  const [financePosition] = useState([{value: '', label: ''},{value: 'FINANCE ANALYST', label: 'FINANCE ANALYST'},{value: 'REVENUE ANALYST', label: 'REVENUE ANALYST'}])
  const [peoplePosition] = useState([{value: '', label: ''},{value: 'HR', label: 'HR'},{value: 'PEOPLE CULTURE', label: 'PEOPLE CULTURE'}])
  const [positionList, updatePositionList] = useState([{value: '', label: ''}])
  const [position, updatePosition] = useState('')
  const [levels] = useState([{value: '', label: ''},
  {value: 'ASSOCIATE', label: 'ASSOCIATE'},
  {value: 'MID', label: 'MID'},
  {value: 'SENIOR', label: 'SENIOR'},
  {value: 'LEAD/MANAGER', label: 'LEAD/MANAGER'},
  {value: 'VP', label: 'VP'},
  {value: 'SENIOR VP', label: 'SENIOR VP'},
  {value: 'OTHERS', label: 'OTHERS'}
  ])
  const [levelSelected, updateLevel] = useState('')
  const [levelOther, updateLevelOther] = useState('')
  const [statuses] = useState([{value: '', label: ''}, {value: 'FULL TIME', label: 'FULL TIME'}, {value: 'KONTRAK', label: 'KONTRAK'}])
  const [statusSelected, updateStatusSelected] = useState('')
  const [branches] = useState([{value: '', label: ''}, {value: 'HQ', label: 'HQ'}, {value: 'KC SURABAYA', label: 'KC SURABAYA'}])
  const [branchSelected, updateBranchSelected] = useState('')
  const [joinDate, updateJoinDate] = useState('')

  function handleOrganization(e) {
    switch (e.target.value) {
      case 'BUSINESS':
        updatePositionList(businessPosition)
      break;
      case 'TECHONOLOGY':
        updatePositionList(techPosition)
        break;
      case 'FINANCE':
        updatePositionList(financePosition)
        break;
      case 'PEOPLE':
        updatePositionList(peoplePosition)
      default:
        break;
    }
    updatePosition('')
    updateOrgOther('')
    updateOrganization(e.target.value)
  }

  function handleLevel(e) {
    updateLevel(e.target.value)
    updateLevelOther('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await userAPI.createUser(JSON.parse(localStorage.getItem('user')).company_id,fullName,email,idNumber,address,dayjs(dob).format('DD/MM/YYYY'),phone,gender,marital,religion,organizationOther ? organizationOther : organization,position,levelOther ? levelOther : levelSelected,statusSelected,branchSelected,dayjs(joinDate).format('DD/MM/YYYY'))
      if (response) Router.reload(window.location.pathname);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition show={isOpen} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Full name
                  </label>
                  <div className="inline-block relative w-full">
                    <input type="text" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={fullName} onChange={(e) =>updateFullName(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <div className="inline-block relative w-full">
                    <input type="email" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={email} onChange={(e) =>updateEmail(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Identity Number
                  </label>
                  <div className="inline-block relative w-full">
                    <input type="text" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={idNumber} onChange={(e) =>updateIdNumber(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address
                  </label>
                  <div className="inline-block relative w-full">
                    <textarea className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={address} onChange={(e) =>updateAddress(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Birth
                  </label>
                  <div className="inline-block relative w-full">
                    <input type="date" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={dob} onChange={(e) =>updateDob(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <div className="inline-block relative w-full">
                    <input type="text" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={phone} onChange={(e) =>updatePhone(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gender
                  </label>
                  <div className="inline-block relative w-full">
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={(e) =>updateGender(e.target.value)} value={gender}>
                      {[{value: 'M', label: 'Male'}, {value: 'F', label: 'Female'}].map(x => <option value={x.value} key={x.value}>{x.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Maritial Status
                  </label>
                  <div className="inline-block relative w-full">
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={(e) =>updateMarital(e.target.value)} value={marital}>
                      {[{value: 'BELUM KAWIN', label: 'BELUM KAWIN'}, {value: 'SUDAH KAWIN', label: 'SUDAH KAWIN'}].map(x => <option value={x.value} key={x.value}>{x.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Religion
                  </label>
                  <div className="inline-block relative w-full">
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={(e) =>updateReligion(e.target.value)} value={religion}>
                      {[{value: 'ISLAM', label: 'ISLAM'}, {value: 'KATOLIK', label: 'KATOLIK'}, {value: 'KRISTEN', label: 'KRISTEN'}, {value: 'HINDU', label: 'HINDU'}, {value: 'BUDHA', label: 'BUDHA'}, {value: 'KONG HU CU', label: 'KONG HU CU'}].map(x => <option value={x.value} key={x.value}>{x.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Organization
                  </label>
                  <div className="inline-block relative w-full">
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={handleOrganization} value={organization}>
                      {[{value: '', label: ''},{value: 'BUSINESS', label: 'BUSINESS'}, {value: 'TECHONOLOGY', label: 'TECHONOLOGY'}, {value: 'FINANCE', label: 'FINANCE'}, {value: 'PEOPLE', label: 'PEOPLE'},{value: 'OTHERS', label: 'OTHERS'}].map(x => <option value={x.value} key={x.value}>{x.label}</option>)}
                    </select>
                    {organization === 'OTHERS' && <div className="mt-2 inline-block relative w-full">
                      <input type="text" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={organizationOther} onChange={(e) =>updateOrgOther(e.target.value)}/>
                    </div>}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Position
                  </label>
                  { organization !== 'OTHERS' && <div className="inline-block relative w-full">
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={(e) =>updatePosition(e.target.value)} value={position}>
                      {positionList.map(x => <option value={x.value} key={x.value}>{x.label}</option>)}
                    </select>
                  </div> }
                  { organization === 'OTHERS' && <div className="mt-2 inline-block relative w-full">
                      <input type="text" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={position} onChange={(e) =>updatePosition(e.target.value)}/>
                  </div>} 
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Level
                  </label>
                  <div className="inline-block relative w-full">
                    <select className="block apperance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value={levelSelected} onChange={handleLevel}>
                      {levels.map(level=> <option key={level.value} value={level.value}>{level.label}</option>)}
                    </select>
                  </div>
                  { levelSelected === 'OTHERS' && <div className="mt-2 inline-block relative w-full">
                      <input type="text" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={levelOther} onChange={(e) =>updateLevelOther(e.target.value)}/>
                  </div>} 
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                  <select className="block apperance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focuse:shadow-outline" value={statusSelected} onChange={(e) => updateStatusSelected(e.target.value)}>
                    {statuses.map(x=> <option key={x.value} value={x.value}>{x.label}</option>)}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                  <select className="block apperance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focuse:shadow-outline" value={branchSelected} onChange={(e) => updateBranchSelected(e.target.value)}>
                    {branches.map(branch=> <option key={branch.value} value={branch.value}>{branch.label}</option>)}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Join Date
                  </label>
                  <div className="inline-block relative w-full">
                    <input type="date" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={joinDate} onChange={(e) =>updateJoinDate(e.target.value)}/>
                  </div>
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-between">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={setClose}>
                Cancel
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}