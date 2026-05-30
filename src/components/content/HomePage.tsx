import React, { useEffect, useState } from 'react'
import MyPagination from '@/components/pagination'
import dayjs from 'dayjs'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import IconFont from '../iconfont'
import { useArticleAllList } from '@/api/articles'
import { useNavigate } from 'react-router-dom'
import './index.css'
// 首页
const Content = () => {
  // 路由信息
  const navigate = useNavigate()
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1)
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(10)
  // 每页显示条数
  const [pageSize] = useState(10)
  // 滚动位置
  const myRef = React.useRef<HTMLDivElement>(null)
  useEffect(() => {
    // 滚动到顶部
    if (myRef.current) {
      window.scrollTo({
        top: 0,
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
      .map((item) => {
        return {
          ...item,
          isTop: Number(item.isTop)
        }
      })
      .sort((prev, curr) => {
        return curr.createTime - prev.createTime
      })

  const articleAllSourceFormat =
    articleAllSourceTop &&
    articleAllSourceTop.sort((prev, curr) => {
      return curr.isTop - prev.isTop
    })
  // 跳转页数
  const onChangePage = (page: number) => {
    // 滚动到顶部
    if (myRef.current) {
      window.scroll({
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth'
      })
    }
    // 重新调用接口将参数传递过去
    if (page <= 1) {
      setMinVal(0)
      setMaxVal(10)
      setCurrentPage(page)
      window.scroll({
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth'
      })
    } else {
      setMinVal((page - 1) * 10)
      setMaxVal((page - 1) * 10 + 10)
      setCurrentPage(page)
      window.scroll({
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
  const handleTags = (name: string) => {
    navigate(`/tags?t=${name}`)
  }
  const handleCategory = (name: string) => {
    navigate(`/category?c=${name}`)
  }
  const handleArticle = (id: string) => {
    navigate(`/article/detail/${id}`)
  }
  return (
    <div ref={myRef} style={{ userSelect: 'none' }} className="lg:mt-5">
      {articleAllSourceFormat &&
        articleAllSourceFormat.slice(minVal, maxVal).map((item) => {
          return (
            <div
              className="home_page rounded-2xl bg-base-100
      lg:transition-none lg:hover:-translate-x-0 lg:hover:scale-100 lg:hover:ring-1 lg:mx-5
      "
              key={item._id}
            >
              <div>
                <div className="flex items-center relative h-44  px-2 sm:h-28">
                  <div
                    className={`absolute top-0 left-0 h-auto  text-center rounded-md ${item.isTop === 1 ? 'block' : 'hidden'}`}
                    style={{ userSelect: 'none' }}
                  >
                    {/* 置顶 */}
                    <IconFont
                      iconName="icon-zhiding"
                      className="text-[40px] lg:text-[28px] text-[var(--bgcolor-navbar-hover)]"
                    ></IconFont>
                  </div>
                  {item.cover === undefined || item.cover === '' ? (
                    ''
                  ) : (
                    <div
                      className="flex items-center relative overflow-hidden ml-2 w-64 h-32 rounded-md cursor-pointer sm:hidden"
                      onClick={() => handleArticle(item._id)}
                    >
                      {item.cover === undefined || item.cover === '' ? (
                        ''
                      ) : (
                        <LazyLoadImage
                          src={item.cover}
                          alt="Image"
                          loading="lazy"
                          effect="blur"
                          className="image_page h-32 w-64"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex flex-col h-32 w-full lg:w-full lg:h-24">
                    <div
                      className={`${item.cover === undefined || item.cover === '' ? 'flex flex-col items-center px-2 text-xl cursor-pointer' : 'flex flex-col px-2 text-xl cursor-pointer'}`}
                      onClick={() => handleArticle(item._id)}
                    >
                      <span className="flex items-start justify-start font-medium  sm:w-full sm:line-clamp-1">
                        {item.title}
                      </span>
                    </div>
                    <div className="w-full h-24 text-base lg:h-18">
                      <div
                        className="h-16 mt-2 cursor-pointer lg:h-12 lg:-mt-2"
                        onClick={() => handleArticle(item._id)}
                      >
                        <p className="px-2 h-12 pt-2 tracking-wider line-clamp-2 overflow-hidden text-[var(--article-content-default)] lg:h-12">
                          {item.introduction}
                        </p>
                      </div>
                      <div className="flex items-center justify-between h-9 px-2 lg:pt-1">
                        <div className="flex">
                          <span
                            className="inline-block w-auto  text-center leading-6 px-1"
                            style={{ userSelect: 'none' }}
                          >
                            {dayjs(item.createTime * 1000).format('YYYY-MM-DD')}
                          </span>
                        </div>
                        <div className="flex items-center h-10  w-auto">
                          <div className="flex items-center sm:hidden">
                            <IconFont iconName="icon-biaoqian" className=" text-[30px]"></IconFont>
                            {/* 标签: */}
                            {item.tags.map((it) => {
                              return (
                                <span
                                  className="inline-block w-auto px-2 h-6 text-center text-[var(--article-content-tags-font)] leading-6 ml-1 rounded-md bg-[var(--article-content-tags-bgcolor)] cursor-pointer hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500"
                                  key={it}
                                  onClick={() => handleTags(it)}
                                >
                                  {it}
                                </span>
                              )
                            })}
                          </div>
                          {/* 分类 */}
                          <div
                            className="flex items-center ml-1 sm:hidden"
                            onClick={() => handleCategory(item.categories)}
                          >
                            <IconFont iconName="icon-fenlei" className=" text-[26px]"></IconFont>
                            <span className="inline-block w-auto h-6 text-center leading-6 px-2 mx-1 text-[var(--article-content-tags-font)] rounded-md bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
                              {item.categories}
                            </span>
                          </div>
                          {/* 点赞（只读） */}
                          <div className="mx-1 flex items-center" style={{ userSelect: 'none' }}>
                            <span className="pr-1">
                              <IconFont
                                iconName="icon-dianzan"
                                className="text-[28px] lg:text-[24px]"
                              ></IconFont>
                            </span>
                            <span>{item.like}</span>
                          </div>

                          {/* 评论 */}
                          <p
                            className="mx-1 flex items-center cursor-pointer"
                            style={{ userSelect: 'none' }}
                            onClick={() => handleArticle(item._id)}
                          >
                            <span className="pr-1 pt-1">
                              <IconFont
                                iconName="icon-pinglun"
                                className=" text-[26px] lg:text-[23px]"
                              ></IconFont>
                            </span>
                            <span>{item.comment}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      <MyPagination
        pageSize={pageSize}
        currentPage={currentPage}
        total={articleAllSourceFormat.length}
        onChange={onChangePage}
      ></MyPagination>
    </div>
  )
}

export default Content
