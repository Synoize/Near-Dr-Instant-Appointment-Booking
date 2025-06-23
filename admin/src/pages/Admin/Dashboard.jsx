import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {

  const { token, dashData, cancelAppointment, getDashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (token) {
      getDashData();
    }
  }, [token]);

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border '>
          <img src={assets.appointment_icon} alt="" />
          <p className='font-semibold'>Latest Appointments</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.lastestAppointments.length > 0 ? (
            dashData.lastestAppointments.map((item) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={item._id}>
                <img
                  className='rounded-full w-10 h-10 object-cover bg-gray-100'
                  src={item.docData.image}
                  alt={item.docData.name}
                  onError={(e) => e.target.src = assets.default_profile}
                />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                </div>
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
            <div className='text-center text-gray-400 py-6 text-sm'>
              No recent appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard