import React, { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertContext } from '../context/alertContext'

const Alert = () => {
    const { message, type, isOpen , clearAlert } = useContext(AlertContext)
    let className = ""
    if (type === 'success') {
        className += 'bg-[#10B981]'
    }
    if (type === 'danger') {
        className += 'bg-[#DC2626]'
    }
    if (type === 'info') {
        className += 'bg-[#17a2b8]'
    }
    return (
        <>
            {isOpen &&
                <motion.div
                    initial={{ opacity: 0, y: "10" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "10" }}
                    transition={{ type: "spring" }}
                    className={`absolute text-white bottom-0 m-auto left-0 right-0 px-6 py-2 rounded-md bg-opacity-90 text-center w-max  ${className}`}>
                    {message}
                </motion.div>
            }
        </>
    )
}

export default Alert
