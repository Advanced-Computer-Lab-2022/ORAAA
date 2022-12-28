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

 const courseId ={
  courseId:Data
 }

 const response = await axios.put('api/common/addEnrolledCourse',courseId,config)

 
 return response.data

}



  








// Logout user
const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('InstructorAcc')
}

const authService = {
  logout,
  login,
  register,
  changePassword,
  RateInstructor,
  forgotPassword,
  changePasswordF,
  addEnrolledCourse
}

export default authService