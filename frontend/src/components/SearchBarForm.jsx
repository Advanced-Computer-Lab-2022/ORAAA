import { useState} from 'react'
import {useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  searchForCourse,generalSearchForCourse,guestGeneralSearchForCourse} from '../features/courses/courseSlice'



function SearchBarForm() {
  const [text, setValue]=useState({
    keyword:'',
  
})

const [userType,setUserType]=useState();

  const {keyword} = text
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [check, setCheck] = useState(false);

  const u =  JSON.parse(window.localStorage.getItem('user'));

const type = () =>{
  if(u.typee==="instructor"){
    setCheck(true);
  }else{
    setCheck(false);
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
      keyword
    }
    if(userType==='Instructor'){
    dispatch(searchForCourse(courseData))
    navigate('/searchresults')
    }else if(u){
      
      dispatch(generalSearchForCourse(courseData))
       navigate('/searchresults')

    }else{
      dispatch(guestGeneralSearchForCourse(courseData))
       navigate('/searchresults')
    }
  }


  
    return (
      <section className='form' onMouseMove={type}>
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
      {(check &&
          <div>
            <h1>{userType}</h1>
             <input type="radio" name="searchType" value="Instructor" onChange={e=>setUserType(e.target.value)} /> My courses
             <input type="radio" name="searchType" value="any" onChange={e=>setUserType(e.target.value)} /> All courses
          </div>
          )}
       </form>
    </section>

      )

}


export default SearchBarForm