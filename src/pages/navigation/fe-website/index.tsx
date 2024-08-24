import React, { useEffect } from 'react'

import PageDesc from '@/components/sidemenu/PageDesc'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Helmet } from 'react-helmet'
import { useNavigationList } from '@/api/navigation'
import { NavigationTypeFormat } from '@/api/navigation/type'

const FE_Website = () => {
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
  // 获取常用网站列表数据
  const { navigationList, isNavigationListFetched } = useNavigationList()
  const navigationListSource =
    isNavigationListFetched && navigationList && navigationList.data ? navigationList.data.data : ''
  // 获取项目列表
  const navigationListData =
    navigationListSource &&
    navigationListSource
      .filter((item) => item.status === true)
      .filter((item) => item.classify === '常用网站')
  const navigationListDataFormat =
    navigationListData &&
    navigationListData.map((item) => {
      return {
        category: item.category,
        site: { ...item }
      }
    })
  const result = {}
  navigationListDataFormat &&
    navigationListDataFormat.forEach((item) => {
      const category = item.category
      const site = item.site
      if (!result[category]) {
        result[category] = {
          category: category,
          site: []
        }
      }
      result[category].site.push(site)
    })
  const mergedData = Object.values(result)
  const navigationListResult = [...mergedData]

  // 跳转页面
  const handleJump = (link: string) => {
    window.open(link)
  }
  return (
    <div className="w-1200  mx-auto lg:w-full lg:mx-5" ref={myRef} style={{ userSelect: 'none' }}>
      <Helmet>
        <title>常用网站 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="常用网站" desc="" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full">
        {navigationListResult &&
          navigationListResult?.map((item: NavigationTypeFormat, index) => (
            <div className="mt-2" key={index}>
              <div className="mx-5">
                <p className="flex text-2xl">
                  <span className="ml-2">{item?.category}</span>
                </p>
                <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"></p>
              </div>
              <div>
                {item?.site.map((data) => (
                  <div key={data._id}>
                    <div className="lg:w-full lg:mx-auto lg:flex lg:justify-center">
                      <div
                        className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0"
                        key={data._id}
                        onClick={() => handleJump(data.link)}
                      >
                        {}
                        <div className="relative overflow-hidden rounded-xl">
                          <LazyLoadImage
                            src={data.avatar}
                            alt="Image"
                            loading="lazy"
                            effect="blur"
                            className="image_friendly_page w-20 h-20 rounded-xl"
                          />
                        </div>
                        <div className="ml-2 w-48">
                          <p className="flex justify-start text-xl line-clamp-1 overflow-hidden">
                            {data.title}
                          </p>
                          <div className="flex items-center h-12">
                            <p className="line-clamp-2 overflow-hidden">{data.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default FE_Website
