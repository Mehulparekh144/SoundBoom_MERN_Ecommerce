import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import { UserContext } from '../context/userContext'
import { motion } from 'framer-motion'
import { AlertContext, useAlert } from '../context/alertContext'
import axios from 'axios'
import { RiAdminFill } from 'react-icons/ri'
import AccountNav from '../components/AccountNav'
import { AiOutlineLogout } from 'react-icons/ai'
import Alert from '../components/Alert'

const Account = () => {
    const { user, setUser, ready } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const { setAlert, clearAlert } = useAlert(AlertContext)

    async function logoutHandler() {
        await axios.get("/logout")
        setUser(null)
        setAlert("Logged Out Successfully", "success")
        clearAlert()
        setRedirect(true)
    }

    if (!ready) {
        return <Loading />
    }


    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />
    }


// 

    if (redirect) {
        return <Navigate to={"/login"} />
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: "10vw" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "10vw" }}
            transition={{ type: 'spring', bounce: 0.3 }}>
            {
                user.role === 'user' &&
                <div className='md:flex min-h-[75vh]  mt-4 text-primary gap-20 items-baseline'>
                    <div className='w-1/2'>
                        <h1 className='text-4xl '>Hello {user.name} <span className='text-sm font-bold text-secondary'>{user.role}</span></h1>
                        <p className='text-gray-500 ml-1'>{user.email}</p>

                    </div>
                    <button onClick={logoutHandler} className="w-max border-2 uppercase shadow-[2px_2px_#002B5B] border-primary font-bold text-primary flex gap-1  items-center justify-center" ><AiOutlineLogout /> Logout</button>
                </div>
            }
            {
                user.role === 'admin' &&
                <div className='md:flex text-primary gap-20 items-baseline'>
                    <AccountNav />
                    <div className='w-1/2 mt-4'>
                        <h1 className='text-4xl '>Hello {user.name} <span className='text-sm font-bold text-secondary'>{user.role}</span></h1>
                        <p className='text-gray-500 ml-1'>{user.email}</p>

                    </div>
                </div>
            }
            <div className='absolute left-1/2 '>
        <Alert/>        

            </div>
        </motion.div >
    )
}

export default Account
