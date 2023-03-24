import axios from 'axios'
import React, { useState } from 'react'
import { AiFillDelete} from 'react-icons/ai'

import { RxUpdate } from 'react-icons/rx'
import { AlertContext, useAlert } from '../context/alertContext'
import UpdateModal from './UpdateModal'


const AdminProductItem = ({ product }) => {
    const {setAlert , clearAlert} = useAlert(AlertContext)
    const {_id, name, image, desc, price } = product
    const [open, setOpen] = useState(false)

    const toggleModal = () => {
        setOpen(!open)

    }

    const deleteProductHandler=(id)=>{
        axios.delete(`/product/${id}`).then(()=>{
            setAlert(`Product ${id} deleted` , "success")
            clearAlert()
        }).catch((error)=>{
            setAlert("Something's wrong" , "danger")
            clearAlert()
        })
    }


    return (
        <>
        <UpdateModal open={open} setOpen={setOpen} product={product} />
        <div className='bg-primary bg-opacity-10 w-full md:flex  my-4 rounded-lg border-2 border-opacity-10 border-primary hover:shadow-[5px_5px_#002B5B] hover:scale-105 hover:border-2 hover:border-opacity-100 transition-all  ease-linear'>

            <div className='relative md:w-1/4  border-2 border-primary border-opacity-5'>
                <img src={image} alt="" className='w-max object-contain md:w-full' />
            </div>
            <div className='py-6 px-4'>
                <div className="flex justify-between gap-3 mb-2">
                    <h1 className='text-xl font-semibold '>{name}</h1>
                    <p className='font-bold text-primary'>₹{price}/-</p>
                </div>
                <p className='text-sm text-gray-800'>{desc.slice(0, 50)}...</p>
                <div className='my-3 flex gap-3'>
                    <button className='flex gap-1 items-center' onClick={()=>deleteProductHandler(_id)}><AiFillDelete />Delete</button>
                    <button className='flex gap-1 items-center ' onClick={toggleModal}><RxUpdate/> Update</button>
                </div>
            </div>



        </div>
        </>
    )
}

export default AdminProductItem
