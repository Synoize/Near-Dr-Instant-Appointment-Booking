import React, { useContext } from 'react'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import DoctorsList from './pages/Admin/DoctorsList'
import AddDoctor from './pages/Admin/AddDoctor'
import AllAppointments from './pages/Admin/AllAppointments'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const { token } = useContext(AdminContext)
  const { docToken } = useContext(DoctorContext)

  return token || docToken ? (
    <div className='bg-slate-50'>
      <Toaster />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path={''} element={<></>} />
          <Route path={'/admin-dashboard'} element={<Dashboard />} />
          <Route path={'/all-appointments'} element={<AllAppointments />} />
          <Route path={'/add-doctor'} element={<AddDoctor />} />
          <Route path={'/doctor-list'} element={<DoctorsList />} />

          {/* Doctor Route */}
          <Route path={'/doctor-dashboard'} element={<DoctorDashboard/>} />
          <Route path={'/doctor-appointments'} element={<DoctorAppointments/>} />
          <Route path={'/doctor-profile'} element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <Toaster />
    </div>
  )
}

export default App