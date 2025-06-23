import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const localStorageToken = localStorage.getItem('token')

    const [token, setToken] = useState(localStorageToken ? localStorageToken : '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    // Get All Doctors
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, { headers: { token } })

            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Change Doctor Availablity
    const changeAvailablity = async (docId) => {
        toast.loading('Availablity Updating...')
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availablity`, { docId }, { headers: { token } })

            toast.dismiss()
            if (data.success) {
                getAllDoctors()
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.dismiss()
            toast.error(error.message)
        }

    }

    // Get All Appointments
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { headers: { token } })

            if (data.success) {
                setAppointments(data.appointments)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Cancel Appointment By Admin
    const cancelAppointment = async (appointmentId) => {
        toast.loading('Cancelling...')
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: { token } })

            toast.dismiss();
            if (data.success) {
                toast.success(data.message)
                getAllAppointments();
                getDashData();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.dismiss();
            toast.error(error.message)
        }
    }

    // Get Dashboard Data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { token } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        token, setToken, backendUrl,
        doctors, getAllDoctors, changeAvailablity,
        appointments, setAppointments, getAllAppointments,
        cancelAppointment,
        dashData, setDashData, getDashData,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider