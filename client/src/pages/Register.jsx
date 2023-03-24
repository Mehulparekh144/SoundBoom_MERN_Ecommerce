import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import Alert from '../components/Alert'
import { useAlert } from '../context/alertContext'

const Register = () => {
    const { isOpen, setAlert, clearAlert } = useAlert()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect , setRedirect] = useState(null)


    const registerUserHandler=async(e)=>{
        e.preventDefault();
        try {
            await axios.post("/register" , {name,email,password})
            setAlert("Registered Successfully","success")
            clearAlert()

            setRedirect("/login")

            
        } catch (error) {
            setAlert("Unsuccessful Registration" , "danger")
            clearAlert()
            
        }
            
        


    }

    if(redirect){
        return <Navigate  to={redirect} />
    }

    return (
        <motion.div
        initial= {{y : "-150vh"}}
        animate= {{y:0}}
        exit = {{y : "-115vh"}}
        transition={{type:'spring' , bounce : 0.3 }}
        className="md:min-h-[72vh] flex  flex-col justify-center "
        >
            <div className='text-center text-primary md:px-32'>
                <h1 className='text-4xl mb-4 font-semibold'>Register 🥁</h1>
                <form onSubmit={registerUserHandler} className='flex flex-col gap-3'>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder='Name' required/>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Email' required/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Password' required/>
                    <button>Register</button>
                    <p>If already a user ! <Link to={"/login"} className="text-secondary underline font-bold">Login here</Link></p>
                </form>
            </div>
            <Alert/>

        </motion.div>
    )
}

export default Register
