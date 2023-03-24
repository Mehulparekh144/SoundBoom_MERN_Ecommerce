
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx'

const DropDown = ({ title, items, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState(title)


    const handleSelect = (item) => {
        setType(item)
        onSelect(item.toLowerCase())
        setIsOpen(false)
    }

    const variants = {
        open: {
            opacity: 1,
            y: 0,
            display: 'block'
        },
        closed: {
            opacity: 0,
            y: -10,
            transitionEnd: {
                display: 'none',
            },
        }
    }
    return (
        <div className='relative z-50'>
            <button className='bg-secondary px-4 py-2 rounded-full flex items-center gap-2 text-sm ' onClick={() => setIsOpen(!isOpen)}>
                {type} {isOpen ? <RxCaretUp /> : <RxCaretDown />}
            </button>
            <motion.div
                initial="closed"
                animate={isOpen ? 'open' : "closed"}
                variants={variants}
                className="absolute py-2 px-4 w-56 mt-2 origin-top-right rounded-2xl bg-gray-100 shadow-lg"
            >
                {items.map((item, index) => (
                    <div key={index}>
                        <button onClick={() => { onSelect(item); handleSelect(item) }} className='my-2'>{item}</button>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export default DropDown
