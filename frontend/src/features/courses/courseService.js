import axios from 'axios'

const API_URL = '/api/'
















// Get all courses
const getCourses = async () => {
   
    const response = await axios.get(API_URL+'chooseCourseToView')
  
    return response.data
  }



  //get all instructer course title
const getinstructerCoursesTitle = async (token) => {
  const config={
    headers:{
        Authorization: `Bearer ${token}`
    }
  }
   
  const response = await axios.get(API_URL+'instructor/getCourseTitle',config)

  return response.data
}


  // search for courses
  const searchForCourse = async (courseData) => {
  var qs = require('qs');
  var data = qs.stringify({
    'keyword': `${courseData}`  
  });
  var config = {
    method: 'get',
    url: 'http://localhost:4000/api/searchForCourses',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    
    window.localStorage.setItem('courses',JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

}
  

  

  

  



  const CourseService = {
    getCourses,
    searchForCourse,
    getinstructerCoursesTitle
    
  }
  
  export default CourseService