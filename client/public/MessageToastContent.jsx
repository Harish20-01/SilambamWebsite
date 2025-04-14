import React from 'react';
import { useContext,createContext } from "react";
import {toast} from 'react-hot-toast';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ToastContext = createContext();
export const ToastProvider=({children})=>{

    const showSuccess=(message,icon=<FaCheckCircle color='green' size={24}/>)=>{
        toast.success(message,{
            duration:3000,
            position:'bottom-center',
            style:{
                background:"black",
                color:"white"
            },
            icon:icon,
        });
    };

    const showError=(message,icon=<FaExclamationCircle color='red' size={24}/>)=>{
        toast.error(message,{
            duration:3000,
            position:'bottom-center',
            style:{
                background:"black",
                color:"white"
            } ,
            icon:icon,  
        });
    };

    return(
        <ToastContext.Provider value={{showSuccess,showError}}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast=()=>{
    const context=useContext(ToastContext);
    return context;
}



