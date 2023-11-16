import { Outlet } from 'react-router-dom'
import Footer from '../components/universal/Footer'
import Navbar from '../components/universal/Navbar'
import './Rootlayout.css'

const Rootlayout = () => {
  return (
    <div className='layout-container'>
      <Navbar />
      <div className='main-content-all-pages'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Rootlayout