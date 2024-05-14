import Trash from "../../icons/Trash"
import { useState } from "react"

const MsgBanner = (props) => {
  const {title, id, deleteRequest} = props
  const [hoverColor, setHoverColor] = useState('hover:bg-indigo-100 hover:border-indigo-300')

  return(
    <div style={{justifyContent: "space-between"}} className={`flex transition-all duration-500 box-border w-3/4 rounded-md ml-5 mb-5 p-4 border-4 border-teal-300 bg-teal-100 ${hoverColor}`}>
      <span>{title}</span>

      { deleteRequest ?
        <button
          onMouseEnter={() => {setHoverColor('hover:bg-red-100 hover:border-red-300')}}
          onMouseLeave={() => {setHoverColor('hover:bg-indigo-100 hover:border-indigo-300')}}
          onClick={() => deleteRequest(id)}
        >
          <Trash w="6" h="6"/>
        </button> : null
      } 
    </div>
  )
}

export default MsgBanner