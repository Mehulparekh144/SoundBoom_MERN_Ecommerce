import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

const Layout = () => {
  return (
    <div className='px-12 md:px-32'>
      <Navbar/>
      <Outlet/>
      
    </div>
  )
}

export default Layout
