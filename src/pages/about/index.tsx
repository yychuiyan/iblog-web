import React, { useEffect, useState } from 'react'

import MarkDown from '@/components/markdown/MarkDown'
import '@/components/markdown/github-markdown-dark.css'
import PageDesc from '@/components/sidemenu/PageDesc'
import { Helmet } from 'react-helmet'
import { useAboutList } from '@/api/about'
const About = () => {
  // 选中状态
  const [isChecked, setIsChecked] = useState(false)
  // 滚动位置
  const myRef = React.useRef<HTMLDivElement>()
  useEffect(() => {
    if (myRef.current) {
      window.scroll({
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [])
  // 获取关于列表数据
  const { aboutList, aboutListFetched } = useAboutList(isChecked)
  const aboutListSource = aboutListFetched && aboutList && aboutList.data ? aboutList.data.data : ''

  const handleClickChecked = () => {
    setIsChecked(!isChecked)
  }
  return (
    <div className="w-1200 mx-auto pb-5 lg:w-[calc(100%-38px)] lg:mx-auto" ref={myRef}>
      <Helmet>
        <title>关于 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="关于" />
      <div className="w-1000 min-h-screen mx-auto mt-10 pb-0 pt-0  bg-base-100 rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full">
        <div className="flex items-center w-full h-24 -mb-8 lg:-mb-8">
          <p
            className={`text-2xl mx-3 ${isChecked ? 'text-gray-500' : ' bg-base-100'}`}
            style={{ userSelect: 'none' }}
          >
            关于本站
          </p>
          <div
            className="h-10 w-20 rounded-3xl bg-base-200 relative cursor-pointer "
            onClick={handleClickChecked}
          >
            <p
              className={`rounded-3xl h-10 w-10 absolute left-5  ${
                isChecked ? 'translate-x-1/2 transition-all ' : '-translate-x-1/2 transition-all'
              }`}
              style={{ backgroundColor: 'var(--color-icon-default)' }}
            ></p>
          </div>
          <p
            className={`text-2xl mx-3  ${isChecked ? 'bg-base-100' : 'text-gray-500'}`}
            style={{ userSelect: 'none' }}
          >
            关于我
          </p>
        </div>

        {/* 具体内容-关于本站 */}
        {isChecked
          ? aboutListSource &&
            aboutListSource.map((item) => {
              return (
                <div className={`block ${isChecked ? 'block' : 'hidden'}`} key={item._id}>
                  <div className="rounded-lg">
                    <div className="markdown-body content">
                      <MarkDown content={item.content} />
                      {/* <Comment title={list.map((item) => item.title)} /> */}
                    </div>
                  </div>
                </div>
              )
            })
          : aboutListSource &&
            aboutListSource.map((item) => {
              return (
                <div className={`block ${isChecked ? 'hidden' : 'block'}`} key={item._id}>
                  <div>
                    <div className="markdown-body content">
                      <MarkDown content={item.content} />
                    </div>
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default About
