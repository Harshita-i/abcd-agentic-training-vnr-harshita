import {Outlet} from 'react-router-dom'
import Header from './Header'

function RootLayout() {
  return (
    <div>
        <Header/>
        <div style={{minHeight:'100vh'}} className='container'>
          <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout