import { useMutation } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../context/AppContext";
const SignOutButton=()=>{
    const {showToast}=useAppContext();
    const mutation=useMutation(apiClient.signOut,{
        onSuccess:()=>{
            showToast({message:"Signed Out!",type:"SUCCESS"});
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"});
        },
    });

    const handleClick=()=>{
        mutation.mutate();
    }

    return(
        <button onClick={handleClick}className="text-blue-600 px-3 fotn-bold bg-white hover:bg-gray-100">
            Sign-Out
        </button>
    );
};
export default SignOutButton;