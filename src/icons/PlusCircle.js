import React, { useEffect, useState } from "react";

const PlusCircle = (props) => {
  const [dimensions, setDimensions] = useState('w-6 h-6')

  useEffect(() => {
    setDimensions(`w-${props.w} h-${props.h}`)
  })

  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={dimensions}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

export default PlusCircle