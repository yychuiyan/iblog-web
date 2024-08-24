import { Outlet } from 'react-router-dom'
import NavBar from '@/components/header'
import Footer from '@/components/footer'
import { useSelector } from 'react-redux'
import { ModeState } from '@/types/comm'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './index.css'
const LayoutIndex = () => {
  NProgress.start()
  NProgress.done()
  const localMode = Number(localStorage.getItem('localmode'))
  const mode = useSelector((state: ModeState) => state.ModeReducer.mode)
  return (
    <div className="parent">
      <div className={`${mode || localMode ? 'bg1' : 'bg0'}`}>
        <NavBar></NavBar>
        <main className="flex justify-between  w-full min-h-screen mx-auto lg:w-full">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default LayoutIndex
