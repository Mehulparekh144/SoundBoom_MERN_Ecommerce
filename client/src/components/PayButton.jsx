import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { UserContext } from '../context/userContext'
import { clear } from '../store/cartSlice'

const PayButton = ({ cartItems }) => {
    const dispatch = useDispatch()
    const user = useContext(UserContext)
    const handleCheckout = () => {
        axios.post('/create-checkout-session', {
            cartItems,
            userName: user.name,
            userId: user._id
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err))
    }


    return (
        <button className='my-3 border-primary border-2 shadow-[2px_2px_#002B5B] mt-4' onClick={() => handleCheckout()}>
            Checkout
        </button>
    )
}

export default PayButton
