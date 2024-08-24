import IconFont from '../iconfont'
import { useArticleAllList } from '@/api/articles'
import { useNavigate } from 'react-router-dom'
const HotArticles = () => {
  // 路由跳转
  const navigate = useNavigate()
  // 获取全部文章
  const { articleAllList, isArticleAllListFetched } = useArticleAllList(1, 1)
  const archiceAllSource =
    isArticleAllListFetched && articleAllList && articleAllList.data ? articleAllList.data.data : ''
  const hotUpdateData =
    archiceAllSource &&
    archiceAllSource
      .sort((curr, prev) => {
        return prev.views - curr.views
      })
      .slice(0, 6)

  const handleLastUpdate = (id: string) => {
    navigate(`/article/detail/${id}`)
  }
  return (
    <div
      className="mb-5 rounded-2xl bg-base-100 pb-2 mx-auto text-lg  transition duration-500 ease-in-out  transform hover:-translate-y-0 hover:scale-105"
      style={{ userSelect: 'none' }}
    >
      <p
        className="flex items-center py-2  pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1 "
        style={{ userSelect: 'none' }}
      >
        <IconFont iconName="icon-qushi" className=" text-[28px] pr-1"></IconFont>
        <span>热门文章</span>
      </p>
      {hotUpdateData &&
        hotUpdateData.map((item) => {
          return (
            <div key={item._id} className="">
              <div className="flex items-center justify-between">
                <p
                  className="mt-2 pl-1  mx-1 text-base  cursor-pointer line-clamp-1 overflow-hidden hover:text-[#ff6347] hover:transition hover:duration-500"
                  onClick={() => handleLastUpdate(item._id)}
                >
                  <span>{item.title}</span>
                </p>
                <p className="flex items-start justify-center mt-2 pt-1 pr-2">
                  <IconFont
                    iconName="icon-chakan"
                    className="text-[18px] text-[var(--color-icon-default)] pr-1"
                  ></IconFont>
                  <span>{item.views}</span>
                </p>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default HotArticles
