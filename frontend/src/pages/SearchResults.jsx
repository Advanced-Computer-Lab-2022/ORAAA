import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CourseItem from '../components/CourseItem'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'


function SearchResults() {
  const dispatch = useDispatch()
  const { courses, isError, message } = useSelector(
    (state) => state.courses)

    useEffect(() => {
      if (isError) {
        toast.error(message)
        
      }

      
        
      

    }, [isError, message, dispatch])
  
  

  if (courses.length===0) {
    if(isError){
      return  <h3>{message}</h3>
    }else{
    return <Spinner/>
    }
  }

  return (
    <>
      <section className='content'>
        {courses.length > 0 ? (
          <div className='goals'>
            {courses.map((course) => (
              <CourseItem key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <h3>Course Not Found</h3>
        )}
      </section>
      
      

      
    </>
  )
}

export default SearchResults