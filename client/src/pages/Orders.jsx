import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'
import ProductItem from '../components/ProductItem'
import { AlertContext, useAlert } from '../context/alertContext'
import { UserContext } from '../context/userContext'

const Orders = () => {
    const { user, ready } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const { setAlert, clearAlert } = useAlert(AlertContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/cart").then((response) => {
            setOrders(response.data)
            setLoading(false)
        })

    }, [])



    function convertDateString(dateString) {
        const dateObj = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: '2-digit' };
        const convertedDate = dateObj.toLocaleDateString('en-US', options);
        return convertedDate;
    }


    if (!ready) {
        return <Loading />
    }


    if (ready && !user && !redirect) {
        setAlert("Please Login First", "info")
        clearAlert()
        return <Navigate to={"/login"} />
    }

    return (
        <div>
            <h1 className='text-3xl font-semibold text-primary my-3'>Your Orders</h1>
            {loading ? <Loading /> :
                <div className='flex gap-2 flex-wrap'>

                    {orders.length > 0 && orders.map((item, key) => (
                        <div className='bg-gray-200 p-4 w-full rounded-xl'>
                            <h1 className='text-l md:text-2xl my-3 font-bold text-primary'>{convertDateString(item.time)}</h1>
                            <h1 className='bg-secondary text-white px-4 py-2 rounded-xl w-max'>₹{item.price}</h1>
                            <div key={key} className=" justify-center items-center flex md:flex-row flex-col gap-4 ">
                                {
                                    item.cart && item.cart.map((cartItem, key) => (
                                        <OrderItem product={cartItem} key={key} />
                                    ))
                                }
                            </div>
                        </div>

                    ))}
                </div>
            }


        </div>
    )
}

export default Orders
