import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { PhysiotherapistContext } from '../../context/PhysiotherapistContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const PhysiotherapistDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(PhysiotherapistContext)
  const { slotDateFormat, currency } = useContext(AppContext)


  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])

  // Prepare chart data
  const prepareAppointmentStatusChart = () => {
    if (!dashData || !dashData.appointmentStatus) return null;
    
    // Get status counts from the backend data
    const { completed, cancelled, pending } = dashData.appointmentStatus;
    
    // Make sure we have non-zero values to display
    const data = [
      Math.max(completed, 0), 
      Math.max(cancelled, 0), 
      Math.max(pending, 0)
    ];
    
    // Only return chart data if we have at least one non-zero value
    if (data.every(value => value === 0)) {
      // If all values are zero, create a placeholder for "No Data"
      return {
        labels: ['No Data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['rgba(200, 200, 200, 0.6)'],
            borderColor: ['rgba(200, 200, 200, 1)'],
            borderWidth: 1,
          },
        ],
      };
    }
    
    return {
      labels: ['Completed', 'Cancelled', 'Pending'],
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const prepareMonthlyTrendChart = () => {
    if (!dashData || !dashData.last6MonthsData) return null;
    
    return {
      labels: dashData.last6MonthsData.map(item => item.month),
      datasets: [
        {
          label: 'Appointments',
          data: dashData.last6MonthsData.map(item => item.count),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.earnings} {currency}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p></div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.currentMonthAppointments}</p>
            <p className='text-gray-400'>This Month</p></div>
        </div>
        {/* <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.futureAppointments}</p>
            <p className='text-gray-400'>Upcoming</p>
          </div>
        </div> */}
      </div>

      {/* Charts Section */}
      <div className='flex flex-wrap gap-5 mt-8'>
        {/* Appointment Status Chart */}
        <div className='bg-white p-4 rounded-lg shadow-md flex-1 min-w-[300px]'>
          <h2 className='text-lg font-semibold mb-4 text-gray-700'>Appointments Status</h2>
          <div className='h-64'>
            {prepareAppointmentStatusChart() && (
              <Pie 
                data={prepareAppointmentStatusChart()} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                          size: 12
                        }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  },
                }}
              />
            )}
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className='bg-white p-4 rounded-lg shadow-md flex-1 min-w-[300px]'>
          <h2 className='text-lg font-semibold mb-4 text-gray-700'>Last 6 Months Trend</h2>
          <div className='h-64'>
            {prepareMonthlyTrendChart() && (
              <Bar 
                data={prepareMonthlyTrendChart()} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: 'Appointment Trend',
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className='bg-white mt-8'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default PhysiotherapistDashboard 