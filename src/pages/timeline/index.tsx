import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import PageDesc from '@/components/sidemenu/PageDesc'
import { FloatButton } from 'antd'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { useArticleAllList } from '@/api/articles'
import { useNavigate } from 'react-router-dom'
const TimeLine = () => {
  // 路由跳转
  const navigate = useNavigate()
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
  // 获取全部文章
  const { articleAllList, isArticleAllListFetched } = useArticleAllList(1, 1)
  const articleAllSource =
    isArticleAllListFetched && articleAllList && articleAllList.data ? articleAllList.data.data : ''

  const articleAllSourceTop =
    articleAllSource &&
    articleAllSource
      .sort((prev, curr) => {
        return curr.createTime - prev.createTime
      })
      .map((item) => {
        return {
          ...item,
          createYear: dayjs(item.createTime * 1000).format('YYYY'),
          createTime: dayjs(item.createTime * 1000).format('MM-DD')
        }
      })
  // 分组
  const groupedBy = []
  for (const item of articleAllSourceTop && articleAllSourceTop) {
    if (groupedBy[item.createYear]) {
      groupedBy[item.createYear].push(item)
    } else {
      groupedBy[item.createYear] = [item]
    }
  }
  // 数据处理
  const newArr = []
  for (const i in groupedBy) {
    newArr.push({
      year: i,
      yearData: groupedBy[i]
    })
  }

  // 根据年份排序
  const sortArticleData = newArr.sort((curr, prev) => {
    return prev.year - curr.year
  })
  // 点击文章跳转到详情页面
  const handleClickTime = (id: string) => {
    navigate(`/article/detail/${id}`)
  }
  return (
    <div
      className="flex items-end flex-col w-1200 mx-auto pb-5  lg:w-full sm:w-full lg:mx-5"
      ref={myRef}
      style={{ userSelect: 'none' }}
    >
      <Helmet>
        <title>时间线 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="时间线" />
      <div className="flex flex-col	justify-center w-1000 min-h-screen mx-auto mt-10 pb-6 pt-2  bg-base-100 rounded-2xl lg:min-h-screen lg:pb-2 lg:w-full sm:w-full">
        {sortArticleData &&
          sortArticleData.map((item) => {
            return (
              <div key={item} className=" mx-12 lg:w-full lg:px-5">
                {/* 年 */}
                <p className="flex items-center py-3 text-2xl" key={item}>
                  <svg
                    className="icon w-9 h-9 pr-2"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="7615"
                  >
                    <path
                      d="M871.6288 713.0624h-96.5632c-24.1664 0-43.7248-19.5584-43.7248-43.7248V341.8624c0-24.1664 19.5584-43.7248 43.7248-43.7248h96.5632c24.1664 0 43.7248 19.5584 43.7248 43.7248v327.424c0 24.1664-19.6096 43.776-43.7248 43.776z"
                      fill="#F55C04"
                      p-id="7616"
                    ></path>
                    <path
                      d="M631.6032 878.3872H327.3216c-121.7024 0-220.672-99.0208-220.672-220.672V353.4336c0-121.7024 99.0208-220.672 220.672-220.672h304.2816c121.7024 0 220.672 99.0208 220.672 220.672v304.2816c0.0512 121.7024-98.9696 220.672-220.672 220.672zM327.3216 194.2016c-87.808 0-159.232 71.424-159.232 159.232v304.2816c0 87.808 71.424 159.232 159.232 159.232h304.2816c87.808 0 159.232-71.424 159.232-159.232V353.4336c0-87.808-71.424-159.232-159.232-159.232H327.3216z"
                      fill="#333333"
                      p-id="7617"
                    ></path>
                    <path
                      d="M631.7056 668.2624c-4.3008 0-8.6528-0.8704-12.8-2.816l-174.3872-79.9232a30.75584 30.75584 0 0 1-17.92-27.904V373.6064c0-16.9472 13.7728-30.72 30.72-30.72s30.72 13.7728 30.72 30.72v164.352l156.4672 71.68a30.69952 30.69952 0 0 1 15.104 40.704c-5.12 11.3152-16.2304 17.92-27.904 17.92z"
                      fill="#333333"
                      p-id="7618"
                    ></path>
                  </svg>
                  {item.year}
                </p>
                <p className="w-900 border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full"></p>
                {/* 对应的内容 */}
                {item.yearData.map((it) => {
                  return (
                    <div
                      key={it._id}
                      className="flex  items-center text-xl h-10 font-medium rounded-xl my-1 cursor-pointer hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 lg:w-full sm:w-full"
                      onClick={() => handleClickTime(it._id)}
                    >
                      <p className="text-base lg:text-sm pl-2 lg:w-12 lg:h-5 lg:pl-1 lg:pr-0">
                        {it.createTime}
                      </p>
                      <p className="text-base lg:text-sm pl-2 line-clamp-2 overflow-hidden">
                        {it.title}
                      </p>
                    </div>
                  )
                })}
              </div>
            )
          })}
      </div>
      <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
    </div>
  )
}

export default TimeLine
