import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { reset} from '../features/courses/courseSlice'
import { toast } from 'react-toastify'
import CorporateCourseItem from '../components/CorporateCourseItem'

function CorporateFilterResult() {
  const dispatch = useDispatch()
  const { courses, isLoading, isError, message } = useSelector(
    (state) => state.courses)

    useEffect(() => {
      if (isError) {
        toast.error(message)
    
      }

      
        
      

      return () => {
        dispatch(reset())
      }
    }, [isError, message, dispatch])
  


  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className='content'>
        {courses.length > 0 ? (
          <div className='goals'>
            {courses.map((course) => (
              <CorporateCourseItem key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <h3>Course Not Found</h3>
        )}
      </section>
      
      

      
    </>
  )
}

export default CorporateFilterResult