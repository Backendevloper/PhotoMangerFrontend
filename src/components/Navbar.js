import React, { useEffect, useState } from "react";
import Cap from "../icons/Cap";
import Cookies from "js-cookie";
import DoorOut from "../icons/DoorOut";
import DoorIn from "../icons/DoorIn";
import UserPlus from "../icons/UserPlus";


const Navbar = (props) => {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    let user_data = props.user_data

    user_data.then((val) => {
      if (val.user) {
        setUsername(val.user.username)
      }
    })
  })

  const handleLogout = () => {
    Cookies.remove('session_token')
    window.location.href = '/login'
  }

  return(
    <nav className="h-15 flex items-center justify-between bg-teal-200 shadow-md">
      <a href="/" className="m-1 flex" id='nav_link'>
        <Cap w='10' h='10'/>

        <span className="mt-2"> { username } </span> 
      </a>

      <div>
        { (username && 
          <button className="mr-2 flex bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent active:bg-yellow-600 focus:ring focus:ring-yellow-300 rounded"
           onClick={ handleLogout }
          >
            <span className="mr-1"> Log out </span>

            <DoorOut w='6' h='6'/>
          </button>) ||
          <div className="flex">
            <a href="/login" className="mr-2 flex bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent active:bg-blue-600 focus:ring focus:ring-blue-300 rounded" id='nav_link'>
              <DoorIn w='6' h='6'/>

              <span className="ml-2"> log In </span> 
            </a>

            <a href="/register" className="mr-2 flex bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent active:bg-green-600 focus:ring focus:ring-green-300 rounded" id='nav_link'>
            <UserPlus w='6' h='6'/>

            <span className="ml-2">  Register </span> 
            </a>
          </div>
        }
      </div>
    </nav>
  )
}

export default Navbar
