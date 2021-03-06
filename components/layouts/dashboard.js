import Link from 'next/link'
import { Transition } from '@headlessui/react'
import {useState, useEffect} from 'react'

export default function LayoutDashboard({children}) {
	const [isOpen, setIsOpen] = useState(false)
	const [menus, updateMenu] = useState([
		{ target: '/dashboard', text: 'Dashboard'},
		{ target: '/employee', text: 'Employee'},
		{ target: '/profile', text: 'Profile'},
	])

	useEffect(() => {
		const role = JSON.parse(localStorage.getItem('user')).role 
		if (role === 'ADMIN' || role === 'HR' || role === 'MANAGER') {
			console.log(role, 'role')
			const newArr = [...menus]; // copying the old datas array
			newArr.push({ target: '/company', text: 'Company'})
			newArr.push({ target: '/login', text: 'Logout'})
			updateMenu(newArr)
		} else {
			const newArr = [...menus]; // copying the old datas array
			newArr.push({ target: '/login', text: 'Logout'})
			updateMenu(newArr)
		} 
	}, []);


  return (
		<div>
			<div className="relative bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
						<div className="flex justify-start lg:w-0 lg:flex-1">
							<Link href="/dashboard">
								<a>
									<span className="sr-only">Workflow</span>
									<img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
								</a>
							</Link>
						</div>
						<div className="-mr-2 -my-2 md:hidden">
							<button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() => setIsOpen(true)}>
								<span className="sr-only">Open menu</span>
								<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
									</svg>
							</button>
						</div>
						<nav className="hidden md:flex space-x-10">
							{ menus.map(menu => {
								return <Link href={menu.target} key={menu.target}>
									<a className="text-base font-medium text-gray-500 hover:text-gray-900">{menu.text}</a>
								</Link>
							})}
						</nav>
					</div>
				</div>
				{/* Mobile Menu */}
				<Transition show={isOpen} enter="duration-200 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
					<div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
						<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
							<div className="pt-5 pb-6 px-5">
								<div className="flex items-center justify-between">
									<div>
										<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
									</div>
									<div className="-mr-2">
										<button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() => setIsOpen(false)}>
											<span className="sr-only">Close menu</span>
											<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>
							</div>
							<div className="py-6 px-5 space-y-6">
								<div className="grid grid-cols-2 gap-y-4 gap-x-8">
									{ menus.map(menu => {
										return <Link href={menu.target} key={menu.target}>
											<a className="text-base font-medium text-gray-900 hover:text-gray-700">{menu.text}</a>
										</Link>
									})}
								</div>
							</div>
						</div>
					</div>
				</Transition>
			</div>
			{children}
		</div>
  )
}