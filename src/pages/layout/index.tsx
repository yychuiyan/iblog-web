import { Outlet } from 'react-router-dom'
import NavBar from '@/components/header'
import Footer from '@/components/footer'
import { useSelector } from 'react-redux'
import { ModeState } from '@/types/comm'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './index.css'
import { useArticleAllList } from '@/api/articles'
import { useEffect, useState } from 'react'
const LayoutIndex = () => {
  NProgress.start()
  NProgress.done()
  const localMode = Number(localStorage.getItem('localmode'))
  const mode = useSelector((state: ModeState) => state.ModeReducer.mode)
  const [isLoaded, setIdLoaded] = useState<boolean>(false)
  // 文章加载
  const { isArticleAllListFetched } = useArticleAllList(1, 1)
  useEffect(() => {
    if (isArticleAllListFetched) {
      setTimeout(() => {
        setIdLoaded(true)
      }, 1500)
    }
  }, [isArticleAllListFetched])

  return (
    <>
      {isLoaded ? (
        <div className={`parent`}>
          <div className={`${mode || localMode ? 'bg1' : 'bg0'}`}>
            <NavBar></NavBar>
            <main className="flex justify-between  w-full min-h-screen mx-auto lg:w-full">
              <Outlet></Outlet>
            </main>
            <Footer></Footer>
          </div>
        </div>
      ) : (
        <div className={`parent `}>
          <div className={`${mode || localMode ? 'bg1' : 'bg0'}`}>
            <main className="flex justify-between  w-full min-h-screen mx-auto lg:w-full">
              <div className="flex items-center justify-center flex-col w-full">
                <img
                  src={`https://op.yychuiyan.com/avatar1513.webp`}
                  alt=""
                  className={`image-container w-24 h-24 mt-3 rounded-full rotate`}
                />
                <p className="text-2xl mt-5">欢迎来到夜雨炊烟的小站</p>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default LayoutIndex
