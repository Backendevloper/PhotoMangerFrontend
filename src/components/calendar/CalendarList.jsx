import { useEffect, useState } from "react"
import Calendar from "./Calendar"

const CalendarList = (props) => {
  const {lists} = props
  const [fundLists, setFundLists] = useState([])

  useEffect(() => {
    if(!lists) {
      return
    }

    lists.then((val) => {
      setFundLists(val || [])
    })
  }, [lists])

  return(
    <div  className="mt-5">
      {fundLists.map((list) => {
        return(
          <div key={list.id}>
            <Calendar list={list} />
          </div>
        )
      })}
    </div>
  )
}

export default CalendarList
