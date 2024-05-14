import { useEffect, useState } from "react"
import useParamsHelper from "../../helpers/useParamsHelper"

const ShowCalendar = (props) => {
  const {calendars} = props
  const [calendar, setCalendar] = useState()
  const calendarId = parseInt(useParamsHelper(1))

  useEffect(() => {
    if (!calendars) {
      return
    }

    calendars.then( (val) => {
      setCalendar(val[calendarId])
    })
  }, [calendars])

  return(
    <div>
      <h1></h1>
      placeholder {console.log(calendar)}
    </div>
  )
}

export default ShowCalendar
