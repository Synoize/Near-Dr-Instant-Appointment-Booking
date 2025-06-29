import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import SearchDoctors from '../components/SearchDoctors';

const SearchDoctorList = () => {
  const { searchDoctors } = useContext(AppContext);
  const navigate = useNavigate();

  const searchKeyword = localStorage.getItem('searchKeyword');;

  return (
    <div>
      <p>Searched Doctors "{searchKeyword}"</p>
      <div className='flex flex-col items-start gap-5 mt-5'>
        <div className="mb-2 w-full sm:w-96">
          <SearchDoctors />
        </div>

        {searchDoctors.length > 0 ? (
          <div className='w-full grid grid-cols-2 sm:grid-cols-auto gap-4 gap-y-6 h-[80vh] overflow-y-scroll items-start'>
            {searchDoctors.map((item, index) => (
              <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50 ' src={item.image} alt="" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-primary-green' : 'text-gray-500'}`}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-primary-green' : 'bg-gray-500'} rounded-full`}></p>
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className='text-gray-900 text-sm sm:text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-xs sm:text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (<p className='m-auto text-red-500'>Doctors not found</p>)}

      </div>
    </div>
  )
}

export default SearchDoctorList