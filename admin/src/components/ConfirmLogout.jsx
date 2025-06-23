import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const ConfirmLogout = ({ item }) => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(AdminContext)
    const { docToken, setDocToken } = useContext(DoctorContext)

    const logout = () => {
        navigate('/')
        if (token) {
            token && setToken('')
            token && localStorage.removeItem('token')
        }
        if (docToken) {
            docToken && setDocToken('')
            docToken && localStorage.removeItem('docToken')
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066]">
            <div className="bg-white rounded-xl p-6 shadow-xl m-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                <p className="mb-6">Are you sure you want to Logout this Account?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => item.setShowConfirm(false)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded hover:bg-primary-dull cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmLogout