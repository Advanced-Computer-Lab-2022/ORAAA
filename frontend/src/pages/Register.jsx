import {useState,useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Popup from '../components/Popup';


function Register() {
    
  const [formData, setFormData]=useState({
     userName:'',
     firstName:'',
     lastName:'',
     email:'',
     password:'',
     password2:'',
     gender:'',
     country:'',
  })

 const {userName,firstName,lastName,email,password,password2,gender,country} = formData

 const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const {user,isLoading, isError,isSuccess,message} = useSelector((state) => state.auth) 

 useEffect(() => {
  if (isError) {
    toast.error(message)
  }

  if (isSuccess || user) {
    navigate('/mainIndividualTrainee')
  }

  dispatch(reset())
}, [user, isError, isSuccess, message, navigate, dispatch])


  
const onChange=(e) =>{
  setFormData((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value

  }))
}

const onSubmit=(e) =>{
   e.preventDefault()
   togglePopup()

}

if (isLoading) {
  return <Spinner />
}




  return (
    <>
    <section className="heading">
     <h1>
      <FaUser /> Register
     </h1>
     <p>Please craete an account</p>
    </section>


    <section className='form'>
      <form onSubmit={onSubmit}>
      {isOpen && <Popup
      content={<>
        <b>Contract</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button className='btn btn-block' onClick={(e)=>{
          e.preventDefault()
          if(password !== password2){
             toast.error('Passwords do not match')
          }else{
           const userData = {
           userName,
           firstName,
           lastName,
           email,
           gender,
           country,
           password
         }
          dispatch(register(userData))
           }}}>Accept
        </button>
      </>}
      handleClose={togglePopup}
    />}
        <div className="form-group">
               <input type='text' 
               className='form-control' 
               id='userName' 
               name='userName' 
               value={userName} 
               placeholder='Enter your userName' 
               onChange={onChange} />
          </div>
          <div className="form-group">
               <input type='text' 
               className='form-control' 
               id='firstName' 
               name='firstName' 
               value={firstName} 
               placeholder='Enter your firstName' 
               onChange={onChange} />
          </div>
          <div className="form-group">
               <input type='text' 
               className='form-control' 
               id='lastName' 
               name='lastName' 
               value={lastName} 
               placeholder='Enter your lastName' 
               onChange={onChange} />
          </div>
          <div className="form-group">
               <input type='text' 
               className='form-control' 
               id='email' 
               name='email' 
               value={email} 
               placeholder='Enter your email' 
               onChange={onChange} />
          </div>
          <div className="form-group">
               <input type='text' 
               className='form-control' 
               id='gender' 
               name='gender' 
               value={gender} 
               placeholder='Enter your gender' 
               onChange={onChange} />
          </div>
          <div className="form-group">
               <input type='text' 
               className='form-control' 
               id='country' 
               name='country' 
               value={country} 
               placeholder='Enter your country' 
               onChange={onChange} />
          </div>
          <div className="form-group">
               <input type='text' 
               className='form-control' 
               id='password' 
               name='password' 
               value={password} 
               placeholder='Enter your password' 
               onChange={onChange} />
          </div>
          <div className="form-group">
               <input type='text' 
               className='form-control' 
               id='password2' 
               name='password2' 
               value={password2} 
               placeholder='Confirm your password' 
               onChange={onChange} />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              Create Account
            </button>
          </div>
      </form>
   

    </section>
    </>
  )
}

export default Register