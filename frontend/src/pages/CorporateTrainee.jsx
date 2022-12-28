import ChooseCountryForm from '../components/ChooseCountryForm'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector} from 'react-redux'
import {useDispatch} from'react-redux'
import {useNavigate } from 'react-router-dom'
import {getCourses,reset,resetOpenedCourse } from '../features/courses/courseSlice'
import CourseItem from '../components/CourseItem'
import FilterForm from '../components/FilterForm'
import MostViewed from '../components/MostViewed'


function CorporateTrainee() {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {isLoading,isError, message  } = useSelector(
    (state) => state.instructor
  )
  const {courses,courseLoading,cisError, cmessage  } = useSelector(
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
      dispatch(resetOpenedCourse())
    }

},[isError,cisError,message,dispatch,cmessage])

const onClick=(e)=>{
  e.preventDefault()
  navigate('/ChangePasswordPage')
}

if (isLoading || courseLoading) {
  return <Spinner />
}

  return (
    <>
      <section className='form'>
          <ChooseCountryForm/>
          <div className="form-group">
              <button type='submit' className='btn btn-block' onClick={onClick}>
                 Change password
              </button>
          </div>
        </section>
        <br></br>
      <FilterForm/>
      <MostViewed/>
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

export default CorporateTrainee







