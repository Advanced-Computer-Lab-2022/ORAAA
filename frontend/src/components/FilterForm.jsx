import {useDispatch} from'react-redux'
import { useNavigate } from 'react-router-dom'
import { filterCourse,guestFilterCourse} from '../features/courses/courseSlice'
import { useState} from 'react'

function FilterForm() {

    const [text, setValue]=useState({
        price:'',
        subject:'',
        rating:'',
      
    })
    const {price,subject,rating} = text

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const [check, setCheck] = useState(false);

     const u =  JSON.parse(window.localStorage.getItem('user'));
     const type = () =>{
        if(!u){
           setCheck(true);
        }else if(u.typee==="corporateTrainee"){
         setCheck(false);
       }else{
         setCheck(true);
       }
 
}


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
        if(u){
        dispatch(filterCourse(courseData))
        }else{
            dispatch(guestFilterCourse(courseData))
        }

        if(!u){
            navigate('/searchresults')
        }else if(u.typee==="corporateTrainee"){
            navigate('/CorporateFilterResult')
        }else{
          navigate('/searchresults')
        }
        
      }
  return (
 <>
    <section className='form' onMouseMove={type}>
       <form onSubmit={onSubmit}>
        {(check && 
         <div className="form-group">
          <label htmlFor="text"></label>
           <input type="text" 
            name='price' 
            id='price' 
            value={price}
            placeholder='Enter Price'
            onChange={onChange}/>
          </div>
          )}
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