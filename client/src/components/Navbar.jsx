import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import ConfirmLogout from './ConfirmLogout';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const { token, userData } = useContext(AppContext)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={() => { navigate('/'); scrollTo(0, 0) }} src={assets.logo} alt="Near Dr." className='w-44 cursor-pointer' />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to={'/'}>
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden rounded-full' />
                </NavLink>
                <NavLink to={'/doctors'}>
                    <li className='py-1'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden rounded-full' />
                </NavLink>
                <NavLink to={'/about'}>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden rounded-full' />
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden rounded-full' />
                </NavLink>
            </ul>

            <div className="flex items-center gap-4">
                {token && userData
                    ? (
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full shadow-sm' src={userData.image} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-1 right-0 pt-14 text-base font-medium text-gray-600 x-20 hidden group-hover:block'>
                                <div className='border-t-4 border-primary min-w-48 bg-slate-50 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={() => { setShowConfirm(true) }} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                            {
                                showConfirm && <ConfirmLogout item={{ setShowConfirm }} />
                            }
                        </div>
                    )
                    : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
                }

                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* Mobile Menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-sm font-medium'>
                        <NavLink onClick={() => { setShowMenu(false); scrollTo(0, 0) }} to={'/'}><p className='px-8 py-2 rounded-full inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => { setShowMenu(false); scrollTo(0, 0) }} to={'/doctors'}><p className='px-8 py-2 rounded-full inline-block'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => { setShowMenu(false); scrollTo(0, 0) }} to={'/about'}><p className='px-8 py-2 rounded-full inline-block'>ABOUT</p></NavLink>
                        <NavLink onClick={() => { setShowMenu(false); scrollTo(0, 0) }} to={'/contact'}><p className='px-8 py-2 rounded-full inline-block'>CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar