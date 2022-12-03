
function InstructorR({instructor}) {
    return (
          
        <div className='goal'> 
           <h4>Instructor Rating:{instructor.rate}/10</h4>
           <h4>Reviews:</h4>
           <ol>
           {instructor.review.map((reviews) => (
               <li>
                  - {reviews}.
                </li>
              ))}
  
          </ol>
            
        </div>
      
    )
  }
  

export default InstructorR