import { Home, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar(){
 const user=JSON.parse(localStorage.getItem('user'));
console.log('logged in user :',user);
return(
    <>
    <div className="bg-white top-0 z-[50] fixed w-full p-4  shadow-md" > 
        <div className="flex  justify-between">
           
            <div className="text-xl text-blue-600 font-bold text-center ml-2">Survey App</div> 
            <div className=" mr-8 flex gap-8">
                <div className="flex gap-2">
                     <span className="text-gray-600 text-center mt-1 "><Home size={20}/></span>
                     <div className="text-gray-600 text-center "><Link to='/dashboard'>Dashboard</Link></div>
                </div>
            <div className="flex gap-2">
            <div className="text-center text-gray-600">Hi, {user?.name.slice(0,1).toUpperCase()+user?.name.slice(1).toLowerCase()}</div>
           <span className=" mt-1 text-red-600"><LogOut size={20}/></span>
            </div>
            </div>
           
        </div>
    </div>
    </>
)

}

export default Navbar