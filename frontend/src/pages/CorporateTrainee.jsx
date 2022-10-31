import SearchBarForm from '../components/SearchBarForm'
import ChooseCountryForm from '../components/ChooseCountryForm'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector} from 'react-redux'
import {useDispatch} from'react-redux'
import {getCourses,reset } from '../features/courses/courseSlice'
import CorporateCourseItem from '../components/CorporateCourseItem'
import FilterForm from '../components/FilterForm'


function CorporateTrainee() {


  
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


if (isLoading || cisLoading) {
  return <Spinner />
}

  return (
    <>
     <section className="heading">
        <SearchBarForm/>
     </section>
      <br></br>
      <section className='form'>
          <ChooseCountryForm/>
        </section>
        <br></br>
      <FilterForm/>
      <br></br>
    <section className='content'>
        {courses.length > 0 ? (
          <div className='goals'>
            {courses.map((course) => (
              <CorporateCourseItem key={course._id} course={course} />
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







