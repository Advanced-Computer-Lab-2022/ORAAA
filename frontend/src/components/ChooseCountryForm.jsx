import {selectCountry} from '../features/instructor/instructorSlice'
import { useState} from 'react'
import {useDispatch} from'react-redux'


function ChooseCountryForm() {

    const [text, setValue]=useState({
        country:'',
      
    })
    const {country} = text

    const dispatch = useDispatch()



    const onChange=(e) =>{
        setValue((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
      
        }))
      }
      const onSubmitt=(e)=>{
          e.preventDefault()
    
          const SelectCountry = {
            country     
          }
          dispatch(selectCountry(SelectCountry))
      }



  return (
    <>
    <form onSubmit={onSubmitt}>
           <div className="form-group">
             <label htmlFor="text"></label>
             <input type="text" 
                 name='country' 
                 id='country' 
                 value={country}
                 placeholder='Add country'
                onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              choose country
            </button>
          </div>
       </form>
           </>
  )
}

export default ChooseCountryForm