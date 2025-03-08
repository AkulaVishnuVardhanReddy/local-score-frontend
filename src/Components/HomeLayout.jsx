import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeHeader from './HomeHeader'
import bgImage from "../assets/bg-registration-form-2.jpg";
import HomeFooter from './HomeFooter';

const HomeLayout = () => {
  return (
    <div className='bg-cover' style={{ backgroundImage: `url(${bgImage})` }}>
        <HomeHeader/>
        <Outlet/>
        <HomeFooter/>
    </div>
  )
}

export default HomeLayout
