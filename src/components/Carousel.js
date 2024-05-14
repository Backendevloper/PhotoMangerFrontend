import { useState } from "react"
import ArrowRight from "../icons/ArrowRight"
import ArrowLeft from "../icons/ArrowLeft"
import '../components/stylesheets/carousel.css'

const Carousel = (props) => {
  const {images, groupName} = props
  const carasoulCapacity =  -31 * images.length
  const [carasoulPos, setCarasoulPos] = useState(0)

  const handleChange = (direction) => {
    let carasoulSlider = document.getElementById(`carasoul-slider-${groupName}`)

    if (carasoulPos <= carasoulCapacity + 31 && direction > 0) {
      carasoulSlider.setAttribute('style', `margin-left: 0rem;`)
      setCarasoulPos(0)
    } else if(carasoulPos == 0 && direction < 0) {
      carasoulSlider.setAttribute('style', `margin-left: ${carasoulCapacity+31}rem;`)
      setCarasoulPos(carasoulCapacity)
    } else if (direction < 0) {
      carasoulSlider.setAttribute('style', `margin-left: ${carasoulPos+31}rem;`)
      setCarasoulPos(carasoulPos + 31)
    } else {
      carasoulSlider.setAttribute('style', `margin-left: ${carasoulPos - 31}rem;`)
      setCarasoulPos(carasoulPos - 31)
    }
  }

  return(
    <div className="ml-10 overflow-hidden" style={images.length !== 0 ? {height: 400} : {}}>
      { images.length !== 0 &&
        <div className="flex">
          <div onClick={() => handleChange(-1)} className="grid content-center w-10 mr-3 hover:bg-gray-100 carasoul-arrow">
            <ArrowLeft w='10' h='10'/>
          </div>

          <div className="carasoul-container">
            <div className="carasoul-slider" id={`carasoul-slider-${groupName}`}>
              {
                images.map((image, index) => {
                  return(
                    <a key={index} href={`/image/${groupName}/${index}`}>
                      <img src={image} width="500" height="400" style={{height: 400}} id="carasoul-image" className="border-solid border-2 border-cyan-600 ease-linear transition-all duration-150 hover:border-indigo-600 carasoul-image"/>
                    </a>
                  )
                })
              }
            </div>
          </div>

          <div onClick={() => handleChange(1)} className="grid content-center w-10 ml-3 hover:bg-gray-100 carasoul-arrow">
              <ArrowRight w='10' h='10'/>
          </div>
        </div>
      }
    </div>
  )
}

export default Carousel
