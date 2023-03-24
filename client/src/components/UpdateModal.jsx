import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RiCloseCircleFill } from 'react-icons/ri'
import axios from 'axios'
import { AlertContext, useAlert } from '../context/alertContext'

const UpdateModal = ({ open, setOpen , product}) => {
    const {setAlert , clearAlert} = useAlert(AlertContext)
    const [name, setName] = useState(product.name)
    const [desc, setDesc] = useState(product.desc)
    const [image, setImage] = useState(product.image)
    const [price, setPrice] = useState(product.price)
    const [type, setType] = useState(product.type)

    const updateProductHandler = (e,id) =>{
        e.preventDefault()
        axios.put(`/product/${id}` , {name , desc , image , price, type}).then(()=>{
            setOpen(false)
            setAlert("Product updated successfully" , "success")
            clearAlert()
        }).catch(err=>{
            setAlert("Something's wrong" , "danger")
            clearAlert()
        })
    }

    return (
        <>
            {
                open &&

                <motion.div
                    initial={{ opacity: 0, y: "-10vh" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "10vh" }}
                    transition={{ type: 'spring', bounce: 0.3 }}
                    className="bg-primary text-white md:h-max rounded-md inset-0 absolute px-4 md:px-32 py-4 md:overflow-y-visible overflow-y-scroll z-[100]"
                >
                    <div className='flex justify-between my-3 text-3xl'>
                        <h1>Update Product</h1>
                        <RiCloseCircleFill className='cursor-pointer' onClick={() => setOpen(false)} />
                    </div>
                    <form onSubmit={(e)=>updateProductHandler(e,product._id)} className='flex flex-col gap-6 text-gray-50'>
                        <input type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} className='bg-opacity-10 w-full' required />
                        <textarea placeholder='Enter description' value={desc} onChange={(e) => setDesc(e.target.value)} className='bg-opacity-10 w-full' required />
                        <input type="text" placeholder='Enter Image Link  .jpg/.jpeg/.png' value={image} onChange={(e) => setImage(e.target.value)} className='bg-opacity-10  w-full' required /><span className='text-gray-500 text-sm ml-2 '></span>
                        {image && <img src={image} alt={"Note : Please enter links with jpeg , jpg , png"} width={"30%"} className="border rounded-2xl shadow-sm" />}
                        <input type="number" placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} className='bg-opacity-10 w-full' required />
                        <select className='w-full bg-opacity-10 ' onChange={(e) => setType(e.target.value)}>
                            <option value="wired" >Wired</option>
                            <option value="wireless" >Wireless</option>
                        </select>
                        <button className='mt-3 w-full'>Update</button>
                    </form>


                </motion.div>

            }
        </>
    )
}

export default UpdateModal
