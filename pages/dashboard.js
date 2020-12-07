import LayoutDashboard from '../components/layouts/dashboard'
import FullCalendar from '../components/fullCalendar'
import OffDaysLeft from '../components/offDaysLeft'
import WhoOff from '../components/whoOff'
import ModalRequestOff from '../components/modalRequestOff'
import { useState } from 'react'

export default function Dashboard() {
	const [isModalRequestOff, setModalRequest] = useState(false)

	return (
		<LayoutDashboard>
			<div className="container mx-auto p-2 md:p-4">
				<div className="block md:flex">
					<div className="w-full md:w-3/4">
						<FullCalendar />
						<div className="flex justify-end px-4 py-2">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setModalRequest(true)}>
								Request Cuti
							</button>
							{ isModalRequestOff && <ModalRequestOff isOpen={isModalRequestOff} setClose={()=>setModalRequest(false)} /> }
						</div>
					</div>
					<div className="w-full md:w-1/4">
						<OffDaysLeft />
						<WhoOff />
					</div>
				</div>
			</div>
		</LayoutDashboard>
	)
}