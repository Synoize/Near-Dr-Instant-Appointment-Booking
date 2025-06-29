import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom';

const SearchDoctors = () => {
    const { keyword, setKeyword, handleSearchDoctors } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="flex w-full mb-2 p-1 border rounded-full focus-within:border-gray-700">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search your problem or doctor speciality"
                className="w-full p-2 rounded-full outline-none"
            />
            <button
                onClick={() => { handleSearchDoctors(); navigate('/search'); scrollTo(0, 0) }}
                className="bg-primary text-white px-3 py-2 rounded-full hover:bg-blue-800 active:bg-blue-800 transition-colors"
                aria-label="Search doctors"
            >
                <img src={assets.search_icon} alt="" className='w-6 h-6' />
            </button>
        </div>
    )
}

export default SearchDoctors