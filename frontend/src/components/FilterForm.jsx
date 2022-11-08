import {useDispatch,useSelector} from'react-redux'
import { useNavigate } from 'react-router-dom'
import { filterCourse,guestFilterCourse} from '../features/courses/courseSlice'
import { useState} from 'react'

function FilterForm() {
    const {user,userType} = useSelector((state) => state.auth)
    const [text, setValue]=useState({
        price:'',
        subject:'',
        rating:'',
      
    })
    const {price,subject,rating} = text

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const onChange=(e) =>{
        setValue((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
      
        }))
      }

    const onSubmit=(e)=>{
        e.preventDefault()
      
        const courseData = {
          price,
          subject,
          rating
        }
        if(user){
            dispatch(filterCourse(courseData))
        }else{
            dispatch(guestFilterCourse(courseData))
        }

         navigate('/searchresults')
        
      }
  return (
 <>
    <section className='form'>
       <form onSubmit={onSubmit}>
        {userType!=='corporateTrainee' && 
         <div className="form-group">
          <label htmlFor="text"></label>
           <input type="text" 
            name='price' 
            id='price' 
            value={price}
            placeholder='Enter Price'
            onChange={onChange}/>
          </div>
          }
          <div className="form-group">
          <label htmlFor="text"></label>
           <input type="text" 
            name='subject' 
            id='subject' 
            value={subject}
            placeholder='Enter subject'
            onChange={onChange}/>
          </div>
          <div className="form-group">
          <label htmlFor="text"></label>
           <input type="text" 
            name='rating' 
            id='rating' 
            value={rating}
            placeholder='Enter Rating'
            onChange={onChange}/>
          </div>
          <div className="form-group">
              <button type='submit' className='btn btn-block'>
                 Filter
              </button>
          </div>
     </form>
    </section>
 </>
  )
}

export default FilterForm