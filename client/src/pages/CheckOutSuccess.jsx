import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { AlertContext, useAlert } from '../context/alertContext'
import { UserContext } from '../context/userContext'
import { clear } from '../store/cartSlice'


const CheckOutSuccess = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { user, ready } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    const { setAlert, clearAlert } = useAlert(AlertContext)
    const controller = 0

    const urlParams = new URLSearchParams(window.location.search)

    useEffect(() => {
        if (urlParams.has('payment_status') && urlParams.get('payment_status') === 'success') {
            axios.post("/cart/add" , cart).then(()=>{
                dispatch(clear())        
                setAlert("Order placed successfully !" , "success")
                clearAlert("")
                setRedirect("/orders")
            })
        }
        else {
            setRedirect("/")
        }
    }, []);



    if (!ready) {
        return <Loading />
    }


    if (ready && !user && !redirect) {
        setAlert("Please Login First", "info")
        clearAlert()
        return <Navigate to={"/login"} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            Success
        </div>
    )
}

export default CheckOutSuccess
