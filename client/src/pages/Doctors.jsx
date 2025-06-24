import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality])

 const specialties = [
  "General Physician",
  "Allergist", "Anesthesiologist", "Andrologist", "Cardiologist", "Dentist", "Dermatologist",
  "Endocrinologist", "ENT Specialist", "Family Medicine", "Gastroenterologist",
  "General Surgeon", "Geriatrician", "Gynecologist", "Hematologist", "Hepatologist", "Immunologist",
  "Internal Medicine", "Neonatologist", "Nephrologist", "Neurologist", "Neurosurgeon", "Obstetrician",
  "Oncologist", "Ophthalmologist", "Orthopedic Surgeon", "Pathologist", "Pediatrician",
  "Physiotherapist", "Plastic Surgeon", "Psychiatrist", "Pulmonologist", "Radiologist",
  "Rheumatologist", "Sexologist", "Urologist"
]
  return (
    <div>
      <p className='text-gray-600 '>Browse through the doctors specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        <div className={`h-[80vh] overflow-y-scroll  flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden'} sm:flex`}>
          {specialties.map(item => (
            <p
              key={item}
              onClick={() => {navigate(speciality === item ? '/doctors' : `/doctors/${item}`); setShowFilter(false) }}
              className={`w-[90vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-nowrap ${speciality === item ? 'bg-indigo-100 text-black' : ''
                }`}
            >
              {item}
            </p>
          ))}
        </div>
        <div className='w-full grid grid-cols-2 sm:grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
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
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Doctors