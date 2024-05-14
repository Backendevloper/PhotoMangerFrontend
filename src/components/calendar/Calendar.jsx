import { useEffect, useState } from "react"
import MsgBanner from "../shared/MsgBanner"

const Calendar = (props) => {
  const {list} = props
  const [listDetails, setListDetails] = useState({})
  
  useEffect(() => {
    setListDetails(list)
  }, [list])

  return(
    <div>
      {list ? 
        <div>
          <MsgBanner
            id={listDetails.id}
            title={`${Object.keys(listDetails.data || {}).slice(-1)}'s Calendar`}
          />
        </div>
      : null}      
    </div>
  )
}

export default Calendar