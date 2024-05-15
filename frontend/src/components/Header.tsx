import {Link} from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";
const Header=()=>{
    const {isLoggedIn}=useAppContext();
    
    return(
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white fotn-bold tracking-light">
                    <Link to="/">BookingHolidays.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? (
                        <>
                            <Link to={"/my-bookings"}>My Bookings</Link>
                            <Link to={"/my-hotels"}>My Hotels</Link>
                            <SignOutButton />
                    
                        </>
                    ) :(
                        <Link to="/sign-in" className="flex bg-white items-center text-blue-600 px-3 rounded-md font-bold hover:bg-gray-100 ">Sign-In</Link>
                    )}
                </span>
            </div>
        </div>
    );
};
export default Header;

/*
import {Link} from "react-router-dom";
const Header=()=>{
    return(
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white fotn-bold tracking-light">
                    <Link to="/">BookingHolidays.com</Link>
                </span>
                <span className="flex space-x-2">
                    <Link to="/sign-in" className="flex bg-white items-center text-blue-600 px-3 rounded-md font-bold hover:bg-gray-100 ">Sign-In</Link>
                </span>
            </div>
        </div>
    );
};
export default Header;
*/