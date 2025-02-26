import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import img from '../assets/images/light-patten.svg'
export default function Layout() {
  return (
    <div style={{backgroundImage:`url (${img})`}} className='flex flex-col justify-between min-h-screen  bg-white dark:bg-black dark:text-white'>
      <div className='my-10'>
      <Navbar/>
      </div>
        <Outlet/>
        <Footer/>
    </div>
  )
}
