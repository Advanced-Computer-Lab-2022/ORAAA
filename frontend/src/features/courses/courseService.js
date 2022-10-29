import axios from 'axios'

const API_URL = '/api/'




// Get user goals
const getCourses = async () => {
   
    const response = await axios.get(API_URL+'viewCourses')
  
    return response.data
  }



  const CourseService = {
    getCourses,
    
  }
  
  export default CourseService