import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import SearchDoctors from '../components/SearchDoctors'

const Home = () => {
  return (
    <div>
      <div className="sm:p-4 pb-2 max-w-md mx-auto">
        <SearchDoctors />
      </div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home