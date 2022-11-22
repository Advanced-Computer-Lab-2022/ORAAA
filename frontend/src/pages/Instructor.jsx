import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import CourseItem from '../components/CourseItem'
import {useDispatch} from'react-redux'
import { getCourses,reset} from '../features/courses/courseSlice'
import ChooseCountryForm from '../components/ChooseCountryForm'
import FilterForm from '../components/FilterForm'
import Toggle from '../components/Toggle'

function Instructor() {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {isLoading,isError, message  } = useSelector(
    (state) => state.instructor
  )
  const {courses,cisLoading,cisError, cmessage  } = useSelector(
    (state) => state.courses
  )
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
    }

},[isError,cisError,message,dispatch,cmessage])
  const onSubmit=(e)=>{
    e.preventDefault()
    
    navigate('/InstructorCreateCourse')
  }

  const onSubmittt=(e)=>{
    e.preventDefault()
    navigate('/ViewCourseTitles')
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
          </div>
       </form>
    </section>
    <br></br>
    <section className='form'>
       <form onSubmit={onSubmittt}>
       <div className="form-group">
          <button type='submit' className='btn btn-block'>
              View instructor's CourseTitle
           </button>
          </div>
       </form>
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