import React from 'react'
import '../toggle.css'
import {insMode,reset} from '../features/instructor/instructorSlice'
import {  useDispatch } from 'react-redux'
import '../message.css'

function Toggle() {
    

    const dispatch = useDispatch()


    const onClick = ()=> {
        
        const checkBox = document.getElementById("InstructorCheckBox");
      
        if (checkBox.checked === true){
            dispatch(insMode('Instructor'))
        }else{
            dispatch(reset())
		} 
      }
  return (
	
	<div class="item-hints">
	  <div class="hint" data-position="4">
	  <label class="toggle">
	<input type="checkbox" class="toggle__input" id='InstructorCheckBox'  onClick={onClick} />
	<span class="toggle-track">
		<span class="toggle-indicator">
			<span class="checkMark">
				<svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
					<path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
				</svg>
			</span>
		</span>
	</span>
	MyCourseMode
</label>
	
		<div class="hint-content do--split-children">
		  <p>If Checked your search and filter output are on your Courses only.</p>
		</div>
	  </div>
	</div>

  )
}

export default Toggle