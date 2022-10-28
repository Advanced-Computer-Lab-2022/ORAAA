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


// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  logout,
  login,
  register
}

export default authService