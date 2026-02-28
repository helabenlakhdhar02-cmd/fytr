import ChoosePath from '../../components/ChoosePath'
import Hero from '../../components/Hero'
import HowItWorks from '../../components/HowItWorks'
import Navbar from '../../components/Navbar'
import StatsSection from '../../components/Stats'
import TopFreelancers from '../../components/TopFreelancers'
import Offer from '../../components/Offer'
import TopCourses from '../../components/TopCourses'
import UserReviews from '../../components/UserReviews'
import React from 'react'

const page = () => {
  return (
    <div className='bg-gray-100'>
      <Navbar/>
      <Hero/>
      <ChoosePath/>
      <HowItWorks/>
      <TopFreelancers/>
      <Offer/>
      <TopCourses/>
      <UserReviews/>
    </div>
  )
}

export default page