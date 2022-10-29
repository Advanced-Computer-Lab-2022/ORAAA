

//import { useDispatch } from 'react-redux'


function CourseItem({ course }) {
  //const dispatch = useDispatch()

  return (
    <div className='goal'>
      <h4>Title:{course.title}</h4>
      <h4>Rating:{course.rating}/10</h4>
      <h4>Course Duration:{course.totalHoursOfCourse}</h4>
      <h4>Price:{course.price}</h4>
      
      
    </div>
  )
}

export default CourseItem