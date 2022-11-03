import './Login.scss';

const Login = () => {
  return (
    <div className='login'>
      <div className="wrapper">
        <form action="" className="form">
          <input type="text" placeholder='Enter Your Username' className='form-input'/>
          <input type="text" placeholder='Enter Your Password' className='form-input'/>
          <button className="button">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login