import Form from "./Form"

const ImageForm = (props) => {
  const {groupName} = props

  return(
      <Form
        title='Add Image'
        setShowModal={props.setShowModal}
        modal={props.modal}
        buttonName='Add'
        api_url={`/api/user_images/${groupName}/create`}
        redirect='/photo'
        fields={[
          { name: 'image', type: 'file', placeholder: 'Add image', accept: ".jpeg,.JPEG,.png,.PNG,.avif,.AVIF" },
        ]}
        file="true"
      />
  )
}

export default ImageForm