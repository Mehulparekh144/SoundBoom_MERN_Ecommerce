import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { add } from '../store/cartSlice'


const ProductItem = ({ product }) => {
    const { name, image, desc, price } = product
    const [favourite, setFavourite] = useState(false)
    const dispatch = useDispatch()


    const addToCartHandler = (product) => {
        dispatch(add(product))


    }

    return (

        <div className='bg-primary bg-opacity-10 w-full md:w-1/4 my-4 rounded-lg border-2 border-opacity-10 border-primary hover:shadow-[5px_5px_#002B5B] hover:scale-105 hover:border-2 hover:border-opacity-100 transition-all  ease-linear'>
            <div className='relative   border-2 border-primary border-opacity-5'>
                <div className='flex justify-center'>
                    <img src={image} alt="" className='w-60 h-60 ' />

                </div>
                <button onClick={() => setFavourite(!favourite)} className='absolute top-0 z-10 right-0 p-2 text-secondary bg-gray-100 rounded-full m-2 shadow-md'>
                    {favourite ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
                </button>
            </div>
            <div className='py-6 px-4'>
                <div className="flex justify-between gap-3 mb-2">
                    <h1 className='text-xl font-semibold '>{name}</h1>
                    <p className='font-bold text-primary'>₹{price}/-</p>
                </div>
                <p className='text-sm text-gray-800'>{desc.slice(0, 50)}...</p>
                <div className='flex gap-3'>

                    <button className='bg-secondary w-full  py-2 px-4 rounded-full text-white mt-3  hover:scale-105 transition-all ease-linear' onClick={() => addToCartHandler(product)}>Add to Cart</button>
                </div>


            </div>



        </div>
    )
}

export default ProductItem
