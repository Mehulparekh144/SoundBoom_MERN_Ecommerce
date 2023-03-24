import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { AlertContext, useAlert } from '../context/alertContext'
import Alert from '../components/Alert'
import { UserContext } from '../context/userContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const { setAlert, clearAlert } = useAlert(AlertContext)
    const { setUser } = useContext(UserContext)

    const loginUserHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login", { email, password })
            setUser(response.data)
            setAlert("Logged In Successfully", "success")
            clearAlert()
            setRedirect(true)

        } catch (error) {
            setAlert("Invalid Details", "danger")
            clearAlert()
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }

    return (
        <motion.div
            initial={{ y: "-150vh" }}
            animate={{ y: 0 }}
            exit={{ y: "-115vh" }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="md:min-h-[72vh] flex  flex-col justify-center "
        >
            <div className='text-center text-primary md:px-32'>
                <h1 className='text-4xl mb-4 font-semibold'>Login 🎻</h1>
                <form onSubmit={loginUserHandler} className='flex flex-col gap-3'>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    <button>Login</button>
                    <p>If not a user ! <Link to={"/register"} className="text-secondary underline font-bold">Register here</Link></p>
                </form>
            </div>
            <Alert />

        </motion.div>
    )
}

export default Login
