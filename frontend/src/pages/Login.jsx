import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset ,forgotPassword} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Login() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  })


  const { userName, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message ,emailSuccess} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if(emailSuccess){
      toast.success('Go Check your mail Address to change password')
    }

    if (isSuccess || user) {
     const u =  JSON.parse(window.localStorage.getItem('user'));
     if(u.typee==='corporateTrainee'){
      navigate('/corporateTrainee')
     }else if(u.typee==='individualTrainee'){
        navigate('/mainIndividualTrainee')
     }else if(u.typee==='instructor'){
         navigate('/instructor')
    }else{
      navigate('/admin')
    }
  }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch,emailSuccess])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      userName,
      password,
    }

    dispatch(login(userData))
  }

  const forgot=(e)=>{
    e.preventDefault()

    const user={
      userName
    }
    dispatch(forgotPassword(user))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>ORAAA</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='userName'
              className='form-control'
              id='userName'
              name='userName'
              value={userName}
              placeholder='Enter your userName'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

           <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
      <br/>
            <h4 className='forgot' onClick={forgot}>Forgot Password</h4>
    </>
  )
}

export default Login