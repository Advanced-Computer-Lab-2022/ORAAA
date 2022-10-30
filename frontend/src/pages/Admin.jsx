import AdminForm from "../components/AdminForm"
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector} from 'react-redux'
function Admin() {
    const {isLoading,isError, message  } = useSelector(
        (state) => state.admin
      )
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    })

    if (isLoading) {
        return <Spinner />
      }
    
  return (
    <>
    <section className="heading">
        <h1>Admin Creates User</h1>
     </section>
     <AdminForm/>
    
    
    
    
    
    
    </>
  )
}

export default Admin