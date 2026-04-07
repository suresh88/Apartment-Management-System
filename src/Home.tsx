import React from 'react'
import Hero from './components/Hero'
import SearchFilter from './components/SearchFilter'
import ApartmentList from './components/ApartmentList'
import Info from './components/Info'
import Footer from './components/Footer'

function Home() {
  return (
    <div>
        <Hero/>
        <SearchFilter/>
        <ApartmentList/>
        <Info/>
        <Footer/>
      
    </div>
  )
}

export default Home
