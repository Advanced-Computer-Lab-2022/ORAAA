import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { changePasswordF, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function ForgotPasswod() {
  const [formData, setFormData] = useState({
    newPassword: '',
    CnewPassword:'',
  })

  const done = useRef(false);


  const { newPassword,CnewPassword } = formData



  
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if(isSuccess){
      toast.success('Password Changed')
    }

    if(isSuccess){
      done.current=true
    }else{
      done.current=false
    }


    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch,done])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(newPassword !== CnewPassword){
        toast.error('Passwords do not match')
    }else{
      const userData = {
         newPassword
      }

    dispatch(changePasswordF(userData))
  }
}


  

  if (isLoading) {
    return <Spinner/>
  }

  
return (
<>
<section className='form'>
{!done.current ? (
  <form onSubmit={onSubmit}>
    <div className='form-group'>
      <input
        type='text'
        className='form-control'
        id='newPassword'
        name='newPassword'
        value={newPassword}
        placeholder='Enter New Password'
        onChange={onChange}
      />
    </div>
    <div className='form-group'>
      <input
        type='text'
        className='form-control'
        id='CnewPassword'
        name='CnewPassword'
        value={CnewPassword}
        placeholder='Confirm your password'
        onChange={onChange}
      />
    </div>
     <div className='form-group'>
      <button type='submit' className='btn btn-block'>
        Change Password
      </button>
    </div>
  </form>
   ):(
    <h1>Done</h1>
    
  )}
</section>
</>
)
}

export default ForgotPasswod