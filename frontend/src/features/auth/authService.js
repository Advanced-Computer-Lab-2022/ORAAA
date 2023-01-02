import axios from 'axios'

const API_URL = '/api/'

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'signup', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}



// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'common/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data)) 
  }

  return response.data
}

 // change password
 const changePassword = async (Data,token) => {
  const config={
    headers:{
       Authorization: `Bearer ${token}`
   },
 }

 const response = await axios.put(API_URL +'common/changePassword',Data,config)
 
 return response.data

}


 // rate Instructor
 const RateInstructor = async (instructorData,instructorId,token) => {
  const config={
    headers:{
       Authorization: `Bearer ${token}`
   },
 }

 const response = await axios.put(`/api/common/rateInstructor?instructorId=${instructorId}`,instructorData,config)
 
 return response.data

}

 //forgot Password
 const forgotPassword = async (username) => {
 

 const response = await axios.post(API_URL+'common/forgotPassword',username)

 if (response.data) {
  localStorage.setItem('changePasswordId', JSON.stringify(response.data)) 
}
 
 return response.data

}


 // change password if forgotten
 const changePasswordF = async (Data) => {

  const changePasswordId = JSON.parse(localStorage.getItem('changePasswordId'))

 const response = await axios.put(`api/common/changePasswordF?userId=${changePasswordId}`,Data)

 if(response.data){
  localStorage.removeItem('changePasswordId')
 }
 
 return response.data

}



 // adds course to student 
 const addEnrolledCourse = async (Data,token) => {

  const config={
    headers:{
       Authorization: `Bearer ${token}`
   },
 }

 const data ={
  courseId:Data.courseId,
  studentId:Data.studentId?Data.studentId:'',
 }

 const response = await axios.put('api/common/addEnrolledCourse',data,config)

 if(Data.studentId!=='' && response.data!=='Done'){
    localStorage.removeItem('Adminrequests')
    localStorage.setItem('Adminrequests', JSON.stringify(response.data)) 
    window.location.reload();
 }

 
 return response.data

}




//updates the enrolled courses after pay/requsting access
 const updateEnrolled = async (token) => {

  const config={
    headers:{
       Authorization: `Bearer ${token}`
   },
 }

 const response = await axios.get('api/common/updateEnrolled',config)

 if(response.data){
  const user = JSON.parse(localStorage.getItem('user'))
  user.enrolled = response.data.enrolled
  localStorage.removeItem('user')
  localStorage.setItem('user', JSON.stringify(user)) 
  window.location.reload();
 }
 
 return response.data

}




  
//get wallet
const getWallet = async (token) => {

  const config={
    headers:{
       Authorization: `Bearer ${token}`
   },
 }

 const response = await axios.get('api/common/getWallet',config)
 
 return response.data

}








// Logout user
const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('InstructorAcc')
  localStorage.removeItem('Adminrequests')
}

const authService = {
  logout,
  login,
  register,
  changePassword,
  RateInstructor,
  forgotPassword,
  changePasswordF,
  addEnrolledCourse,
  updateEnrolled,
  getWallet
}

export default authService