import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { changePassword, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function ChangePasswordPage() {



    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        CnewPassword:'',
      })
    
    
      const { oldPassword, newPassword,CnewPassword } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess) {
         const u =  JSON.parse(window.localStorage.getItem('user'));
         if(u.typee==='corporateTrainee'){
          navigate('/corporateTrainee')
         }else if(u.typee==='individualTrainee'){
            navigate('/mainIndividualTrainee')
         }else if(u.typee==='instructor'){
             navigate('/instructor')
        }
      }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])
    
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
             oldPassword,
             newPassword
          }
    
        dispatch(changePassword(userData))
      }
    }
    
      if (isLoading) {
        return <Spinner />
      }
    













  return (
    <>
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='oldPassword'
            name='oldPassword'
            value={oldPassword}
            placeholder='Enter your old Password'
            onChange={onChange}
          />
        </div>
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
    </section>
  </>
  )
}

export default ChangePasswordPage