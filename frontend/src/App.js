import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import Register from './pages/Register';
import MainIndividualTrainee from './pages/MainIndividualTrainee';
function App() {
  return (
    <>
     <Router>
      <div className='container'>
        <Header/>
       <Routes>
          <Route path='/' element={<DashBoard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/mainIndividualTrainee' element={<MainIndividualTrainee/>} />
       </Routes>
      </div>
     </Router>
     <ToastContainer/>
    </>
  );
}

export default App;
