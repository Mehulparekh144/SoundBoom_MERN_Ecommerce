import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CgNotes } from 'react-icons/cg'
import AccountNav from '../components/AccountNav'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import { AlertContext, useAlert } from '../context/alertContext'
import { UserContext } from '../context/userContext'
import { motion } from 'framer-motion'

const AdminOrders = () => {
    const [userData, setUserData] = useState([])
    const { user, ready } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const { setAlert, clearAlert } = useAlert(AlertContext)
    const [loading, setLoading] = useState(true)


    function convertDateString(dateString) {
        const dateObj = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: '2-digit' };
        const convertedDate = dateObj.toLocaleDateString('en-US', options);
        return convertedDate;
    }

    useEffect(() => {
        axios.get("/users").then((response) => {
            setUserData(response.data)
            setLoading(false)
        })
    }, [userData])


    if (!ready) {
        return <Loading />
    }


    if (ready && !user && !redirect) {
        setAlert("Please Login First", "info")
        clearAlert()
        return <Navigate to={"/login"} />
    }

    if (ready && user.role !== 'admin') {
        setAlert("Access Denied", "danger")
        clearAlert()
        return <Navigate to={"/account"} />
    }

    return (
        <div>
            <div className='md:flex text-primary gap-20 items-baseline'>
                <AccountNav />
                <motion.div
                    initial={{ opacity: 0, x: "10vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "10vw" }}
                    transition={{ type: 'spring', bounce: 0.3 }}
                    className='md:w-1/2'>

                    <h1 className='text-2xl font-semibold bg-secondary text-white py-2 px-4 rounded-lg mb-5 flex gap-1 md:mt-0 mt-5 items-center'><CgNotes />Orders</h1>
                    {loading?<Loading/>:
                    <div className='md:overflow-visible overflow-x-auto'>
                    <table className=" md:table-auto  md:w-full text-center ">
                        <thead>
                            <tr className='text-xl  '>
                                <th>User</th>
                                <th>Email</th>
                                <th>Orders</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData && userData.map((item, index) => (
                                <tr key={index} className={item.role === 'admin' ? `bg-primary text-white` : 'text-primary'}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <div className=' flex flex-col gap-2 p-4'>

                                            {item.cart && item.cart.map((cartItem, key) => (
                                                <div key={key} className="px-4 py-1 bg-gray-200 bg-opacity-10  rounded-xl text-sm flex items-center justify-between">
                                                    ₹{cartItem.price} - {item.cart.length} Products - {convertDateString(cartItem.time)}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    </div>
                    }    
                </motion.div>

            </div>
        </div>
    )
}

export default AdminOrders
