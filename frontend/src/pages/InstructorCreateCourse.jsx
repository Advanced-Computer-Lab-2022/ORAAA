
import {useState} from 'react'
import {useDispatch} from'react-redux'
import { createCourse } from '../features/instructor/instructorSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector} from 'react-redux'

function InstructorCreateCourse() {
    const [text, setText]=useState({
        title:'',
        price:'',
        shortSummery:'',
        subject:'',
        subTitle:'',
        totalHoursOfCourse:'',
        
        
    })
    const {title,price,shortSummery,subject,subTitle,totalHoursOfCourse} = text
    

    const dispatch = useDispatch()

    const {isLoading,isError, message  } = useSelector(
        (state) => state.instructor
      )
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    })

    const onChange=(e) =>{
        setText((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
      
        }))
      }
      
    const onSubmit=(e)=>{
        e.preventDefault()

        const courseData = {
            title,
            price,
            shortSummery,
            subject,
            subTitle,
            totalHoursOfCourse,
            
          }
         
          dispatch(createCourse(courseData))
        
    }

 

    if (isLoading) {
        return <Spinner />
      }

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
         <div className="form-group">
            <label htmlFor="text"></label>
            <input type="text" 
                 name='title' 
                 id='title' 
                 value={title}
                 placeholder='Add title'
                onChange={onChange}/>
         </div>
         <div className="form-group">
            <label htmlFor="text"></label>
            <input type="text" 
                 name='price' 
                 id='price' 
                 value={price}
                 placeholder='Add price'
                onChange={onChange}/>
         </div>
         <div className="form-group">
            <label htmlFor="text"></label>
            <input type="text" 
                 name='shortSummery' 
                 id='shortSummery' 
                 value={shortSummery}
                 placeholder='Add shortSummery'
                onChange={onChange}/>
         </div>
         <div className="form-group">
            <label htmlFor="text"></label>
            <input type="text" 
                 name='subject' 
                 id='subject' 
                 value={subject}
                 placeholder='Add subject'
                onChange={onChange}/>
         </div>
         <div className="form-group">
            <label htmlFor="text"></label>
            <input type="text" 
                 name='subTitle' 
                 id='subTitle' 
                 value={subTitle}
                 placeholder='Add subTitle'
                onChange={onChange}/>
         </div>
         <div className="form-group">
            <label htmlFor="text"></label>
            <input type="text" 
                 name='totalHoursOfCourse' 
                 id='totalHoursOfCourse' 
                 value={totalHoursOfCourse}
                 placeholder='Add totalHoursOfCourse'
                onChange={onChange}/>
         </div>
        
          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              Create User
            </button>
          </div>
        </form>
    </section>
  )
}



export default InstructorCreateCourse











