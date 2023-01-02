import AdminForm from "../components/AdminForm"
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector} from 'react-redux'
import Header from '../components/Header';
import RequestItem from "../components/RequestItem"
import { getRequests,reset } from "../features/admin/adminSlice"
import { useDispatch } from "react-redux"
function Admin() {
    const {isLoading,isError, message,Adminrequests} = useSelector(
        (state) => state.admin
      )
    const dispatch = useDispatch()  
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }

        dispatch(getRequests())

        return ()=>{
          dispatch(reset)
        }

    },[isError,message,dispatch])

    if (isLoading) {
        return <Spinner />
      }
    
  return (
    <>
    <Header/>
    <section className="heading">
        <h1>Admin Creates User</h1>
     </section>
     <AdminForm/>
     <section className='content'>
        {Adminrequests.length > 0 ? (
          <div className='goals'>
            {Adminrequests.map((request) => (
              <RequestItem key={request._id} request={request} />
            ))}
          </div>
        ) : (
          <h3>No requests</h3>
        )}
      </section>
    
    
    
    
    
    
    </>
  )
}

export default Admin