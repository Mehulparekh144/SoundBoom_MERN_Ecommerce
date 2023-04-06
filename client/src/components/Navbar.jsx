import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { MdOutlineAccountCircle, MdPayments } from 'react-icons/md'
import { RiMenu2Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Cart from './Cart'
import logo from '../assets/images/headphones.png'
import SearchResults from './SearchResults'
import { filterProps } from 'framer-motion'


const Navbar = () => {
    const { user } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)
    const items = useSelector((state) => state.cart)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const location = useLocation()
    const subpage = location.pathname.split("/").slice(-1)[0]
    let quantity = 0
    const { data: products, status } = useSelector((state) => state.product)
    const [searchTerm, setSearchTerm] = useState("")
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [searchInputRef]);

    const filteredProducts = products.filter(product => {
        if (searchTerm.trim() === '') {
            return false;
        }
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    items.map((item) => {
        quantity += item.quantity
    })

    const handleSearchDropDown = (e) => {
        e.preventDefault()
        setIsSearchOpen(true)
    }


    const handleCartDropDown = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    return (
        <nav className='fixed top-0 left-0 right-0 flex flex-col md:flex-row gap-2 items-center justify-between px-12 md:px-32 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md py-5 z-50'>
            <Link to={"/"} className="flex items-center gap-6 " >
                <img src={logo} alt="" className='w-[50px] h-[50px] motion-safe:animate-bounce' />
                <h1 className='text-3xl text-primary font-bold'>SoundBoom</h1>
            </Link>
            <div className='relative w-full md:w-1/2'>
                <input type="text" placeholder='Search Products' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} ref={searchInputRef} onFocus={(e) => handleSearchDropDown(e)} className='w-full' />
                <SearchResults isOpen={isSearchOpen} filteredProducts={filteredProducts} />
            </div>
            <div>
                <ul className='flex gap-5 text-primary '>
                    {
                        user && <li className='px-4 py-2 hover:translate-y-1 hover:underline transition-all ease-linear'><Link to='/account' className='flex gap-2 items-center focus:font-bold'><MdOutlineAccountCircle />{user.name}</Link></li>
                    }
                    {
                        !user && <li className='px-4 py-2 hover:translate-y-1 hover:underline transition-all ease-linear'><Link to='/login' className='flex gap-2 items-center focus:font-bold'><MdOutlineAccountCircle />Login</Link></li>
                    }
                    {
                        user &&
                        <li className='px-4 py-2 hover:translate-y-1 hover:underline transition-all ease-linear'><Link to='/orders' className='flex gap-2 items-center focus:font-bold'><MdPayments />Orders</Link></li>
                    }

                    {
                        subpage === 'payment' ? "" :
                            <button onClick={(e) => handleCartDropDown(e)} className='relative bg-primary text-white px-4 rounded-xl  py-2 hover:translate-y-1 hover:underline transition-all ease-linear focus:font-bold'><p className='flex gap-2 items-center '><FiShoppingCart /> Cart</p>
                                {quantity > 0 &&
                                    <span className="bg-secondary -top-1 -right-1 text-white absolute  rounded-full w-5 h-5 flex items-center justify-center text-xs">{quantity}</span>
                                }
                            </button>
                    }
                    <Cart isOpen={isOpen} setIsOpen={setIsOpen} />

                </ul>
            </div>
        </nav>
    )


}

export default Navbar
