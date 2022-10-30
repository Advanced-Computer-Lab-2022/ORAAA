import axios from 'axios'

const API_URL = '/api/admin/'




//create user
const createAdmin = async (userData,token) =>{
  const config={
    headers:{
        Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL+'addAdmin',userData,config)

  return response.data

}



//create user
const createInstructor = async (userData,token) =>{
    const config={
      headers:{
          Authorization: `Bearer ${token}`
      }
    }
  
    const response = await axios.post(API_URL+'addInstructor',userData,config)
  
    return response.data
  
  }

  //create user
const createCorporateTrainee = async (userData,token) =>{
    const config={
      headers:{
          Authorization: `Bearer ${token}`
      }
    }
  
    const response = await axios.post(API_URL+'addCorporateTrainee',userData,config)
  
    return response.data
  
  }
  
  


const adminService= {
    createAdmin,
    createInstructor,
    createCorporateTrainee

}


export default adminService