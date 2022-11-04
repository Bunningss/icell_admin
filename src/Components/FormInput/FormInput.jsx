import './FormInput.scss'

const FormInput = ({ input, handleChange }) => {
  const { errorMsg, placeholder, ...others } = input
  return (
    <>
      <label htmlFor="" className='placeholder'>{placeholder}</label>
      <input className='input' {...others} placeholder={placeholder} onChange={handleChange} />
    </>
  )
}

export default FormInput