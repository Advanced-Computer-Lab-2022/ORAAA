import {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import {RateCourse,getCourses,reset} from '../features/courses/courseSlice'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'

function CourseItem({ course }) {
  
  const dispatch = useDispatch()
  const {userType} = useSelector((state) => state.auth)
  const [isHovering, setIsHovering] = useState(false)
  
  const [text, setValue]=useState({
    rating:'',
  
})

  const {rating} = text
  const {isLoading,isError, message ,lastRate } = useSelector(
    (state) => state.courses
  )


 
  useEffect(() => {
    
    if (isError) {
      toast.error(message)
    }

    

},[isError,message])


  const onChange=(e) =>{
    setValue((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
  
    }))
  }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const onClick = (e) => {

    e.preventDefault()
     
    
    console.log(course._id)
   
    
    
    const info = {
      rating,
      courseId:course._id    
    }

   dispatch(RateCourse(info))
 
   

  }

  if (isLoading) {
    return <Spinner />
  }
  
  if(lastRate!==''){
    dispatch(reset())
    dispatch(getCourses())
   }


  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          
      <div className='goal'> 
         <h4>Title:{course.title}</h4>
         <h4>Rating:{course.rating}/10</h4>
         <h4>Course Duration:{course.totalHoursOfCourse}</h4>
         {userType!=='corporateTrainee' && 
          <h4>Price:{course.price}</h4>
         } 
         {isHovering && (
           <div>
             <h4>Subject:{course.subject}</h4>
             <h4>ShortSummery:{course.shortSummery}</h4>
           </div>
         )}
       <form>
           <div className="form-group">
             <label htmlFor="text"></label>
             <input type="text" 
                 name='rating' 
                 id='rating' 
                 value={rating}
                 placeholder='Rate the course 1 --> 10'
                onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block' onClick={onClick} key={course._id}>
              Rate course
            </button>
          </div>
       </form>
      </div>
    </div>
  )
}

export default CourseItem