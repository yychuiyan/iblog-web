import React, { useEffect } from 'react'
import Content from '@/components/content'
import CategorySwitch from '@/components/sidemenu/CategorySwitch'
import { Affix, FloatButton } from 'antd'
import User from '@/components/sidemenu/User'
import PageDesc from '@/components/sidemenu/PageDesc'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
const Category = () => {
  // 滚动位置
  const myRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (myRef.current) {
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
        <title>分类 | 夜雨炊烟</title>
      </Helmet>
      <div className="mb-10">
        <PageDesc title="分类" />
      </div>
      <div className="flex flex-row justify-between lg:flex-col lg:justify-start lg:w-full sm:w-full">
        <article className="w-[calc(100%-320px)] lg:w-full lg:order-2 sm:w-full">
          <Content />
        </article>
        <aside className="w-300 hidden lg:w-full lg:block lg:order-1 sm:w-full">
          <User />
          <CategorySwitch />
          <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
        </aside>
        <aside className="w-300 lg:w-full lg:hidden sm:w-full">
          <User />
          <Affix offsetTop={70}>
            <CategorySwitch />
          </Affix>
          <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
        </aside>
      </div>
    </div>
  )
}

export default Category
