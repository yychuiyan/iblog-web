import { useEffect, useState } from 'react'
import IconFont from '../iconfont'
import { useWebSiteView } from '@/api/webSite'
import { useArticleAllList } from '@/api/articles'
const WebSite = () => {
  // 运行天数
  const [days, setDays] = useState(0)
  // 网站访问量
  const { webSiteView, isWebSiteViewFetched } = useWebSiteView()
  const webSiteViewSource =
    isWebSiteViewFetched && webSiteView && webSiteView.data ? webSiteView.data.data : ''
  const visitNumber = webSiteViewSource && webSiteViewSource[0].visitNumber
  // 获取全部文章
  const { articleAllList, isArticleAllListFetched } = useArticleAllList(1, 1)
  const articleAllSource =
    isArticleAllListFetched && articleAllList && articleAllList.data ? articleAllList.data.data : ''
  const viewTemp = articleAllSource && articleAllSource.map((item) => item.views)
  const init = 0
  const viewCount =
    viewTemp &&
    viewTemp.reduce((prev, curr) => {
      return prev + curr
    }, init)
  useEffect(() => {
    countDown('2023/03/22 00:00:00')
  }, [])
  function countDown(start) {
    // 获取当前时间
    const endDate = new Date().getTime()
    const starDate = new Date(start).valueOf()
    const intervalTime = endDate - starDate
    // 计算天
    const days = Math.floor(intervalTime / 24 / 60 / 60 / 1000)
    setDays(days)
  }

  return (
    <div
      className="flex flex-col  justify-around bg-base-100 py-2 pr-7 pl-5 h-32 text-xl mb-3 mx-auto rounded-3xl transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-105"
      style={{ userSelect: 'none' }}
    >
      <div className="flex justify-between">
        <p className="flex">
          <IconFont iconName="icon-fangwenliang" className=" text-[28px] pr-2"></IconFont>
          <span>网站访问量</span>
        </p>
        <p>
          <span>{visitNumber}</span>
        </p>
      </div>
      <div className="flex justify-between">
        <p className="flex">
          <IconFont iconName="icon-wiappfangwenliang" className=" text-[28px] pr-2"></IconFont>
          <span>文章访问量</span>
        </p>
        <p>
          <span>{viewCount}</span>
        </p>
      </div>
      <div className="flex justify-between">
        <p className="flex">
          <IconFont iconName="icon-wangzhan" className="text-[28px] pr-2"></IconFont>
          <span>本网站已运行</span>
        </p>
        <p>
          <span>{days}天</span>
        </p>
      </div>
    </div>
  )
}

export default WebSite
