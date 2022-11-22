import {useState} from 'react'
import {useDispatch} from'react-redux'
import {createAdmin, createInstructor,createCorporateTrainee} from '../features/admin/adminSlice'
function AdminForm() {
    const [text, setText]=useState({
        userName:'',
        password:'',
        
    })
    const {userName,password} = text
    const [userType,setUserType]=useState();

    const dispatch = useDispatch()

    const onChange=(e) =>{
        setText((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
      
        }))
      }
      
    const onSubmit=(e)=>{
        e.preventDefault()

        const userData = {
            userName,
            password
          }
         if(userType==='Admin'){
          dispatch(createAdmin(userData))
         }else if(userType==='Instructor') {
            dispatch(createInstructor(userData))
         } else if(userType==='CorporateTrainee'){
            dispatch(createCorporateTrainee(userData))
         }
    }
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
         <div className="form-group">
            <label htmlFor="text"></label>
            <input type="text" 
                 name='userName' 
                 id='userName' 
                 value={userName}
                 placeholder='Add userName'
                onChange={onChange}/>
         </div>
         <div className="form-group">
            <label htmlFor="text"></label>
            <input type="text" 
                 name='password' 
                 id='password' 
                 value={password}
                 placeholder='Add password'
                onChange={onChange}/>
         </div>
         <div className='radio'>
            <h1>{userType}</h1>
             <input type="radio" name="userType" value="Admin" onChange={e=>setUserType(e.target.value)} /> Admin
             <input type="radio" name="userType" value="Instructor" onChange={e=>setUserType(e.target.value)} /> Instructor
             <input type="radio" name="userType" value="CorporateTrainee" onChange={e=>setUserType(e.target.value)} /> CorporateTrainee
             
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

export default AdminForm