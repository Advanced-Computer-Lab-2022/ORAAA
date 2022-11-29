import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import {useDispatch} from'react-redux'
import { createCourse} from '../features/instructor/instructorSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector} from 'react-redux'

function InstructorCreateCourse() {
    const [flag, setflag]=useState(false)
    const [examflag, setexamflag]=useState(false)
    const [text, setText]=useState({
        title:'',
        price:'',
        shortSummery:'',
        subject:'',
        totalHoursOfCourse:'',
        previewLink:'',
        subTitleName:'',
        link:'',
        subTitleDesc:'',
        subTitleHours:'',
        question:'',
        answer1:'',
        answer2:'',
        answer3:'',
        answer4:'',
        rightAnswer:'',
        
        
    })
    const {title,price,shortSummery,subject,subTitle,totalHoursOfCourse,previewLink,subTitleName,link,subTitleDesc, subTitleHours,question,answer1,answer2,answer3,answer4,rightAnswer} = text

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoading,isError, message  } = useSelector(
        (state) => state.instructor
      )
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    },[isError,message])

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
            previewLink,
            subTitleName,
            link,
           subTitleDesc,
           subTitleHours,
           flag,
           question,
           answer1,
           answer2,
           answer3,
           answer4,
           rightAnswer,
           examflag
            
          }
         
          dispatch(createCourse(courseData))
          if(!flag){
            navigate('/Instructor')
          }
          if(examflag){
            setexamflag(false)
          }else{
          setflag(false)
          }
    }

    const onClick=(e)=>{
      e.preventDefault()
      setflag(true)
    }

    const onClickk=(e)=>{
      e.preventDefault()
      setexamflag(true)
    }

    if (isLoading) {
        return <Spinner />
      }

      


 if(examflag){
    return (
      <section className='form' onSubmit={onSubmit}>
      <form>
       <div className="form-group">
          <label htmlFor="text"></label>
          <input type="text" 
               name='question' 
               id='question' 
               value={question}
               placeholder='Add a question'
              onChange={onChange}/>
       </div>
       <div className="form-group">
          <label htmlFor="text"></label>
          <input type="text" 
               name='answer1' 
               id='answer1' 
               value={answer1}
               placeholder='Add first choice'
              onChange={onChange}/>
       </div>
       <div className="form-group">
          <label htmlFor="text"></label>
          <input type="text" 
               name='answer2' 
               id='answer2' 
               value={answer2}
               placeholder='Add second choice'
              onChange={onChange}/>
       </div>
       <div className="form-group">
          <label htmlFor="text"></label>
          <input type="text" 
               name='answer3' 
               id='answer3' 
               value={answer3}
               placeholder='Add third choice'
              onChange={onChange}/>
       </div>
       <div className="form-group">
          <label htmlFor="text"></label>
          <input type="text" 
               name='answer4' 
               id='answer4' 
               value={answer4}
               placeholder='Add fourth choice'
              onChange={onChange}/>
       </div>
       <div className="form-group">
          <label htmlFor="text"></label>
          <input type="text" 
               name='rightAnswer' 
               id='rightAnswer' 
               value={rightAnswer}
               placeholder='Add the right answer index 0 --> 3 respictivly'
              onChange={onChange}/>
       </div>
       <div className="form-group">
       <button type='submit' className='btn btn-block'>
            Add Exam
          </button>
       </div>
      </form>
  </section>

    )
 }else if(!flag){
  return (
    
    <section className='form'>
        <form>
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
         <button type='submit' className='btn btn-block' onClick={onClick}>
              Add subTitle
            </button>
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
            <label htmlFor="text"></label>
            <input type="text" 
                 name='previewLink' 
                 id='previewLink' 
                 value={previewLink}
                 placeholder='Add a link for a preview video to the course'
                onChange={onChange}/>
         </div>
        
          <div className="form-group">
            <button type='submit' className='btn btn-block' onClick={onSubmit}>
              Create Course
            </button>
          </div>
        </form>
    </section>
  )
}else{
  return (  
  <section className='form' onSubmit={onSubmit}>
    <form>
     <div className="form-group">
        <label htmlFor="text"></label>
       <input type="text" 
           name='subTitleName' 
           id='subTitleName' 
           value={subTitleName}
           placeholder='Add subTitleName'
          onChange={onChange}/>
   </div>
   <div className="form-group">
      <label htmlFor="text"></label>
      <input type="text" 
           name='link' 
           id='link' 
           value={link}
           placeholder='Add link'
          onChange={onChange}/>
   </div>
   <div className="form-group">
      <label htmlFor="text"></label>
      <input type="text" 
           name='subTitleDesc' 
           id='subTitleDesc' 
           value={subTitleDesc}
           placeholder='Add subTitleDesc'
          onChange={onChange}/>
   </div>
   <div className="form-group">
      <label htmlFor="text"></label>
      <input type="text" 
           name='subTitleHours' 
           id='subTitleHours' 
           value={subTitleHours}
           placeholder='Add subTitleHours'
          onChange={onChange}/>
   </div>
   <div className="form-group">
   <button type='submit' className='btn btn-block' onClick={onClickk}>
        Add an exam for the subtitle
      </button>
   </div>
   <div className="form-group">
   <button type='submit' className='btn btn-block'>
        Create subtitle
      </button>
   </div>
  </form>
</section>
)
}
}



export default InstructorCreateCourse











