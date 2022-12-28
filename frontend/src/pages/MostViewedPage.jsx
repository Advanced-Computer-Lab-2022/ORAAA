import CourseItem from '../components/CourseItem'
import { useSelector} from 'react-redux'
import Spinner from '../components/Spinner'

function MostViewedPage() {

    var {courses,isLoading} = useSelector(
        (state) => state.courses
      )

  if (isLoading || courses.length===0) {
    return <Spinner/>
  }
 
  return (
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
  )
    
}

export default MostViewedPage