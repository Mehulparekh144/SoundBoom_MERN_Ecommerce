import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { add, decreaseQuantity, clear, remove } from '../store/cartSlice.jsx'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import { Navigate } from 'react-router-dom'




const Cart = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const user = useContext(UserContext)
    const cartItems = useSelector((state) => state.cart)
    const [redirect, setRedirect] = useState(false)
    let finalPayment = 0


    useEffect(() => {
        setRedirect(false)
    })


    cartItems.map(item => {
        finalPayment += (item.price * item.quantity)
    })

    const removeFromCartHandler = (itemId) => {
        dispatch(remove(itemId))

    }

    const increaseQuantityHandler = (item) => {
        dispatch(add(item))
    }

    const decreaseQuantityHandler = (item) => {
        dispatch(decreaseQuantity(item))
    }

    const addCartHandler = async (cart) => {
        try {
            setRedirect(true)
            setIsOpen(false)
        } catch (error) {
            console.log(error);

        }
    }

    if (redirect) {
        return <Navigate to={"/payment"} />
    }



    const variants = {
        open: {
            opacity: 1,
            y: 0,
            display: 'block'
        },
        closed: {
            opacity: 0,
            y: -10,
            transitionEnd: {
                display: 'none',
            },
        }
    }
    return (
        <motion.div
            initial="closed"
            animate={isOpen ? 'open' : "closed"}
            variants={variants}
            className={`absolute mt-12 md:mx-0 right-0 left-0  md:left-auto mx-auto md:right-32 rounded-xl h-64 bg-primary shadow-2xl z-50 backdrop-filter backdrop-blur-sm w-[98vw] md:w-1/4 ease-linear duration-300 transition-height p-4 overflow-y-scroll`} >
            {
                cartItems.length === 0 && <h1 className='text-white'>Please add items to cart</h1>
            }
            {cartItems.length > 0 && cartItems.map((item, index) => (
                <div className='bg-white w-full p-2 rounded-lg bg-opacity-10 flex gap-2 my-2 text-white ' key={index}>
                    <img src={item.image} width="150px" />
                    <div>
                        <h1 className='font-bold'>{item.name}</h1>
                        <p className='text-sm mt-2'>₹{item.price}</p>
                        <div className='flex gap-2 my-3 items-center'>
                            <button className='p-0 bg-transparent' onClick={() => increaseQuantityHandler(item)}><AiOutlinePlusCircle /></button>
                            <p className='font-bold'>{item.quantity}</p>
                            <button className='p-0 bg-transparent' onClick={() => decreaseQuantityHandler(item)}><AiOutlineMinusCircle /></button>
                        </div>
                        <button onClick={() => removeFromCartHandler(item._id)} className='scale-75 -ml-3 flex items-center justify-between gap-2'><RiDeleteBin7Fill /> Remove </button>
                    </div>
                </div>
            ))}
            {
                (cartItems.length > 0) && (
                    user.user ?
                        <button className=' w-full' onClick={() => addCartHandler(cartItems)}>Pay ₹{finalPayment}</button>
                        :
                        <button disabled className='w-full'>Login to proceed</button>
                )
            }

        </motion.div>
    )
}

export default Cart
