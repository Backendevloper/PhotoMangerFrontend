import Form from "./Form"

const MusicForm = (props) => {
  const {edit, musicId, setShowModal, modal} = props
  const title = edit ? 'Edit' : 'Add'
  
  return(
      <Form
        title={`${title} Song`}
        setShowModal={setShowModal}
        modal={modal}
        buttonName={title}
        contains_params={edit}
        api_url={edit ? `/api/music/update?music_id=${musicId}` : "/api/music/"}
        redirect="/music"
        fields={[
          { name: 'name', type: 'text', placeholder: 'Name' },
          { name: 'song', type: 'file', placeholder: 'Add Song', accept: ".wav,.mp3" },
          { name: 'thumbnail', type: 'file', placeholder: 'Add thumbnail', accept: ".jpeg,.JPEG,.png,.PNG,.avif,.AVIF" },
        ]}
        file="true"
      />
  )
}

export default MusicForm
