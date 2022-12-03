import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import {editEmailOrMiniBio} from '../features/instructor/instructorSlice'



function InstructorEdit() {
    const [formData, setFormData] = useState({
        email: '',
        miniBio: '',
      })
    
    
      const {email,miniBio} = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const {isLoading,isSuccess,isError,message } = useSelector(
        (state) => state.instructor
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }

        if(isSuccess){
           toast.success('Done')
           navigate('/Instructor')
        }
    
       
    
      }, [isError,isSuccess,message,navigate])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
       
          const instructorData = {
             email,
             miniBio
          }
    
        dispatch(editEmailOrMiniBio(instructorData))
      
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
            id='email'
            name='email'
            value={email}
            placeholder='Edit email'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='miniBio'
            name='miniBio'
            value={miniBio}
            placeholder='Edit MiniBiography'
            onChange={onChange}
          />
        </div>
         <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Edit 
          </button>
        </div>
      </form>
    </section>
  </>
  )
}

export default InstructorEdit