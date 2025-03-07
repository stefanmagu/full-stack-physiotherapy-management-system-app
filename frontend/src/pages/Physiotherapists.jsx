import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Physiotherapists = () => {
  const navigate = useNavigate();
  const { physiotherapists } = useContext(AppContext)
  return (
    <div>
      <p className='text-gray-700 text-center text-3xl '>Browse through the physiotherapists.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {physiotherapists && physiotherapists.length > 0 ? physiotherapists.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-[#EAEFFF]' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              </div>
            </div>
          )) : (
            <p className="col-span-full text-center">No physiotherapists available...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Physiotherapists