import {useDispatch} from'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSortedCourses} from '../features/courses/courseSlice'

function MostViewed() {
    

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(getSortedCourses())
        navigate('/MostViewedPage')
        
      }

  return (
 <>
    <section className='form'>
       <form onSubmit={onSubmit}>
          <div className="form-group">
              <button type='submit' className='btn btn-block'>
                 Filter Based on most Viewed
              </button>
          </div>
     </form>
    </section>
 </>
  )
}
export default MostViewed