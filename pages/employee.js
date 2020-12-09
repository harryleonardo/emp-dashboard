import LayoutDashboard from '../components/layouts/dashboard'
import EmpList from '../components/empList'
import ModalAddEmployee from '../components/modalAddEmployee'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function Dashboard() {
	const [isModalOff, setModal] = useState(false)
	const router = useRouter()
	const [role, updateRole] = useState('')


	useEffect(() => checkLocalStorage(), []);
	
	function checkLocalStorage() {
		if (!localStorage.getItem('user')) {
			router.push('/login')
		}
		if (typeof window !== "undefined") {
			const role = JSON.parse(localStorage.getItem('user')).role
			updateRole(role)
		}
	}

	console.log(role)
	return (
		<LayoutDashboard>
			<div className="container mx-auto p-2 md:p-4">
				<div className="block md:flex">
					<div className="w-full">
						<EmpList />
						{ (role === 'ADMIN' || role === 'HR' || role === 'MANAGER') && (
						<div className="flex justify-end px-4 py-2">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setModal(true)}>
								Add Employee
							</button>
							{ isModalOff && <ModalAddEmployee isOpen={isModalOff} setClose={()=>setModal(false)} /> }
						</div>
						)}
					</div>
				</div>
			</div>
		</LayoutDashboard>
	)
}

export default Dashboard