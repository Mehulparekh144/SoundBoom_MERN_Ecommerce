import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { UserContext } from '../context/userContext'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Alert from '../components/Alert'
import PayButton from '../components/PayButton'
import { AlertContext, useAlert } from '../context/alertContext'


const Payment = () => {
    const { user, ready } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const {setAlert , clearAlert} = useAlert(AlertContext)
    let finalPayment = 0

    cart && cart.map(item => {
        finalPayment += (item.price * item.quantity)
    })



    if (!ready) {
        return <Loading />
    }


    if (ready && !user && !redirect) {
        setAlert("Please Login First", "info")
        clearAlert()
        return <Navigate to={"/login"} />
    }




    return (



        <div className=''>
            <Alert/>
            <div className='w-full'>
            <h1 className='text-3xl font-semibold text-primary'>Items</h1>

            {
                cart.length > 0 && cart.map((item, index) => (

                    <div key={index} className='w-full py-4 px-4  justify-between flex flex-col md:flex-row bg-gray-100 my-3 rounded-xl'>
                        <div className='flex'>
                            <img src={item.image} className="w-36 h-36 object-contain rounded-xl" alt="" />
                            <div className="flex flex-col gap-3 mb-2 px-3">
                                <h1 className='text-xl font-semibold '>{item.name}</h1>
                                <p></p>
                                <p className='font-bold text-primary'>Quantity : {item.quantity}</p>
                            </div>
                        </div>
                        <div className='my-3 text-center text-md md:text-2xl p-4 font-bold bg-secondary h-max rounded-2xl text-white' >
                            ₹{item.quantity * item.price}
                        </div>

                    </div>)

                )}

            <hr className='mt-4' />
            {
                cart.length === 0 &&
                <p className='text-xl my-4 text-primary'>Shop for products <Link className='text-secondary font-bold underline' to={"/"}>Here</Link> </p>
            }
            {
                finalPayment > 0 &&
                <div className='text-2xl flex flex-col justify-center  md:float-right font-bold text-primary  my-3'>
                    <p className='text-center md:text-left text-sm text-gray-500'>Shipping Charges will be added at checkout</p>
                    <h1 className='text-center md:text-left'>Total : ₹{finalPayment}</h1>
                    <PayButton cartItems = {cart} />


                </div>
            }
            </div>
        </div>

    )
}

export default Payment
