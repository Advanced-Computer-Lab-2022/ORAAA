import {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import {getCourseInfo,getCourse,payForCourse,getProgress} from '../features/courses/courseSlice'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function CourseItem({ course }) {
  const navigate=useNavigate()
  const dispatch = useDispatch()

  const {user,userType} = useSelector((state) => state.auth)
  const [isHovering, setIsHovering] = useState(false)


  



  const {isLoading,isError, message} = useSelector(
    (state) => state.courses
  )

  
 
  useEffect(() => {
    
    if (isError) {
      toast.error(message)
    }

 
   

},[isError,message])




  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };



  const open = (e)=>{
    e.preventDefault()
    
    const Id={
       courseId:course._id
    }
    dispatch(getCourse(Id))
    dispatch(getCourseInfo(course._id))
    dispatch(getProgress(course._id))
    navigate('/CoursePage')
    

  }

  const pay = (e)=>{
    e.preventDefault()
    
    const Id={
       courseId:course._id
    }
    dispatch(payForCourse(Id))
    

  }

  if (isLoading) {
    return <Spinner />
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
            <div className="form-group">   
             <h4>Subject:{course.subject}</h4>
             <h4>CourseOutline:{course.shortSummery}</h4>
            <iframe title="PreviewVideo" width="500" height="320" src={course.previewLink}>
            </iframe>
           </div>
         )}
         {user && userType!=='instructor' && (
       <form>
          <div className="form-group">
            <button type='submit' className='btn btn-block' onClick={open} key={course._id}>
              open Course
            </button>
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block' onClick={pay} key={course._id}>
              Pay for course
            </button>
          </div>
       </form>
       )}
      </div>
    </div>
  )
}

export default CourseItem