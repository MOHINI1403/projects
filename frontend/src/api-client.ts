import { RegisterFormData } from "./pages/Register";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL)
// here we are going to put all our fetch request

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
// API_BASE_URL: comes from the dotenv there it contains the port on which the server is running 

