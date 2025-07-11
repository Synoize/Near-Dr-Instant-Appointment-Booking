import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import MyAppointments from './pages/MyAppointments'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import Login from './pages/Login'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SearchDoctorList from './pages/SearchDoctorList'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
       <Toaster />
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/doctors'} element={<Doctors />} />
        <Route path={'/doctors/:speciality'} element={<Doctors />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/contact'} element={<Contact />} />
        <Route path={'/search'} element={<SearchDoctorList />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/my-profile'} element={<MyProfile />} />
        <Route path={'/my-appointments'} element={<MyAppointments />} />
        <Route path={'/appointment/:docId'} element={<Appointment />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App