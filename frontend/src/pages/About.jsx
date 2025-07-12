import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>DESPRE <span className='text-gray-700 font-semibold'>NOI</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[500px] mx-auto' src={assets.about_us} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Bun venit la WeKineto, partenerul tău de încredere în gestionarea nevoilor tale de sănătate într-un mod convenabil și eficient.
           La WeKineto, înțelegem provocările cu care te confrunți atunci când vine vorba de programări la medic.</p>
          <p>WeKineto se angajează să ofere excelență în tehnologia sănătății.
             Ne străduim constant să îmbunătățim platforma noastră, integrând cele mai recente inovații pentru a optimiza experiența utilizatorilor și a oferi servicii de înaltă calitate. Indiferent dacă îți programezi prima consultație sau îți gestionezi tratamentul continuu, WeKineto este alături de tine în fiecare pas al drumului tău spre sănătate.</p>
          <b className='text-gray-800'>Viziunea Noastră</b>
          <p>Ne propunem să construim punți între pacienți și profesioniștii din sănătate, simplificând accesul la serviciile medicale de care ai nevoie, oricând și oriunde.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p><span className='text-gray-700 font-semibold'>DE CE SĂ NE ALEGI PE NOI?</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFICIENȚĂ:</b>
          <p>Programări medicale simplificate, adaptate stilului tău de viață</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENȚĂ:</b>
          <p>Acces instant la o rețea de profesioniști în sănătate verificați</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZARE:</b>
          <p>Planuri personalizate de îngrijire și recomandări inteligente, adaptate profilului tău de sănătate și călătoriei tale spre recuperare.</p>
        </div>
      </div>

    </div>
  )
}

export default About
