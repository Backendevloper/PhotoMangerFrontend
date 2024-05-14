import { useState } from "react"

const PlaylistCard = (props) => {
  const {name, playlist} = props
  const [thumbnailSize, setThumbnailSize] = useState(200)

  const musicWithThumbnail = playlist.filter((music) => {
    if (music.thumbnail) { 
      return true
    }

    return false
  })

  const enlargeImage= (event) => {
    let Image = event.target

    let Images = document.getElementsByClassName('images')
    Images = [].slice.call(Images)
    Images = Images.filter((image) => {
      return image.parentElement.parentElement === Image.parentElement.parentElement
    })

    Images.forEach((image) => {
      image.style['width'] = "125px"
      image.style['height'] = "125px"
    })

    Image.style['width'] = "275px"
    Image.style['height'] = "275px"
  }

  const shrinkImage= (event) => {
    let Image = event.target

    let Images = document.getElementsByClassName('images')
    Images = [].slice.call(Images)
    Images = Images.filter((image) => {
      return image.parentElement.parentElement === Image.parentElement.parentElement
    })

    Images.forEach((image) => {
      image.style['width'] = "200px"
      image.style['height'] = "200px"
    })

    Image.style['width'] = "200px"
    Image.style['height'] = "200px"
  }

  return(
    <button className="hover:text-indigo-400 flex m-5" style={{flexDirection: 'column'}}
      onClick={ () => {window.location.href = `/music/${name}`}}
    >
      <div className="bg-cyan-100 transition-all duration-200 border border-gray-200 shadow-xl hover:shadow-2xl hover:shadow-indigo-200" style={{overflow: 'hidden', height: 400, width: 400}}>

        <div className="flex">
          {musicWithThumbnail[0] &&
            <img alt={musicWithThumbnail[0].name} src={musicWithThumbnail[0].thumbnail}
              style={{height: 200, width: 200}}
              className="images transition-all duration-200 border border-cyan-100 border-l-0 border-t-0"
              onMouseEnter={(e) => enlargeImage(e)}
              onMouseLeave={(e) => shrinkImage(e)}
            ></img>
          }

          {musicWithThumbnail[1] &&
            <img alt={musicWithThumbnail[1].name} src={musicWithThumbnail[1].thumbnail}
              style={{height: 200, width: 200}}
              onMouseEnter={(e) => enlargeImage(e)}
              onMouseLeave={(e) => shrinkImage(e)}
              className="images transition-all duration-200 border border-cyan-100 border-r-0 border-t-0"
            ></img>
          }
        </div>

        <div className="flex">
        {musicWithThumbnail[2] &&
          <img alt={musicWithThumbnail[2].name} src={musicWithThumbnail[2].thumbnail}
            style={{height: 200, width: 200}}
            onMouseEnter={(e) => enlargeImage(e)}
            onMouseLeave={(e) => shrinkImage(e)}
            className="images transition-all duration-200 border border-cyan-100 border-l-0 border-b-0"
          ></img>
        }

        {musicWithThumbnail[3] &&
          <img alt={musicWithThumbnail[3].name} src={musicWithThumbnail[3].thumbnail}
            style={{height: 200, width: 200}}
            onMouseEnter={(e) => enlargeImage(e)}
            onMouseLeave={(e) => shrinkImage(e)}
            className="images transition-all duration-200 border border-cyan-100 border-r-0 border-b-0"
          ></img>
        }
        </div>
      </div>
      <span className="transition-all duration-200 text-xl" style={{alignSelf: 'center'}}> {name.toUpperCase()}</span>
    </button>
  )
}

export default PlaylistCard
