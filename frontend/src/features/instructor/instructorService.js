import axios from 'axios'

const API_URL = '/api/'




//create course
const createCourse = async (courseData,token) =>{
  const config={
    headers:{
        Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL+'instructor/createCourse',courseData,config)

  return response.data

}



// selectCountry
const selectCountry = async (country,token) =>{
  const config={
    headers:{
        Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL+'common/selectCountry',country,config)

  return response.data

}





// View Intructor rating/reviews
const viewRateReview = async (token) =>{
  const config={
    headers:{
        Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL+'instructor/viewRateReview',config)

  return response.data

}


// editEmailOrMiniBio
const editEmailOrMiniBio = async (data,token) =>{
  const config={
    headers:{
        Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL+'instructor/editEmailOrMiniBio',data,config)

  return response.data

}




const instructorService= {
    createCourse,
    selectCountry,
    viewRateReview,
    editEmailOrMiniBio

}


export default instructorService