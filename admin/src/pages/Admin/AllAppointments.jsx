import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { token, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { currency, calculateAge, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (token) {
      getAllAppointments()
    }
  }, [token])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments?.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            >
              <p className='max-sm:hidden'>{index + 1}.</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt={item.userData.name} />
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)} {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full object-cover bg-gray-200' src={item.docData.image} alt={item.docData.name} />
                <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                    : <img
                      className='w-10 h-10 cursor-pointer'
                      src={assets.cancel_icon}
                      alt="Cancel"
                      onClick={() => cancelAppointment(item._id)}
                    />
              }
            </div>
          ))
        ) : (
          <div className='text-center text-gray-400 py-8'>No appointments found.</div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments
