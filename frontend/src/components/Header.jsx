import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    const scrollToPhysiotherapists = () => {
        const physiotherapistsSection = document.getElementById('top-physiotherapists');
        if (physiotherapistsSection) {
            physiotherapistsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden'>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] relative z-10'>
                <div className='absolute -left-20 -top-20 w-64 h-64 bg-primary-light/20 rounded-full blur-3xl'></div>
                <h1 className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Restore <span className='text-blue-200'>Movement.</span><br />
                    Regain <span className='text-blue-200'>Freedom.</span>
                </h1>
                <p className='text-white/90 text-lg max-w-md'>
                    Professional physiotherapy services to help you recover, strengthen, and thrive.
                </p>
                <div className='flex items-center gap-6 mt-2'>
                    <button 
                        className='bg-white text-primary font-medium px-6 py-3 rounded-full hover:bg-blue-50 transition-all'
                        onClick={scrollToPhysiotherapists}
                    >
                        Book Now
                    </button>

                </div>
                <div className='flex flex-wrap gap-4 mt-2'>
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className='text-white text-sm'>Certified Specialists</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className='text-white text-sm'>Personalized Care</span>
                    </div>
                </div>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative md:min-h-[400px] lg:min-h-[500px] flex items-end'>
                <div className='absolute -right-20 -bottom-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl'></div>
                <div className='relative w-full h-full'>
                    <img 
                        className='w-full h-auto rounded-lg object-cover md:h-full md:object-contain md:object-bottom' 
                        src={assets.header}
                        alt="Physiotherapist helping patient" 
                    />
                    {/* <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md max-w-[200px] hidden md:block'>
                        <div className='flex items-center gap-2 mb-2'>
                            <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </div>
                            <span className='text-primary font-medium text-sm'>Expert Physiotherapists</span>
                        </div>
                        <p className='text-xs text-gray-600'>Our team specializes in rehabilitation, sports injuries, and chronic pain management</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Header