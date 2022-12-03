import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InstructorR from '../components/InstructorR'
import Spinner from '../components/Spinner'
import { viewRateReview, reset} from '../features/instructor/instructorSlice'


function ViewInstructorReviewsRating() {
    const dispatch = useDispatch()
    const { InstructorRR, isLoading, isError, message } = useSelector(
      (state) => state.instructor)
  
      useEffect(() => {
        if (isError) {
          console.log(message)
        }
      
        
        dispatch(viewRateReview())
        
        
  
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
          {InstructorRR.length > 0 ? (
            <div className='goals'>
              {InstructorRR.map((instructor) => (
                <InstructorR key={instructor._id} instructor={instructor} />
              ))}
            </div>
          ) : (
            <h3>No rates/Reviews</h3>
          )}
        </section>
        
        
  
        
      </>
    )
}

export default ViewInstructorReviewsRating