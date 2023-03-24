import React, { useContext, useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import { motion } from 'framer-motion'
import { FaProductHunt } from 'react-icons/fa'
import Loading from '../components/Loading'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { AlertContext, useAlert } from '../context/alertContext'
import axios from 'axios'
import ProductItem from '../components/ProductItem'
import AdminProductItem from '../components/AdminProductItem'
import Alert from '../components/Alert'
import UpdateModal from '../components/UpdateModal'

const AdminProducts = () => {
    const [productData, setProductData] = useState([])
    const { user, ready } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const { setAlert, clearAlert } = useAlert(AlertContext)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get("/products").then((response) => {
            setProductData(response.data)
            setLoading(false)
        })
    }, [productData])

    


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
        <div className={`overflow-y-hidden `}>
            <div className="md:flex text-primary gap-20 items-baseline">
                <div className='absolute top-1/4 md:bottom-5 md:right-1/2 z-[100]'>
                    <Alert />
                </div>
                <AccountNav />
                <motion.div
                    initial={{ opacity: 0, x: "10vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "10vw" }}
                    transition={{ type: 'spring', bounce: 0.3 }}
                    className='md:w-1/2'>
                    <h1 className='text-2xl font-semibold bg-secondary text-white py-2 px-4 rounded-lg mb-5 flex gap-1 md:mt-0 mt-5 items-center'><FaProductHunt />Products</h1>
                    {productData && productData.map((product, key) => (
                        <div key={key} className="flex flex-wrap gap-3 justify-start">
                            <AdminProductItem product={product}  />
                        </div>
                    ))}
                </motion.div>

            </div>
        </div >

    )
}

export default AdminProducts
