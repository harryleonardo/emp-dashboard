import LayoutDashboard from '../components/layouts/dashboard'
import EmpList from '../components/empList'
import ModalRequestOff from '../components/modalRequestOff'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function Dashboard() {
	const [isModalRequestOff, setModalRequest] = useState(false)
	const router = useRouter()

	useEffect(() => checkLocalStorage(), []);
	
	function checkLocalStorage() {
		if (!localStorage.getItem('user')) {
			router.push('/login')
		}
	}
	
	return (
		<LayoutDashboard>
			<div className="container mx-auto p-2 md:p-4">
				<div className="block md:flex">
					<div className="w-full">
						<EmpList />
						<div className="flex justify-end px-4 py-2">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setModalRequest(true)}>
								Add Employee
							</button>
							{ isModalRequestOff && <ModalRequestOff isOpen={isModalRequestOff} setClose={()=>setModalRequest(false)} /> }
						</div>
					</div>
				</div>
			</div>
		</LayoutDashboard>
	)
}

export default Dashboard