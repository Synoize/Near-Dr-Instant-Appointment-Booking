import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-primary font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Near Dr. is a smart healthcare platform designed to help users easily find nearby hospitals and doctors, view real-time availability, and book appointments quickly and hassle-free.</p>
          <p>The app is built with the goal of reducing stress for patients and their families by minimizing the traditional effort of visiting hospitals or calling for appointment confirmations.</p>
          <p>Patients can search for doctors or hospitals based on their location and specialization, view detailed profiles including experience and ratings, and book appointments according to available slots.</p>
          <b className='text-gray-800'>Our vision</b>
          <p>Our vision is to revolutionize healthcare accessibility by building a digital bridge between patients and healthcare providers, ensuring quick, transparent, and stress-free access to medical services. We aim to empower individuals with the ability to find trusted doctors nearby, manage appointments with ease, and receive timely care — all through a modern, user-friendly platform.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-primary font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Find Nearby Doctors Instantly</b>
          <p>Our smart search system helps you discover verified doctors and hospitals around you based on your needs — no more calling or guessing.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Real-Time Availability</b>
          <p>We display live doctor availability so you can book appointments at your convenience without waiting or rechecking.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Hassle-Free Booking</b>
          <p>Book appointments in just a few taps. No long forms, no queues, no confusion — just a seamless experience.</p>
        </div>

      </div>
    </div>
  )
}

export default About