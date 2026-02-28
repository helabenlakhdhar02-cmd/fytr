import React, { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Loading from '../components/Loading'

// Lazy load components
const ChoosePath = lazy(() => import('../components/ChoosePath'))
const HowItWorks = lazy(() => import('../components/HowItWorks'))
const StatsSection = lazy(() => import('../components/Stats'))
const TopFreelancers = lazy(() => import('../components/TopFreelancers'))
const Offer = lazy(() => import('../components/Offer'))
const TopCourses = lazy(() => import('../components/TopCourses'))
const UserReviews = lazy(() => import('../components/UserReviews'))

const page = () => {
  return (
    <div className='bg-gray-100 dark:bg-gray-900'>
      <Navbar/>
      <Hero/>

      <Suspense fallback={<Loading />}>
        <ChoosePath/>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <HowItWorks/>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <TopFreelancers/>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Offer/>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <TopCourses/>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <UserReviews/>
      </Suspense>
    </div>
  )
}

export default page