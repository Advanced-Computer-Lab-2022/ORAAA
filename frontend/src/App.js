import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import MainIndividualTrainee from './pages/MainIndividualTrainee';
import SearchResults from './pages/SearchResults';
import Instructor from './pages/Instructor';
import Admin from './pages/Admin';
import CorporateTrainee from './pages/CorporateTrainee';
import InstructorCreateCourse from './pages/InstructorCreateCourse';
import ViewCourseTitles from './pages/ViewCourseTitles';
import CorporateFilterResult from './pages/CorporateFilterResult';
function App() {
  return (
    <>
     <Router>
      <div className='container'>
        <Header/>
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/mainIndividualTrainee' element={<MainIndividualTrainee/>} />
          <Route path='/searchresults' element={<SearchResults/>} />
          <Route path='/instructor' element={<Instructor/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/corporateTrainee' element={<CorporateTrainee/>} />
          <Route path='/InstructorCreateCourse' element={<InstructorCreateCourse/>} />
          <Route path='/ViewCourseTitles' element={<ViewCourseTitles/>} />
          <Route path='/CorporateFilterResult' element={<CorporateFilterResult/>} />
       </Routes>
      </div>
     </Router>
     <ToastContainer/>
    </>
  );
}

export default App;
