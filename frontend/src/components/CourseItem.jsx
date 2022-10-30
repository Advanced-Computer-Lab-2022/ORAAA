import {useState} from 'react';

//import { useDispatch } from 'react-redux'


function CourseItem({ course }) {
  //const dispatch = useDispatch()
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
         <h4>Price:{course.price}</h4>
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