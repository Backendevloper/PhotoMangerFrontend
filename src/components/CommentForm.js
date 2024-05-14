import Form from "./Form"

const CommentForm = (props) => {
  const {group, image_id, image_index, modal} = props
  
  return(
    <Form
    title='Make new Note'
    buttonName='Make'
    contains_params={true}
    modal={modal}
    api_url={`/api/image/commment/create?image_id=${image_id}`}
    redirect={`/image/${group}/${image_index}`}
    fields={[
      { name: 'Comment', type: 'text', placeholder: 'Comment' },
    ]}
  />
  )
}

export default CommentForm