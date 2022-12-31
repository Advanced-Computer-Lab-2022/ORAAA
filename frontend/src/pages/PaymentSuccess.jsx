import { useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { addEnrolledCourse,reset} from '../features/auth/authSlice'
import { toast } from 'react-toastify'


function PaymentSuccess() {

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId');
  console.log(courseId);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoading, isError,message} = useSelector(
    (state) => state.auth)

   const triggered = useRef(false);
   toast.done('Payment Successful')
   

    useEffect(() => {


      const hasBeenTriggered = triggered.current


      if(!hasBeenTriggered){
        dispatch(addEnrolledCourse(courseId))
        triggered.current=true
      }
      
    
    }, [isError, message, dispatch,courseId])
  


  if (isLoading) {
    return <Spinner/>
  }


  const back = (e)=>{
    e.preventDefault()
    dispatch(reset())
    navigate('/mainIndividualTrainee')
    
 
    

  }



  return (
    <div className="form-group">
            <button type='submit' className='btn btn-block' onClick={back}>
              Home Page
            </button>
          </div>
  )
}

export default PaymentSuccess