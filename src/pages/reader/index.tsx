import React, { useEffect } from 'react'
import PageDesc from '@/components/sidemenu/PageDesc'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import IconFont from '@/components/iconfont'
import { Helmet } from 'react-helmet'
import { useBookList } from '@/api/reader'

const Reader = () => {
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
  // 获取阅读列表数据
  const { bookList, isBookListFetched } = useBookList()
  const bookListSource = isBookListFetched && bookList && bookList.data ? bookList.data.data : ''
  // 筛选已下架数据
  const validBooks = bookListSource && bookListSource.filter((item) => item.checked === true)
  // 获取待阅读的书籍
  const waitReading = validBooks && validBooks.filter((item) => item.status === 0)
  // 获取阅读中的书籍
  const reading = validBooks && validBooks.filter((item) => item.status === 1)
  // 获取已读完的书籍
  const readDone = validBooks && validBooks.filter((item) => item.status === 2)
  // 跳转页面
  const handleJump = (link: string) => {
    window.open(link)
  }
  return (
    <div className="w-1200  mx-auto lg:w-full lg:mx-5" ref={myRef} style={{ userSelect: 'none' }}>
      <Helmet>
        <title>书友会 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="书友会" desc="以书为友，人生路漫漫，读书不能倦。" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full">
        <div className="mt-2 lg:hidden">
          <div className="mx-5">
            <p className="flex text-2xl">
              <IconFont iconName="icon-yuedu1" className="text-[28px]"></IconFont>
              <span className="ml-2">正在阅读</span>
            </p>
            <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"></p>
          </div>
          {reading &&
            reading.map((item) => {
              return (
                <div
                  className="home_reader_page float-left w-48 h-72 px-2 pb-2 pt-2 ml-8 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4"
                  key={item._id}
                  onClick={() => handleJump(item.link)}
                >
                  {/* 封面 */}
                  <div className="relative flex justify-center overflow-hidden rounded-lg">
                    <LazyLoadImage
                      src={item.avatar}
                      alt="Image"
                      loading="lazy"
                      effect="blur"
                      className="image_reader_page rounded-lg w-44 h-52"
                    />
                  </div>
                  <div className="flex justify-center flex-wrap">
                    <div className="flex justify-center text-xl line-clamp-1 overflow-hidden">
                      {item.name}
                    </div>
                    <div className="flex items-center h-12 w-full">
                      <p className="line-clamp-2 overflow-hidden">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="mt-5 hidden lg:block lg:mt-2">
          <div className="mx-5">
            <div className="text-2xl flex">
              <IconFont iconName="icon-yuedu" className="text-[28px]"></IconFont>
              <span className="ml-2">正在阅读</span>
            </div>
            <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:mb-0 lg:w-full"></p>
          </div>
          {reading &&
            reading.map((item) => {
              return (
                <div className="lg:w-full lg:mx-auto lg:flex lg:justify-center">
                  <div
                    className="home_friendly_page flex items-center justify-center float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0"
                    key={item._id}
                    onClick={() => handleJump(item.link)}
                  >
                    {/* 封面 */}
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
                        {item.name}
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
        {waitReading && waitReading.length > 0 ? (
          <div className="mt-5">
            <div className="mx-5">
              <div className="text-2xl flex">
                <IconFont iconName="icon-yuedu" className="text-[28px]"></IconFont>
                <span className="ml-2">待读清单</span>
              </div>
              <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full lg:mb-0"></p>
            </div>
            {waitReading &&
              waitReading.map((item) => {
                return (
                  <div className="lg:w-full lg:mx-auto lg:flex lg:justify-center">
                    <div
                      className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0"
                      key={item._id}
                      onClick={() => handleJump(item.link)}
                    >
                      {/* 封面 */}
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
                          {item.name}
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
        {readDone && readDone.length > 0 ? (
          <div className="mt-5">
            <div className="mx-5">
              <div className="text-2xl flex">
                <IconFont iconName="icon-Ejudge_julei" className="text-[28px]"></IconFont>
                <span className="ml-2">已读完</span>
              </div>
              <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full lg:mb-0"></p>
            </div>
            {readDone &&
              readDone.map((item) => {
                return (
                  <div className="lg:w-full lg:mx-auto lg:flex lg:justify-center">
                    <div
                      className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0"
                      key={item._id}
                      onClick={() => handleJump(item.link)}
                    >
                      {/* 封面 */}
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
                          {item.name}
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
  )
}

export default Reader
