import { useEffect, useState } from "react";
import { Routes, Route, useParams} from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
import Consts from "../consts.json"
import Modal from "./Modal";
import CommentForm from "./CommentForm";
import Trash from "../icons/Trash";
import ArrowRight from "../icons/ArrowRight";
import ArrowLeft from "../icons/ArrowLeft";
import MsgBanner from "./shared/MsgBanner";

const ShowImage = (props) => {
  const {user_data} = props
  const [image, setImage] = useState([])
  const params = useParams()
  const groupName = params["*"].split("/")[0]
  const imageIndex = params["*"].split("/")[1]
  const [images, setImages] = useState(false)
  const [imageId, setImageId] = useState(false)
  const [fullImage, setFullImage] = useState(false)
  const [comments, setComments] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [hoverColor, setHoverColor] = useState('hover:bg-indigo-100 hover:border-indigo-300')
  const [carouselBorderColor, setCarouselBorderColor] = useState('border-cyan-600')
  const [showDestroyModal, setShowDestroyModal] = useState(false)
 
  useEffect( () => {
    user_data.then((val => {
      setImages(val.groups
        .find(
          ({ name }) => name.toLowerCase() === groupName.toLowerCase()
        ).images
      )

      setImage(val.groups
        .find(
          ({ name }) => name.toLowerCase() === groupName.toLowerCase()
        ).images[parseInt(imageIndex)]
      )

      let image_id = val.groups.find(
        ({ name }) => name.toLowerCase() === groupName.toLowerCase()
      ).image_ids[parseInt(imageIndex)]

      setImageId(image_id)
      fetchComments(image_id)
    }))
  })

  const fetchComments = (image_id) => {
    let user_token = Cookies.get('session_token')
    let url = `${Consts.backend_base}/api/image/comments?image_id=${image_id}&user_token=${user_token}`
    let response_json = fetch(url).then((val) => {
      return val.json()
    })

    return response_json.then((val) => {
      if(comments !== false) {
        return
      }

      setComments(val.output)
    })
  }

  const deleteRequest = (id, options = {}) => {
    let url;
    let user_token = Cookies.get('session_token')

    if (options.url) {
      url = `${Consts.backend_base}/${options.url}?user_token=${user_token}`
    } else {
      url = `${Consts.backend_base}/api/image/comment/delete?user_token=${user_token}`
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        image_id: imageId,
        group: groupName,
        image_details_id: id
      })
    })

    setComments(comments.filter((com) => com.id !== id))
  }

  const removeImage = () => {
    deleteRequest(0, {url: "api/image/comment/image"})
    window.location.href = '/photo'
  }

  const nextImage = () => {
    let nextImageId = parseInt(imageIndex) + 1
    if (nextImageId < images.length) {
      window.location.href = `/image/${groupName}/${nextImageId}`
    } else {
      window.location.href = `/image/${groupName}/0`
    }
  }

  const previousImage = () => {
    let nextImageId = parseInt(imageIndex) - 1
    if (nextImageId >= 0) {
      window.location.href = `/image/${groupName}/${nextImageId}`
    } else {
      window.location.href = `/image/${groupName}/${images.length -1}`
    }
  }

  return(
    <Routes>
        <Route path="/:groupName/:imageIndex" element={
        <div>
          {(fullImage &&
              <button onClick={() => {setFullImage(!fullImage)}}>
                <img src={image} className="transition-all duration-500"/>
              </button>
            ) ||

              <div>
                { showModal ? <Modal form={true} setShowModal={setShowModal} element={<CommentForm group={groupName} image_id={imageId} image_index={imageIndex} modal={true}/>}/> : null }
                { showDestroyModal ? <Modal performAction={removeImage} setShowModal={setShowDestroyModal} button_text="Remove" element={<span className="text-red-600">Are you sure you want to remove this Image</span>}/> : null }

                <div className="w-full">
                  <button onClick={() => {setFullImage(!fullImage)}}>
                    <img src={image} width="600px" height="600px" className={`transition-all duration-500 m-20 ml-40 border-solid border-2 ${carouselBorderColor} ease-linear hover:border-indigo-600`}/>       
                  </button>

                  <div>
                    <button style={{marginLeft: "29%"}} className="rounded-md p-1 transition-all duration-500 hover:bg-indigo-100"
                      onClick={() => { previousImage() }}
                    >
                      <ArrowLeft w="6" h="6"/>
                    </button>
                    <button className="rounded-md p-1 transition-all duration-500 hover:bg-indigo-100"
                      onClick={() => { nextImage() }}
                    >
                      <ArrowRight w="6"/>
                    </button>
                    <button className={`rounded-md p-1 transition-all duration-500 ${hoverColor}`}
                      onMouseEnter={() => {setHoverColor('hover:bg-red-100 hover:border-red-300'); setCarouselBorderColor('border-red-300')}}
                      onMouseLeave={() => {setHoverColor('hover:bg-indigo-100 hover:border-indigo-300'); setCarouselBorderColor('border-cyan-600')}}
                      onClick={() => setShowDestroyModal(true)}
                    >
                      <Trash w="6" h="6"/>
                    </button>

                  </div>
                </div>
                <button onClick={() => {setShowModal(true)}} className="transition-all duration-500 mb-10 ml-10 text-4xl hover:text-5xl font-bold dark:text-white">Notes</button>
                {comments ? comments.map((comment_details) => {
                  return(
                    <div key={comment_details.id}>
                      <MsgBanner
                        id={comment_details.id}
                        title={comment_details.comment}
                        deleteRequest={deleteRequest}
                      />
                    </div>
                  )
                }) : null }
              </div>
          }
        </div>
      }/>
    </Routes>
  )
}

export default ShowImage