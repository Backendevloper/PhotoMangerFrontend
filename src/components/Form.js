import React, { useState } from "react";
import Consts from "../consts.json"
import Cookies from "js-cookie"


const Form = (props) => {
  const [reqParams, setReqParams] = useState({})
  const [errors, setErrors] = useState([])
  const formData = new FormData()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (props.title === "Add Image") {
      formData.append('image', reqParams["image"])
    } else if (["Add Song", "Edit Song"].includes(props.title)) {
      formData.append('thumbnail', reqParams["thumbnail"])
      formData.append('song', reqParams["song"])
      formData.append('name', reqParams["name"])
    }

    let user_token = Cookies.get('session_token')
    let url_symbol

    if (props.contains_params) {
      url_symbol = '&'
    } else {
      url_symbol = '?'
    }

    let url = `${Consts.backend_base}/${props.api_url}${url_symbol}user_token=${user_token}`
    let form_data = JSON.stringify(reqParams)
    let headers = {"Content-type": "application/json"}

    if(props.file === "true") {
      headers = {}
      form_data = formData
    }

    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: form_data
    })

    let response_json = await response.json()
    setErrors(response_json.error_messages)

    let redirection = props.redirect

    if (response_json.error_messages.length === 0) {
      switch(props.title) {
        case "Log In":
        case "Register":
          Cookies.set("session_token", response_json.user_token)
          break;
        case "New Playlist":
          redirection = `${redirection}/${reqParams["name"]}`
        default:
          break;
      }

      window.location.href = redirection
    }
  }

  const handleChange = (field) => (event) => {
    if (field.type !== 'file') {
      setReqParams({...reqParams, [field.name.toLowerCase()]: event.target.value})
    } else {
      setReqParams({...reqParams, [field.name.toLowerCase()]: event.target.files[0]})
    }
  }

  const formClass = () => {
    if (props.modal) {
      return("")
    } else {
      return("bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-7/12 ml-20 mt-20")
    }
  }


  return(
    <>
      <form className={formClass()} onSubmit={ handleSubmit }>
        <div>
          <h3 className="text-3xl font-bold mb-5"> {props.title} </h3>
        </div>

        {
          props.fields.map((field) => {
            return(
              <div className="mb-4" key={field.name}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.name}
                </label>

                <input className="shadow appearance-none border rounded w-7/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={field.name.toLowerCase()}
                  type={field.type}
                  accept={field.accept || ""}
                  placeholder={field.placeholder}
                  onChange={ handleChange(field) }
                />
              </div>
            )
          })
        }

        <ol className="mb-2 text-red-600 list-decimal list-inside m-2">
          {
            errors.length !== 0 && errors.map((error) => {
              return(<li key={error}> {error} </li>)
            })
          }
        </ol>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {props.buttonName}
          </button>
        </div>
      </form>
    </>
  )
}

export default Form
