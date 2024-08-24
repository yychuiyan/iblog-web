import React, { useEffect } from 'react'
import Content from '@/components/content'
import TagsDetail from '@/components/sidemenu/Tags'
import { Affix, FloatButton } from 'antd'
import User from '@/components/sidemenu/User'
import PageDesc from '@/components/sidemenu/PageDesc'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
const Tags = () => {
  // 滚动位置
  const myRef = React.useRef<HTMLDivElement>()
  useEffect(() => {
    if (myRef.current) {
      // window.scrollTo(0, myRef.current.offsetTop || 0);
      window.scroll({
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [])
  return (
    <div className="w-1200 mx-auto lg:w-full" ref={myRef}>
      <Helmet>
        <title>标签 | 夜雨炊烟</title>
      </Helmet>
      <div className="mb-10">
        <PageDesc title="标签" />
      </div>
      <div className="flex flex-row justify-between w-full lg:mx-auto lg:justify-start lg:flex-col lg:w-full sm:w-full">
        <article className="w-[calc(100%-320px)] lg:w-full lg:order-2 sm:w-full">
          <Content />
        </article>
        <aside className="w-300 lg:order-1 lg:w-full hidden lg:block sm:w-full">
          <User />
          <TagsDetail />
          <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
        </aside>
        <aside className="w-300 lg:hidden">
          <User />
          <Affix offsetTop={70}>
            <TagsDetail />
          </Affix>
          <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
        </aside>
      </div>
    </div>
  )
}

export default Tags
