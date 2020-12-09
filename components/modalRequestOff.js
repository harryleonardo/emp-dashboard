import { Transition } from '@headlessui/react'
import dayjs from 'dayjs'
import Router from 'next/router'
import {useState} from 'react'
import offDay from '../lib/api/offday'

export default function modalRequestOff({isOpen, setClose}) {
  const [typeOff, updateTypeOFf] = useState('Cuti Tahunan')
  const [startOff, updateStartOff] = useState('')
  const [endOff, updateEndOff] = useState('')
  const [notes, updateNotes] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const date1 = dayjs(startOff)
      const date2 = dayjs(endOff)       
      const response = await offDay.submit(JSON.parse(localStorage.getItem('user')).employee_id, typeOff,date1.format('YYYY-MM-DDTHH:mm:ss[Z]'),date2.format('YYYY-MM-DDTHH:mm:ss[Z]'),date2.diff(date1, 'day', false),notes)
      if (response) {
        Router.reload(window.location.pathname);
      }
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
                    Type
                  </label>
                  <div className="inline-block relative w-full">
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={(e) =>updateTypeOFf(e.target.value)} value={typeOff}>
                      <option value="Cuti Tahunan">Cuti Tahunan</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Start Date
                  </label>
                  <div className="inline-block relative w-full">
                    <input type="date" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={startOff} onChange={(e) =>updateStartOff(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    End Date
                  </label>
                  <div className="inline-block relative w-full">
                    <input type="date" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={endOff} onChange={(e) =>updateEndOff(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Notes
                  </label>
                  <div className="inline-block relative w-full">
                    <textarea className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={notes} onChange={(e) =>updateNotes(e.target.value)}/>
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