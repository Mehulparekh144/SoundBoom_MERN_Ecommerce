import React, { useContext, useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import { motion } from 'framer-motion'
import { FiUsers } from 'react-icons/fi'
import { UserContext } from '../context/userContext'
import Loading from '../components/Loading'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { RiAdminFill } from 'react-icons/ri'
import { AiFillDelete } from 'react-icons/ai'
import { AlertContext, useAlert } from '../context/alertContext'
import Alert from '../components/Alert'

const Users = () => {
    const [userData, setUserData] = useState([])
    const { user, ready } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const { setAlert, clearAlert } = useAlert(AlertContext)
    const [loading , setLoading] = useState(true)


    useEffect(() => {
        axios.get("/users").then((response) => {
            setUserData(response.data)
            setLoading(false)
        })

    }, [userData])


    const deleteUserHandler = async(id) => {
        try {
            await axios.delete(`/removeuser/${id}`)
            setAlert(`User id - ${id} deleted` , "success")
            clearAlert()
        } catch (error) {
            setAlert("Server Error" , "danger")
            
        }


    }


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
                    <h1 className='text-2xl font-semibold bg-secondary text-white py-2 px-4 rounded-lg mb-5 flex gap-1 md:mt-0 mt-5 items-center'><FiUsers />Users</h1>
                    {loading?<Loading/>:
                    <div className="md:overflow-visible overflow-x-auto">
                    <table className="table-auto w-full text-center ">
                        <thead>
                            <tr className='text-xl  '>
                                <th>Id</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((item, index) => (
                                <tr key={index} className={item.role === 'admin' ? `bg-primary text-white` : ''}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td className={item.role === 'admin' ? `flex gap-2 items-center justify-center` : ""}>{item.role === 'admin' ? <RiAdminFill /> : ""}{item.role}</td>
                                    <td>
                                        {
                                            item.role !== 'admin' &&
                                            <button onClick={() => deleteUserHandler(item._id)} className='text-primary'><AiFillDelete />
                                            </button>
                                        }
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                    
                    </div>
                    }
                    <div className='absolute my-auto mt-16'>
                    <Alert />

                    </div>

                </motion.div>

            </div>
        </div >
    )
}

export default Users
