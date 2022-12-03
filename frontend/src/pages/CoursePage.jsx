import '../sideBar.css'
import {useSelector} from 'react-redux'

import Spinner from '../components/Spinner'
import {RateCourse,getSubTitleExam} from '../features/courses/courseSlice'
import {RateInstructor} from '../features/auth/authSlice'
import {useState} from 'react';
import {useDispatch} from 'react-redux'


function CoursePage() {

    
    const dispatch = useDispatch()
    
    const {subTitles,selectedCourse,isLoading,Exams} = useSelector(
        (state) => state.courses
      )

      const {RateInstructorIsLoading} = useSelector(
        (state) => state.auth
      )  

    const [text, setValue]=useState({
         rating:'',
         review:'',
         instructorRate:'',
         instructorReview:''

      })

      const [gotRight, setGotRight]=useState(0)

      const [selectedSubTitle, setselectedSubTitle]=useState()

      const [subTitleflag, setSubTitleFlag]=useState(false)

      const [answer,setAnswer]=useState();

      

    const {rating,review,instructorRate,instructorReview} = text


      const onChange=(e) =>{
        setValue((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
      
        }))
      }


   const onClick = (e) => {

    e.preventDefault()

    const info = {
      rating,
      courseId:selectedCourse._id,
      review    
    }
   dispatch(RateCourse(info))
  }

  const InstructorR = (e) =>{
    e.preventDefault()

    const info = {
        instructorRate,
        instructorId:selectedCourse.instructorId,
        instructorReview    
      }
     dispatch(RateInstructor(info))
  }

 

  const main = (e) =>{
    e.preventDefault()
    setSubTitleFlag(false)
  }


      if (!selectedCourse || !subTitles || isLoading || RateInstructorIsLoading) {
        return <Spinner />
      }
  return (
    <>
    <section>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
  

    <div class="wrapper">
       
      <div class="sidebar">
           <ul>
                <li>
                <button type='submit' className='btn btn-block' onClick={main}>
                       Main Page
                     </button>
                </li>
                <li>      
                     {subTitles.map((subTitle) => (
                       <button type='submit' className='btn btn-block' key={subTitle} onClick={(e)=>{
                        e.preventDefault()
                        setselectedSubTitle(subTitle)
                        dispatch(getSubTitleExam(subTitle._id))
                        setSubTitleFlag(true)
                    
                       }}>
                       {subTitle.subTitleName}
                      < br/>
                       subTitleHours: {subTitle.subTitleHours}
                     </button>
                     ))}
                </li>    
            </ul>
        </div>

    </div>
  
   
    </section>
    {!subTitleflag ?(
    <section className='form'>
          <div className="form-group">
            <h1>{selectedCourse.title}</h1>
          </div>
          <div className="form-group">   
             <iframe title="PreviewVideo" width="500" height="320" src={selectedCourse.previewLink}>
             </iframe>
            </div>
            <h2>Rate Course:</h2>
            <div className="form-group">
             <label htmlFor="text"></label>
             <input type="text" 
                 name='rating' 
                 id='rating' 
                 value={rating}
                 placeholder='Rate the course 1 --> 10'
                onChange={onChange}/>
          </div>
          <div className="form-group">
             <label htmlFor="text"></label>
             <input type="text" 
                 name='review' 
                 id='review' 
                 value={review}
                 placeholder='Add a Review to the course(Optional)'
                onChange={onChange}/>
          </div>
          <div className="form-group">
                <button type='submit' className='btn btn-block' onClick={onClick} key={selectedCourse._id}>
                     Rate course
                </button>
          </div>
          <h2>Rate Instructor:</h2>
            <div className="form-group">
             <label htmlFor="text"></label>
             <input type="text" 
                 name='instructorRate' 
                 id='instructorRate' 
                 value={instructorRate}
                 placeholder='Rate Instructor from 1 --> 10'
                onChange={onChange}/>
          </div>
          <div className="form-group">
             <label htmlFor="text"></label>
             <input type="text" 
                 name='instructorReview' 
                 id='instructorReview' 
                 value={instructorReview}
                 placeholder='Add a Review(Optional)'
                onChange={onChange}/>
          </div>
          <div className="form-group">
                <button type='submit' className='btn btn-block' onClick={InstructorR} key={selectedCourse.instructorId}>
                     Rate Instructor
                </button>
          </div>
    </section>
   ):
   (
    <section className='form'>
    <div className="form-group">
      <h1>{selectedSubTitle.subTitleName}</h1>
    </div>
    <div className="form-group">   
       <iframe title="subTitleVideo" width="500" height="320" src={selectedSubTitle.link}>
       </iframe>
      </div>
         {Exams.map((exam) => (
                  <div className="form-group">
                      <div className='radio'>
                      <p>Q:{exam.question}?</p>
                      <br/>
                          <ol>
                      {exam.answers.map((answer)=>(
                        
                            <li>
                              <label className='radioContainer'>{answer}
                              <input type="radio" name="radioContainer" value={answer} onChange={e=>setAnswer(e.target.value)}/>
                              <span className='checkmark'></span>
                              </label>
                             </li>
                        
                       ))}
                         </ol>
                       </div>
                       <button type='submit' className='btn btn-block' onClick={(e)=>{
                        e.preventDefault()
                        if(answer===exam.answers[exam.rightAnswer]){
                          setGotRight((prevState)=>prevState+1)
                        }else{
                          window.alert("Wrong Answer\nRight Answer: "+exam.answers[exam.rightAnswer]);
                        }

                       }}>
                         submit
                       </button>
                       <div className='line'><p>-----------------------------------------------------------------------------------------------------------------------------</p></div>
                  </div>
               ))}
            <h2>Exam Grade:{gotRight}/{Exams.length}</h2>
      </section>

   )}
    </>

  )
}

export default CoursePage
















