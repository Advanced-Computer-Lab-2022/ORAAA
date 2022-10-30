import { useState} from 'react'
import {useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  searchForCourse } from '../features/courses/courseSlice'


function SearchBarForm() {
  const [formData, setFormData] = useState('')

  const {keyword} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const onSubmit = (e) => {
    e.preventDefault()

    const courseData = {
      keyword
    }

    dispatch(searchForCourse(courseData))
    navigate('/searchresults')
  }


  
    return (
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              
              <input
                type='text'
                name='keyword'
                id='keyword'
                value={keyword}
                placeholder='SearchBar'
                onChange={(e) => setFormData(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <button className='btn btn-block' type='submit'>
                Search
              </button>
            </div>
          </form>
        </section>
      )

}


export default SearchBarForm