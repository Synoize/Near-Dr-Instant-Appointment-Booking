import { createContext, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const localStorageToken = localStorage.getItem('docToken')

    const [docToken, setDocToken] = useState(localStorageToken ? localStorageToken : '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false)

    // get appointments
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
                headers: { docToken }
            });

            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    // complete appointment
    const completeAppointment = async (appointmentId) => {
        toast.loading("Updating...")
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, { headers: { docToken } })

            toast.dismiss();
            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDashData();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.dismiss();
            console.error(error);
            toast.error(error.message);
        }
    }

    // cancel appointment
    const cancelAppointment = async (appointmentId) => {
        toast.loading("Updating...")
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, { headers: { docToken } })

            toast.dismiss();
            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDashData();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.dismiss();
            console.error(error);
            toast.error(error.message);
        }
    }

    // get Dashboard Data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { docToken } });

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    // get profile data
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, { headers: { docToken } });

            if (data.success) {
                setProfileData(data.profileData)
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    // Change Doctor Availablity
    const changeAvailablity = async () => {
        toast.loading('Availablity Updating...')
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/change-availablity`, {}, { headers: { docToken } })

            toast.dismiss()
            if (data.success) {
                getDashData()
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.dismiss()
            toast.error(error.message)
        }

    }

    const value = {
        backendUrl,
        docToken, setDocToken,
        appointments, setAppointments, getAppointments,
        completeAppointment, cancelAppointment,
        dashData, setDashData, getDashData,
        profileData, setProfileData, getProfileData,
        changeAvailablity,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider