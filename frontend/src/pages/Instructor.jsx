import { useEffect } from 'react'
import { toast } from 'react-toastify'
import  { useState } from 'react';
import Spinner from '../components/Spinner'
import { useSelector} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import CourseItem from '../components/CourseItem'
import {useDispatch} from'react-redux'
import { resetR } from '../features/instructor/instructorSlice';
import { getCourses,reset} from '../features/courses/courseSlice'
import ChooseCountryForm from '../components/ChooseCountryForm'
import FilterForm from '../components/FilterForm'
import Toggle from '../components/Toggle'
import Popup from '../components/Popup';

function Instructor() {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {isLoading,isError, message  } = useSelector(
    (state) => state.instructor
  )
  const {courses,cisLoading,cisError, cmessage  } = useSelector(
    (state) => state.courses
  )

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

 
  useEffect(() => {
    
    if (isError) {
      toast.error(message)
    }
    if (cisError) {
      toast.error(cmessage)
    }

    dispatch(getCourses())

    return () =>{
      dispatch(reset())
      dispatch(resetR())
    }

},[isError,cisError,message,dispatch,cmessage])
  const onSubmit=(e)=>{
    e.preventDefault()

    togglePopup()
    
   
  }

  const onSubmittt=(e)=>{
    e.preventDefault()
    navigate('/ViewCourseTitles')
  }

  const onClick=(e)=>{
    e.preventDefault()
    navigate('/ChangePasswordPage')
  }

  const viewInstructor=(e)=>{
    e.preventDefault()
    navigate('/ViewInstructorReviewsRating')
  }

  const EditInstructor = (e)=>{
    e.preventDefault()
    navigate('/InstructorEdit')
  }
  


if (isLoading || cisLoading) {
  return <Spinner />
}


  return (
    <>
           
        <section className='form'>
          <Toggle/>
          <ChooseCountryForm/>
        </section>
        <br></br>
      <section className='form'>
       <form onSubmit={onSubmit}>
       <div className="form-group">
          <button type='submit' className='btn btn-block'>
              Create Course Page
           </button>
           {isOpen && <Popup
      content={<>
        <b>Contract</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button className='btn btn-block' onClick={e=>{ navigate('/InstructorCreateCourse')}}>Accept</button>
      </>}
      handleClose={togglePopup}
    />}
          </div>
       </form>
       <div className="form-group">
          <button type='submit' className='btn btn-block' onClick={viewInstructor}>
              View my Rate/Review
           </button>
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block' onClick={EditInstructor}>
              Edit Email/MiniBiography
           </button>
        </div>
    </section>
    <br></br>
    <section className='form'>
       <form onSubmit={onSubmittt}>
       <div className="form-group">
          <button type='submit' className='btn btn-block'>
              View Course's Rate/Reviews 
           </button>
          </div>
       </form>
       <div className="form-group">
              <button type='submit' className='btn btn-block' onClick={onClick}>
                 Change password
              </button>
      </div>
    </section>
      <br></br>
      <FilterForm/>
      <br></br>
    <section className='content'>
        {courses.length > 0 ? (
          <div className='goals'>
            {courses.map((course) => (
              <CourseItem key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <h3>Their is no availble courses</h3>
        )}
      </section>
    </>
  )
}


export default Instructor