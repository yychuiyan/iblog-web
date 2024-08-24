import React, { useEffect } from 'react'

import PageDesc from '@/components/sidemenu/PageDesc'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Helmet } from 'react-helmet'

import { useNavigationList } from '@/api/navigation'

const FE_Tools = () => {
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
  // 获取工具列表数据
  const { navigationList, isNavigationListFetched } = useNavigationList()
  const navigationListSource =
    isNavigationListFetched && navigationList && navigationList.data ? navigationList.data.data : ''
  // 获取项目列表
  const navigationListData =
    navigationListSource &&
    navigationListSource
      .filter((item) => item.status === true)
      .filter((item) => item.classify === '工具管理')
  // 跳转页面
  const handleJump = (link: string) => {
    window.open(link)
  }
  return (
    <div className="w-1200  mx-auto lg:w-full lg:mx-5" ref={myRef} style={{ userSelect: 'none' }}>
      <Helmet>
        <title>工具集 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="工具集" desc="" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full">
        <div className="mt-2">
          <div>
            {navigationListData && navigationListData.length > 0 ? (
              <div className="mt-0">
                {navigationListData &&
                  navigationListData.map((item) => {
                    return (
                      <div
                        className="lg:w-full lg:mx-auto lg:flex lg:justify-center"
                        key={item._id}
                      >
                        <div
                          className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0"
                          key={item._id}
                          onClick={() => handleJump(item.link)}
                        >
                          {}
                          <div className="relative overflow-hidden rounded-xl">
                            <LazyLoadImage
                              src={item.avatar}
                              alt="Image"
                              loading="lazy"
                              effect="blur"
                              className="image_friendly_page w-20 h-20 rounded-xl"
                            />
                          </div>
                          <div className="ml-2 w-48">
                            <p className="flex justify-start text-xl line-clamp-1 overflow-hidden">
                              {item.title}
                            </p>
                            <div className="flex items-center h-12">
                              <p className="line-clamp-2 overflow-hidden">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FE_Tools
