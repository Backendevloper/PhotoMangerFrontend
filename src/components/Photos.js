import { useEffect, useState } from "react"
import Group from "./Group"
import Modal from "./Modal"
import GroupForm from "./GroupForm"
import ActionCable from "actioncable"

const Photos = (props) => {
  const {groups} = props
  const [showModal, setShowModal] = useState(false)
  const [socket, _setSocket] = useState(ActionCable.createConsumer('ws://localhost:3002/cable'))
  const handleMessage = (message) => {
    console.log(message)
  }

  useEffect( () => {
    socket.subscriptions.create(
      { channel: 'ChatChannel' },
      { received: message => handleMessage(message) }
    )
  }, [socket])

  return(
    <>
    { showModal ? (<Modal form={true} element={<GroupForm modal={true} setShowModal={setShowModal} />} setShowModal={setShowModal}/>) : null }
      {
        groups.map((group) => {
          return(
            <div key={group.name}>
              <Group group={group} />
            </div>
          )
        }
      )}
    </>
  )
}

export default Photos
