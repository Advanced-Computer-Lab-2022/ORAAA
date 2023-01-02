import React from 'react'
import { useSelector} from 'react-redux'
import Spinner from '../components/Spinner'



function Wallet() {
    
    const {Wallet,isLoading} = useSelector(
      (state) => state.auth
    )
  
  if (isLoading) {
      return <Spinner />
    }


return (
  <>
  <h1>Wallet</h1>
  <section className='content'>
    <div>
        <h1>Amount in Wallet:{Wallet}$</h1>
    </div>
</section>
</>
)

}

export default Wallet