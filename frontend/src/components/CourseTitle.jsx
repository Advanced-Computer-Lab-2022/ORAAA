
function CourseTitle({ course }) {


  return (
          
      <div className='goal'> 
         <h4>Title:{course.title}</h4>
         <h4>Course Rating:{course.rating}/10</h4>
         <h4>Reviews:</h4>
         <ol>
         {course.review.map((reviews) => (
             <li>
                - {reviews}.
              </li>
            ))}

        </ol>
          
      </div>
    
  )
}

export default CourseTitle