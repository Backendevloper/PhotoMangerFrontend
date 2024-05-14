import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Router from "./Router";
import Cookies from "js-cookie";
import Const from './consts.json'

function App() {
  const user_data = async () => {
    let session_token = Cookies.get('session_token')
    if (!session_token) {
      return true
    }

    let url = `${Const.backend_base}/fetch_user?token=${session_token}`
    let response = await fetch(url)
    return await response.json()
  }

  const [userData, setUserdata] = useState(user_data())

  return (
    <React.Fragment>
      <Navbar user_data={userData}/>
      <Router user_data={userData}/>
    </React.Fragment>
  );
}

export default App;
