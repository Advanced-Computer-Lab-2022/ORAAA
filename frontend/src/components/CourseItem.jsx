import {useState} from 'react';
import {useSelector} from 'react-redux'

function CourseItem({ course }) {
  

  const {userType} = useSelector((state) => state.auth)
  const [isHovering, setIsHovering] = useState(false);



  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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
             <h4>SubTitle:{course.subTitle}</h4>
             <h4>SubTitle Duration:{course.totalHoursOfEachSubtitle}</h4>
             <h4>ShortSummery:{course.shortSummery}</h4>
           </div>
         )}
      </div>
    </div>
  )
}

export default CourseItem