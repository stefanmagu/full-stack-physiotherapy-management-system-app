import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo1} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Welcome to Wekineto, your trusted partner for professional physiotherapy services. We're dedicated to improving your mobility, reducing pain, and enhancing your quality of life through personalized treatment plans and expert care from our experienced therapists.</p>
        </div>

        {/* <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>All Physiotherapists</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div> */}

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+40 722 333 444</li>
            <li>wekineto@mail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ WeKineto.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
