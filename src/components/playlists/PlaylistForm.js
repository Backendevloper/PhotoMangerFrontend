import Form from "../Form"

const PlaylistForm = (props) => {
  return(
    <Form
      title='New Playlist'
      setShowModal={props.setShowModal}
      modal={props.modal}
      buttonName='Add'
      api_url='/api/playlist'
      redirect='/music'
      fields={[
        { name: 'Name', type: 'text', placeholder: 'Playlist Name' },
      ]}
    />
  )
}

export default PlaylistForm
