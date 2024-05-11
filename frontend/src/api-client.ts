import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL)
// here we are going to put all our fetch request


// sending the formData to backend of register page 
export const register=async(formData:RegisterFormData)=>{

    const response=await fetch(`${API_BASE_URL}/api/users/register`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody= await response.json();
    if(!response.ok){
        throw new Error(responseBody.message);
        //console.log("juicy",responseBody.message);
    }
}

// sending the formdata to backend of login page
export const signIn=async(FormData:SignInFormData)=>{
    const response =await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(FormData)

    })
    const body=await response.json();
    if(!response.ok){
        throw new Error(body.message);
    }
    return body;
}

// Error
/*export const validateToken=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        method:"GET",
        credentials:"include",
    })
    //const responseBodyy=await response.json();
    if(!response.ok){
        throw new Error("Token invalid");
        //console.log(responseBodyy.message);
    }
    return response.json();
}*/

export const signOut=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST"

    });
    if(!response.ok){
        throw new Error("Error during Sign Out");
    }
}
// API_BASE_URL: comes from the dotenv there it contains the port on which the server is running 

