import React, { useEffect } from 'react'
import Category from '@/components/sidemenu/Category'
import Social from '@/components/sidemenu/Social'
import User from '@/components/sidemenu/User'
import Content from '@/components/content/HomePage'
import ContentCT from '@/components/content'
import HotArticles from '@/components/sidemenu/HotArticles'
import { Affix, FloatButton } from 'antd'
import WebSite from '@/components/sidemenu/WebSite'
import useTypewriter from 'react-typewriter-hook'
import Affiche from '@/components/sidemenu/Affiche'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import qs from 'qs'
import { Helmet } from 'react-helmet'
import { usePoemList } from '@/api/thirdParty'
import { useLocation } from 'react-router-dom'
const Home = () => {
  console.log('首页')

  // 路由信息
  const location = useLocation()
  // 滚动位置
  const myRef = React.useRef<HTMLDivElement>(null)
  const navRef = React.useRef<HTMLDivElement>(null)
  // 根据条件不同显示不同数据
  const { c } = qs.parse(location.search.slice(1))
  const { t } = qs.parse(location.search.slice(1))
  // 获取诗词
  const { poemDetail, isPoemListFetched } = usePoemList()
  const poemContent =
    isPoemListFetched && poemDetail && poemDetail.content ? poemDetail.content : ''

  // 打字机效果
  const typeWriterContent = useTypewriter(poemContent)
  // 默认顶部
  useEffect(() => {
    if (navRef.current) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <div className="w-full" ref={navRef}>
      <Helmet>
        <title>首页 | 夜雨炊烟</title>
      </Helmet>

      <div
        className="flex justify-center items-center flex-col h-52 relative bottom-10 lg:h-36"
        style={{ userSelect: 'none' }}
      >
        {/* 古诗词 */}
        <p className="h-12  mt-48 text-3xl lg:mt-48 lg:text-lg lg:hidden">{typeWriterContent}</p>

        <div className="hidden lg:block lg:mt-48 lg:w-full">
          <Affiche />
        </div>
      </div>
      <div className="flex justify-between w-1200 mx-auto mt-10 lg:w-full sm:w-full" ref={myRef}>
        <article className="w-[calc(100%-320px)] lg:w-full sm:w-full">
          {Boolean(c) === false || Boolean(t) === false ? <Content /> : <ContentCT />}
        </article>
        <aside className="w-300 lg:hidden">
          <User />
          <Social />
          <Affiche />
          <Category />
          <Affix offsetTop={70}>
            <div>
              <HotArticles />
              <WebSite />
            </div>
          </Affix>
          <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
        </aside>
      </div>
    </div>
  )
}

export default Home
