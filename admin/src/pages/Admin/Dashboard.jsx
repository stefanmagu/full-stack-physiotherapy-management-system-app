import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  // Prepare chart data
  const prepareAppointmentStatusChart = () => {
    if (!dashData || !dashData.latestAppointments) return null;
    
    // Calculate appointment status counts from latestAppointments
    const completed = dashData.latestAppointments.filter(item => item.isCompleted).length;
    const cancelled = dashData.latestAppointments.filter(item => item.cancelled).length;
    const pending = dashData.latestAppointments.filter(item => !item.isCompleted && !item.cancelled).length;
    
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
      labels: ['Finalizate', 'Anulate', 'În așteptare'],
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

  const preparePhysiotherapistAppointmentsChart = () => {
    if (!dashData || !dashData.latestAppointments) return null;
    
    // Group appointments by physiotherapist
    const physiotherapistCounts = {};
    dashData.latestAppointments.forEach(appointment => {
      const name = appointment.physiotherapistData.name;
      if (!physiotherapistCounts[name]) {
        physiotherapistCounts[name] = 0;
      }
      physiotherapistCounts[name]++;
    });
    
    // Get top 5 physiotherapists by appointment count
    const sortedPhysiotherapists = Object.entries(physiotherapistCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    return {
      labels: sortedPhysiotherapists.map(item => item[0]),
      datasets: [
        {
          label: 'Appointments',
          data: sortedPhysiotherapists.map(item => item[1]),
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
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.physiotherapists}</p>
            <p className='text-gray-400'>Fizioterapeuți</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Programări</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Pacienți</p></div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='flex flex-wrap gap-5 mt-8'>
        {/* Appointment Status Chart */}
        <div className='bg-white p-4 rounded-lg shadow-md flex-1 min-w-[300px]'>
          <h2 className='text-lg font-semibold mb-4 text-gray-700'>Stare programări</h2>
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

        {/* Physiotherapist Appointments Chart */}
        <div className='bg-white p-4 rounded-lg shadow-md flex-1 min-w-[300px]'>
          <h2 className='text-lg font-semibold mb-4 text-gray-700'>Top Fizioterapeuți</h2>
          <div className='h-64'>
            {preparePhysiotherapistAppointmentsChart() && (
              <Bar 
                data={preparePhysiotherapistAppointmentsChart()} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: 'Distribuția programărilor pe fizioterapeuți',
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
          <p className='font-semibold'>Ultimele programări</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.physiotherapistData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.physiotherapistData.name}</p>
                <p className='text-gray-600 '>Programat pe {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Anulată</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Finalizată</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard