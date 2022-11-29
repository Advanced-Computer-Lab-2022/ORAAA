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
  








// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  logout,
  login,
  register,
  changePassword
}

export default authService