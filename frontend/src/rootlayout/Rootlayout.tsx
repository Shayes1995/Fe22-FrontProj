import { Outlet } from 'react-router-dom'
import Footer from '../components/universal/Footer'
import Navbar from '../components/universal/Navbar'

const Rootlayout = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Rootlayout