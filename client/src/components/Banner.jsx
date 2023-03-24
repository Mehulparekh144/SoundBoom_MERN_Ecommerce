import React, { useEffect, useState } from 'react'
import banner from '../assets/images/banner.png'

const Banner = () => {


    return (
        <div className='bg-secondary h-52 flex justify-around py-12 px-6 bg-opacity-10 rounded-xl overflow-hidden'>
            <div>
                <h1 className='text-2xl md:text-5xl mb-4 font-semibold text-primary'>Grab Upto 50% Off on Headphone</h1>
                <button className='bg-primary text-white rounded-full py-2 px-4'>Buy Now</button>
            </div>
       
                
            <div className='h-52 pb-12 '>
                <img src={banner} alt="" className='object-cover md:h-full md:w-full w-0 h-0 scale-150' />
            </div>

        </div>
    )
}

export default Banner
