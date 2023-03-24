import React, { useState } from 'react'
import { Link } from 'react-router-dom'




const OrderItem = ({ product}) => {
    const { name, image, desc, price ,quantity } = product
  

    return (

        <div className='text-primary bg-primary md:flex bg-opacity-10 w-full md:w-1/2  my-4 rounded-lg border-2'>
            <div className='border-2 border-primary border-opacity-5'>
                <img src={image} alt="" className='w-full object-cover border-2 h-60 ' />
            </div>
            <div className='py-6 px-4 flex-1'>
                <div className="flex justify-between gap-3 mb-2">
                    <h1 className='text-xl font-semibold '>{name}</h1>
                    <p className='font-bold text-primary'>₹{price}/-</p>
                </div>
                <p className='text-sm text-gray-800'>{desc.slice(0, 50)}...</p>
                <p className='text-sm text-secondary my-3 font-bold'>Quantity : {quantity}</p>


            </div>



        </div>
    )
}

export default OrderItem
