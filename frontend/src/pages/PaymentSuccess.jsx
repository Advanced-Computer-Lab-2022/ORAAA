import { useEffect,useRef } from 'react'
//import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { addEnrolledCourse} from '../features/auth/authSlice'

function PaymentSuccess() {

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId');
  console.log(courseId);

  const dispatch = useDispatch()
  const {isLoading, isError,message} = useSelector(
    (state) => state.auth)

   const triggered = useRef(false);

   

    useEffect(() => {
      if (isError) {
        toast.error(message)
      }

      const hasBeenTriggered = triggered.current


      if(!hasBeenTriggered){
        dispatch(addEnrolledCourse(courseId))
      triggered.current=true
      }
      
    
    }, [isError, message, dispatch,courseId])
  


  if (isLoading) {
    return <Spinner/>
  }



  return (
    <div>success</div>
  )
}

export default PaymentSuccess