import React from 'react'
import { useSelector} from 'react-redux'
import Spinner from '../components/Spinner'
import { useDispatch } from "react-redux"
import { addEnrolledCourse,refund } from '../features/auth/authSlice'
function RequestItem({request}) {

    const dispatch =useDispatch()
    const {isLoading} = useSelector(
        (state) => state.auth
      )
    const click = ()=>{
        
        const data={
            courseId:request.courseId,
            studentId:request.studentId
        }
        if(request.type==='access'){
        dispatch(addEnrolledCourse(data))
        }else{
          dispatch(refund(data))
        }

   
    }

    if(isLoading){
        return <Spinner />
    }

    return (
          
        <div className='goal'> 
            <h4>{request.studentName} has requested to regester in {request.courseTitle}</h4>
            <div className="form-group">
            <button type='submit' className='btn btn-block' onClick={click} key={request._id}>
              Approve Request
            </button>
            </div>     
        </div>
      
    )
  }

export default RequestItem