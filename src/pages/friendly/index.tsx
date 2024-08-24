import React, { useEffect } from 'react'
import PageDesc from '@/components/sidemenu/PageDesc'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import IconFont from '@/components/iconfont'
import { Helmet } from 'react-helmet'
import { useFriendlyList } from '@/api/friendly'

const Friendly = () => {
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
  // 获取友链列表数据
  const { isFriendlyListFetched, frilendlyList } = useFriendlyList()
  const frilendlyListSource =
    isFriendlyListFetched && frilendlyList && frilendlyList.data ? frilendlyList.data.data : null
  const frilendlyListSourceData =
    frilendlyListSource &&
    frilendlyListSource
      .sort(() => Math.random() - 0.5)
      .filter((item) => item.checked === true)
      .filter((item) => item.status === true)
  const frilendlyListInvalidLink =
    frilendlyListSourceData && frilendlyListSourceData.filter((item) => item.status === false)

  // 跳转页面
  const handleJump = (link: string) => {
    window.open(link)
  }
  return (
    <div className="w-1200  mx-auto lg:w-full lg:mx-5" ref={myRef} style={{ userSelect: 'none' }}>
      <Helmet>
        <title>友情链接 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="友链" desc="" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-[90%] lg:pb-6 lg:w-full sm:w-full">
        <div className="mt-2">
          <div className="mx-5">
            <p className="flex items-center text-2xl">
              <IconFont
                iconName="icon-chengchangdaoshi"
                className="text-[28px] lg:text-[24px] "
              ></IconFont>
              <span className="ml-2 lg:text-xl">优秀博主</span>
            </p>
            <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"></p>
          </div>
          {frilendlyListSourceData &&
            frilendlyListSourceData.map((item) => {
              return (
                <div className="lg:w-full lg:mx-auto lg:flex lg:justify-center">
                  <div
                    className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0"
                    key={item._id}
                    onClick={() => handleJump(item.link)}
                  >
                    {/* 头像 */}
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
                      <p className="flex justify-start text-xl">{item.name}</p>
                      <div className="flex items-center h-12">
                        <p className="line-clamp-2 overflow-hidden">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        {frilendlyListInvalidLink && frilendlyListInvalidLink.length > 0 ? (
          <div className="mt-5">
            <div className="mx-5">
              <div className="text-2xl flex">
                <IconFont iconName="icon-jiankongbaojing" className="text-[28px]"></IconFont>
                <span className="ml-2 items-center lg:text-xl">失联博主</span>
                <span className="text-[13px] pt-1 text-[var(--article-content-default)] lg:hidden">
                  (网站正常后可联系博主恢复友链信息，长时间未更新将取消贵站链接。)
                </span>
              </div>
              <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full lg:mb-0"></p>
            </div>
            {frilendlyListInvalidLink &&
              frilendlyListInvalidLink.map((item) => {
                return (
                  <div className="lg:w-full lg:mx-auto lg:flex lg:justify-center">
                    <div
                      className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0"
                      key={item._id}
                      onClick={() => handleJump(item.link)}
                    >
                      {/* 头像 */}
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
                        <p className="flex justify-start text-xl">{item.name}</p>
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

export default Friendly
