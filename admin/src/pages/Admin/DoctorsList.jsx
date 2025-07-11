import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, token, getAllDoctors, changeAvailablity } = useContext(AdminContext)

  useEffect(() => {
    if (token) {
      getAllDoctors()
    }
  }, [token])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5'>
        {
          doctors.map((item, index) => (
            <div
              className='border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-md'
              key={index}
            >
              <img
                className='w-full h-36 object-cover bg-indigo-50 group-hover:bg-primary transition-all duration-500'
                src={item.image}
                alt={item.name}
              />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium truncate'>{item.name}</p>
                <p className='text-zinc-600 text-sm truncate'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-2 text-sm'>
                  <input
                    onChange={() => changeAvailablity(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className='cursor-pointer'
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
