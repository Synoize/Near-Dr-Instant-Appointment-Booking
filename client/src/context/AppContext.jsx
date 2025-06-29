import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const localStorageToken = localStorage.getItem('token')
    const [token, setToken] = useState(localStorageToken ? localStorageToken : false)

    const [userData, setUserData] = useState(false)
    const [doctors, setDoctors] = useState([])

    const [keyword, setKeyword] = useState('');
    const [searchDoctors, setSearchDoctors] = useState([]);

    const handleSearchDoctors = async () => {
        if (!keyword.trim()) {
            toast.error('Please enter a search keyword.');
            return;
        }

        localStorage.setItem('searchKeyword', keyword);

        try {
            const { data } = await axios.get(`${backendUrl}/api/user/search-doctor`, {
                params: { keyword }
            });

            if (data.success) {
                setSearchDoctors(data.doctors);
                setKeyword('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Get Doctors Data
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`)

            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            getUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        currencySymbol, backendUrl,
        doctors, setDoctors, getDoctorsData,
        token, setToken,
        userData, setUserData, getUserProfileData,
        keyword, setKeyword, searchDoctors, setSearchDoctors, handleSearchDoctors,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
