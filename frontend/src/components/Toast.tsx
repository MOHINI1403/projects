import { useEffect } from "react";

// definr the types for the props
type ToastProps={
    message:string;
    type:"SUCCESS"|"ERROR";
    onClose:()=>void;
}

const Toast=({message,type,onClose}:ToastProps)=>{
    //this useEffect function is triggered when the onClose() function is triggered
    useEffect(()=>{
        const timer=setTimeout(()=>{
            onClose();//This is called when the timer is expired indicating that the Toast should be hide now 
        },50000);
        return ()=>{
            clearTimeout(timer);//A type of cleanup function of the effect to clear he timer when the component unmounts .
        }
    },[onClose]);

    const styles=type==="SUCCESS"
        ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-700 text-white max-w-md "
        : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-700 text-white max-w-md"
    return(
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">
                    {message}
                </span>

            </div>
        </div>
    )
};
export default Toast;