import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom';

const SearchDoctors = () => {
    const { keyword, setKeyword, handleSearchDoctors } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="flex w-full mb-2 border rounded-full focus-within:border-gray-700">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search your problem or doctor speciality"
                className="w-full px-5 py-3 rounded-full outline-none"
            />
            <button
                onClick={() => { handleSearchDoctors(); navigate('/search'); scrollTo(0, 0) }}
                className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 active:bg-primary/90 transition-colors"
                aria-label="Search doctors"
            >
                Search
            </button>
        </div>
    )
}

export default SearchDoctors