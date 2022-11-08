import { useState} from 'react'
import {useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  searchForCourse,generalSearchForCourse,guestGeneralSearchForCourse} from '../features/courses/courseSlice'



function SearchBarForm() {
  const {user,userType} = useSelector((state) => state.auth)
  const [text, setValue]=useState({
    keyword:'',
  
   })

  const [userTypee,setUserType]=useState('any');

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

    if(userTypee==='Instructor'){
       dispatch(searchForCourse(courseData))
    
    }else if(user){
      
      dispatch(generalSearchForCourse(courseData))
       

    }else{
      dispatch(guestGeneralSearchForCourse(courseData))
       
    }

    navigate('/searchresults')
  }

   
  
    return (
      <section className='form'>
      <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="text"></label>
         <input type="text" 
             name='keyword' 
             id='keyword' 
             value={keyword}
             placeholder='SearchBar'
            onChange={onChange}/>
      </div>
      <div className="form-group">
        <button type='submit' className='btn btn-block'>
          Search
        </button>
      </div>
      {(userType==='instructor' &&
          <div>
            <h1>{userTypee}</h1>
             <input type="radio" name="searchType" value="Instructor" onChange={e=>setUserType(e.target.value)} /> My courses
             <input type="radio" name="searchType" value="any" onChange={e=>setUserType(e.target.value)} /> All courses
          </div>
          )}
       </form>
    </section>

      )

}


export default SearchBarForm