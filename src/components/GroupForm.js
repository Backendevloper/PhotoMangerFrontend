import Form from "./Form"

const GroupForm = (props) => {
  return(
    <Form
      title='Add Group'
      setShowModal={props.setShowModal}
      modal={props.modal}
      buttonName='Add'
      api_url='/api/group/create'
      redirect='/'
      fields={[
        { name: 'Group', type: 'text', placeholder: 'Group Name' },
      ]}
    />
  )
}

export default GroupForm
