import LayoutDashboard from '../components/layouts/dashboard'
import FullCalendar from '../components/calendar'

export default function Dashboard() {
	return (
		<LayoutDashboard>
			<div className="container mx-auto p-2 md:p-4">
				<div className="block md:flex">
					<div className="w-full md:w-3/4">
						<FullCalendar />
					</div>
					<div className="w-full md:w-1/4">
						Hello
					</div>
				</div>
			</div>
		</LayoutDashboard>
	)
}