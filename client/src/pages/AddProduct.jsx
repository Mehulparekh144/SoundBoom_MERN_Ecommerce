import axios from 'axios'
import React, { useContext, useState } from 'react'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { Navigate } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import { AlertContext, useAlert } from '../context/alertContext'
import { UserContext } from '../context/userContext'
import { motion } from 'framer-motion'


const AddProduct = () => {
    const { user, ready } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState(0)
    const [type, setType] = useState("wired")

    const { setAlert, clearAlert } = useAlert(AlertContext)


    const addProductHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/products", { name, desc, image, price, type })
            setAlert("Product Added Successfully", "success")
            setName("")
            setDesc("")
            setImage("")
            setPrice(0)
            setType("")
            clearAlert()
        } catch (error) {
            setAlert("Server Down", "danger")

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
                    <h1 className='text-2xl font-semibold bg-secondary text-white py-2 px-4 rounded-lg mb-5 flex gap-1 md:mt-0 mt-5 items-center'><MdOutlineAddShoppingCart />Add Product</h1>
                    <form onSubmit={addProductHandler} action="" className='flex flex-col gap-2'>
                        <input type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} className='w-full' required />
                        <textarea placeholder='Enter description' value={desc} onChange={(e) => setDesc(e.target.value)} className='w-full' required />
                        <input type="text" placeholder='Enter Image Link  .jpg/.jpeg/.png' value={image} onChange={(e) => setImage(e.target.value)} className='w-full' required /><span className='text-gray-500 text-sm ml-2 '></span>
                        {image && <img src={image} alt={"Note : Please enter links with jpeg , jpg , png"} width={"30%"} className="border rounded-2xl shadow-sm" />}
                        <input type="number" placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} className='w-full' required />
                        <select className='w-full' onChange={(e) => setType(e.target.value)}>
                            <option value="wired" >Wired</option>
                            <option value="wireless" >Wireless</option>
                        </select>
                        <button className='mt-3 w-full'>Add</button>
                    </form>
                </motion.div>
            </div>
            <div className='absolute left-1/2 '>
                <Alert />

            </div>
        </div>
    )
}

export default AddProduct
