import { useState} from 'react'
import {useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {searchForCourse,generalSearchForCourse,guestGeneralSearchForCourse} from '../features/courses/courseSlice'
import {reset} from '../features/instructor/instructorSlice'


function SearchBarForm() {
  const {user} = useSelector((state) => state.auth)
  const {InstructorSearchMode} = useSelector((state) => state.instructor)
  const [text, setValue]=useState({
    keyword:'',
  
   })



  const {keyword} = text
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
      keyword
    }

    if(InstructorSearchMode==='Instructor'){
       dispatch(searchForCourse(courseData))
    
    }else if(user){
      
      dispatch(generalSearchForCourse(courseData))
       

    }else{
      dispatch(guestGeneralSearchForCourse(courseData))
       
    }
    dispatch(reset())
    navigate('/searchresults')
  }

   
  
    return (
      <>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>
      
       <form className='searchBar' onSubmit={onSubmit}>
        <input type="text" 
            name='keyword' 
            id='keyword' 
            value={keyword}
            placeholder='SearchBar'
            onChange={onChange} required/>
         <button  type='submit' class="fa fa-search"/>
        
        </form>
     </>

      )

}





export default SearchBarForm