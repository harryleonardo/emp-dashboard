import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useState, useEffect } from 'react'
import offDay from '../lib/api/offday'
import ModalListCuti from './modalListCuti'
dayjs.extend(weekday);
dayjs.extend(weekOfYear);


export default function FullCalendar() {
  const [currentMonthYear, addMonth] = useState(dayjs())
  const [WEEKDAYS] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
  const [days, updateDays] = useState([])
  const [open, updateOpen] = useState(false)
  const [employees, updateEmployees] = useState([])

  useEffect(async() => {
    try {
      const currentMonthDays = createDaysForCurrentMonth(currentMonthYear.format('YYYY'), currentMonthYear.format('M'))
      const previousMonthDays = createDaysForPreviousMonth(currentMonthYear.format('YYYY'), currentMonthYear.format('M'), currentMonthDays[0].date)
      const nextMonthDays = createDaysForNextMonth(currentMonthYear.format('YYYY'), currentMonthYear.format('M'),currentMonthDays.length)
      const daysNew = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]
      const response = await offDay.history(JSON.parse(localStorage.getItem('user')).company_id, daysNew[0].date, daysNew[daysNew.length-1].date,'APPROVED' )
      for (let index = 0; index < response.data.data.length; index++) {
        for (let indexY = 0; indexY < response.data.data[index].total; indexY++) {
          const indexDays = daysNew.findIndex(x => x.date === dayjs(response.data.data[index].start_date).add(indexY, 'day').format('YYYY-MM-DD'))
          daysNew[indexDays].employees.push({fullname: response.data.data[index].employee.profile.full_name, organization_name: response.data.data[index].employee.organization_name})
        } 
      }
      updateDays(daysNew)
      console.log(daysNew)
    } catch (error) {
      
    }
  }, [])

  function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth()
  }

  function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
        employees: []
      }
    })
  }

  function getWeekday(date) {
    return dayjs(date).weekday()
  }

  function createDaysForPreviousMonth(year, month, currentMonth) {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonth);
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
    // Account for first day of the month on a Sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6
    const previousMonthLastMondayDayOfMonth = dayjs(
      currentMonth
    ).subtract(visibleNumberOfDaysFromPreviousMonth, "day").date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {    
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false,
        employees: []
      };
    });
  }

  function createDaysForNextMonth(year, month, currentMonthDaysLength) {
    const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${currentMonthDaysLength}`)
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday
    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: dayjs(`${year}-${Number(month) + 1}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
        employees: []
      }
    })
  }

  function handleOnClickDate(employees) {
    updateEmployees(employees)
    updateOpen(true)
  }

  return (
    <div className="antialiased sans-serif">
      <div className="mx-auto px-4 py-2">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex items-center justify-between py-2 px-6">
            <div>
              <span className="text-lg font-bold text-gray-800">{currentMonthYear.format('MMMM')}</span>
              <span className="ml-1 text-lg text-gray-600 font-normal">{currentMonthYear.format('YYYY')}</span>
            </div>
            <div className="border rounded-lg px-1 pt-1">
              <button
              type="button"
              className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center mr-1"
              onClick={() => addMonth(currentMonthYear.subtract(1, 'month'))}>
                <svg className="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <div className="border-r inline-flex h-6"></div>
              <button
              type="button"
              className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 ml-1"
              onClick={() => addMonth(currentMonthYear.add(1, 'month'))}>
                <svg className="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="-mx-1 -mb-1">
            <ol className="grid grid-cols-7 px-2 py-2">
              {WEEKDAYS.map(weekday => {
                return <li key={weekday} className="text-center">{weekday}</li>
              })}
            </ol>
            <ol className="grid grid-cols-7  px-2 py-2">
              {days.map(day => {
                return <li key={day.date} className={`text-center px-2 py-2 ${day.isCurrentMonth ? 'text-current' : 'text-gray-400'} ${day.employees && day.employees.length > 0 ? 'cursor-pointer bg-green-500 rounded-full w-full' : ''}`} onClick={()=>handleOnClickDate(day.employees)}>{day.dayOfMonth}
                </li>
              })}
            </ol>
          </div>
        </div>
      </div>
            { open && <ModalListCuti employees={employees} isOpen={open} setClose={()=>updateOpen(false)}/> }
    </div>
  )
}