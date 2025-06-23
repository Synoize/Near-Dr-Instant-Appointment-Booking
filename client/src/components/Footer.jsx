import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
                {/* Left Section */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Near Dr. bridges the gap between patients and healthcare professionals by providing a seamless, digital healthcare booking platform. It's scalable, secure, and user-friendly - aiming to make healthcare more accessible and stress-free.</p>

                </div>

                {/* Center Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>

                </div>

                {/* Right Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-9864722944</li>
                        <li>info@neardr.in</li>
                        <li>Location: Saharsa, Bihar, 852106</li>
                    </ul>
                </div>
            </div>

            {/* Copyright Text */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center '> Copyright {new Date().getFullYear()} © NearDr. All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer