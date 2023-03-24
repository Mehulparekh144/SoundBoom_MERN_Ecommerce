import React , {createContext, useContext , useState} from 'react';
import Alert from '../components/Alert';

export const AlertContext = createContext()

export function AlertContextProvider({children}){
    const[state , setState] = useState({
        message : '' , 
        type : '',
        isOpen : false
    })

    const setAlert = (message , type)=>{
        setState({message,type,isOpen:true})
    }

    const clearAlert =()=>{
        setTimeout(()=>{
            setState({message : "" , type : "" , isOpen:false})
        },2000)
    }
    
    return (
        <AlertContext.Provider value={{...state , setAlert , clearAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert=()=>{
    const alertContext = useContext(AlertContext)

    if(!alertContext){
        throw new Error("Define context")
    }

    return alertContext

}