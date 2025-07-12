import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo1} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Bun venit la Wekineto, partenerul tău de încredere pentru servicii profesionale de fizioterapie. Suntem dedicați să îți îmbunătățim mobilitatea, să reducem durerea și să îți creștem calitatea vieții prin planuri de tratament personalizate și îngrijire expertă oferită de terapeuții noștri experimentați.</p>
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
          <p className='text-xl font-medium mb-5'>IA LEGĂTURA CU NOI</p>
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
