import React from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = async () => {
    try {
      // Call backend logout route to clear cookie
     const res= await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true });


      if(res){
        localStorage.removeItem("Users");
      setAuthUser(null);

      }
       
      toast.success("Logout User Successfully!");
 
      // Clear local storage and context
    } catch (error) {
      console.error(error);
      toast.error("Error: Unable to logout");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
    >
      Logout
    </button>
  );
}

export default Logout;
