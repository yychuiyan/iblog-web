import { useEffect, useState } from 'react'
import IconFont from '../iconfont'
import { useArticleAllList } from '@/api/articles'
import { useWebSiteUpdate } from '@/api/webSite'
const WebSite = () => {
  const [days, setDays] = useState(0)
  useWebSiteUpdate()
  // 获取全部文章
  const { articleAllList, isArticleAllListFetched } = useArticleAllList(1, 1)
  const articleAllSource =
    isArticleAllListFetched && articleAllList && articleAllList.data ? articleAllList.data.data : ''
  const articleCount = articleAllSource ? articleAllSource.length : 0
  const viewTemp = articleAllSource && articleAllSource.map((item) => item.views)
  const viewCount =
    viewTemp &&
    viewTemp.reduce((prev, curr) => {
      return prev + curr
    }, 0)
  useEffect(() => {
    countDown('2023/03/22 00:00:00')
  }, [])
  function countDown(start) {
    const endDate = new Date().getTime()
    const starDate = new Date(start).valueOf()
    const intervalTime = endDate - starDate
    const days = Math.floor(intervalTime / 24 / 60 / 60 / 1000)
    setDays(days)
  }

  const stats = [
    { label: '文章数目', value: articleCount, icon: 'icon-wiappfangwenliang' },
    { label: '文章访问量', value: viewCount, icon: 'icon-fangwenliang' },
    { label: '本站已运行', value: `${days}天`, icon: 'icon-wangzhan' }
  ]

  return (
    <div
      className="mb-5 rounded-2xl bg-base-100 pb-2 mx-auto text-lg transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
      style={{ userSelect: 'none' }}
    >
      <p
        className="flex items-center py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
        <IconFont iconName="icon-wangzhan" className="text-[28px] pr-1"></IconFont>
        <span>网站资讯</span>
      </p>
      {stats.map((item, index) => (
        <div key={index} className="flex items-center justify-between mt-1 px-2">
          <p className="flex items-center">
            <IconFont iconName={item.icon} className="text-[22px] pr-2"></IconFont>
            <span>{item.label}</span>
          </p>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export default WebSite
