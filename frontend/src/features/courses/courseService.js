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
  const searchForCourse = async (courseData,token) => {
     const config={
       headers:{
          Authorization: `Bearer ${token}`
      },
    }
     
    const response = await axios.post(API_URL+'instructor/searchInstructorCourses',courseData,config)
  
    return response.data
  
}


  // generalSearchForCourse for courses
  const generalSearchForCourse = async (courseData,token) => {
    const config={
      headers:{
         Authorization: `Bearer ${token}`
     },
   }
    
   const response = await axios.post(API_URL+'common/searchForCourses',courseData,config)
 
   return response.data
 
}



// guestGeneralSearchForCourse for courses
const guestGeneralSearchForCourse = async (courseData) => {
 
 const response = await axios.post(API_URL+'searchForCourses',courseData)

 return response.data

}




  // generalfilter courses
  const filterCourse = async (courseData,token) => {
    const config={
      headers:{
         Authorization: `Bearer ${token}`
     },
   }
    
   const response = await axios.post(API_URL+'common/filterCourses',courseData,config)
 
   return response.data
 
}


  // guestFilterCourse 
  const guestFilterCourse = async (courseData) => {
  
    
   const response = await axios.post(API_URL+'/filterCourses',courseData)
 
   return response.data
 
}


  // generalfilter courses
  const InsFilterCourse = async (courseData,token) => {
    const config={
      headers:{
         Authorization: `Bearer ${token}`
     },
   }
    
   const response = await axios.post(API_URL+'instructor/filterCourses',courseData,config)
 
   return response.data
 
}


 // generalfilter courses
 const RateCourse = async (courseData,courseId,token) => {
  const config={
    headers:{
       Authorization: `Bearer ${token}`
   },
 }

 const response = await axios.put(`/api/common/rateCourses?courseId=${courseId}`,courseData,config)
 
 return response.data

}
  

  

  

  



  const CourseService = {
    getCourses,
    searchForCourse,
    getinstructerCoursesTitle,
    generalSearchForCourse,
    guestGeneralSearchForCourse,
    filterCourse,
    guestFilterCourse,
    InsFilterCourse,
    RateCourse
    
  }
  
  export default CourseService