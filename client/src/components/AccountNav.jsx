import axios from 'axios'
import React, { useContext, useState } from 'react'
import { MdOutlineAddShoppingCart, MdOutlineArrowBackIosNew } from 'react-icons/md'
import { RiAdminFill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import { AlertContext } from '../context/alertContext'
import { UserContext } from '../context/userContext'
import { CgNotes } from 'react-icons/cg'
import { FiUsers } from 'react-icons/fi'
import { AiOutlineLogout } from 'react-icons/ai'
import {FaProductHunt} from 'react-icons/fa'

const AccountNav = () => {
    const { user, setUser, ready } = useContext(UserContext)
    const { setAlert, clearAlert } = useContext(AlertContext)
    const [redirect, setRedirect] = useState(false)

    const location = useLocation()
    const subpage = location.pathname.split("/").slice(-1)[0]

    const activeLinkHandler = (type) => {
        if (type === subpage) {
            return "bg-opacity-100 text-white"
        }
    }

    async function logoutHandler() {
        await axios.get("/logout")
        setUser(null)
        setAlert("Logged Out Successfully", "success")
        clearAlert()
        setRedirect(true)
    }
    return (
        <>
            {
                subpage !== 'account' &&
                <Link to={"/account"} className="absolute top-8 z-50 left-5 bg-primary text-white p-2 rounded-full"><MdOutlineArrowBackIosNew/></Link>
            }
        <div className='text-primary border-primary border-2 shadow-[5px_5px_#002B5B] p-6 rounded-xl  md:w-max md:h-[70vh]'>
            <h1 className='text-3xl font-bold flex gap-1 items-center border-b-2 pb-4'>Admin Controls<RiAdminFill /></h1>

            <div className='flex flex-col gap-2 my-3 md:w-full mt-4'>
                <Link to="/account/addproduct" className={' bg-secondary bg-opacity-10 px-4 py-2 rounded-2xl flex gap-1 items-center ' + activeLinkHandler('addproduct')}><MdOutlineAddShoppingCart />Add Product</Link>
                <Link to="/account/orders" className={' bg-secondary bg-opacity-10 px-4 py-2 rounded-2xl flex gap-1 items-center ' + activeLinkHandler('orders')}><CgNotes />Orders Booked</Link>
                <Link to="/account/users" className={' bg-secondary bg-opacity-10 px-4 py-2 rounded-2xl flex gap-1 items-center ' + activeLinkHandler('users')}><FiUsers />Users</Link>
                <Link to="/account/products" className={' bg-secondary bg-opacity-10 px-4 py-2 rounded-2xl flex gap-1 items-center ' + activeLinkHandler('products')}><FaProductHunt />Products</Link>

            </div>
            <button onClick={logoutHandler} className="w-full border-2 uppercase shadow-[2px_2px_#002B5B] border-primary font-bold text-primary flex gap-1  items-center justify-center md:mt-32" ><AiOutlineLogout/> Logout</button>
            <div>

            </div>


        </div>
        </>
    )
}

export default AccountNav
