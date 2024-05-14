import Form from "./Form"

const RegistrationForm = () => {
  return(
    <Form
    title='Register'
    buttonName='Sign up'
    api_url='/api/user/create'
    redirect='/'
    fields={[
      { name: 'Username', type: 'text', placeholder: 'Username' },
      { name: 'Password', type: 'Password', placeholder: '********' },
    ]}
  />
  )
}

export default RegistrationForm