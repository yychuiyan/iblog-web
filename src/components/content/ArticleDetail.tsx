import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Comment from '../comment'
import User from '../sidemenu/User'
import LastUpdate from '../sidemenu/LastUpdate'
import MarkDown from '../markdown/MarkDown'
import Toc from '../toc'
import { Affix, FloatButton } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { faClock, faComments, faEye } from '@fortawesome/free-solid-svg-icons'
import CopyRight from '../copyright'
import IconFont from '../iconfont'
import { useArticleDetail, useLikeList, useUpdateArtilceView } from '@/api/articles'
import { useLocation } from 'react-router-dom'
import { getClientId } from '@/utils/clientId'
import { request } from '@/utils/request'
import './index.css'

const ArticleDetail = () => {
  // 路由信息
  const location = useLocation()
  // 目录展示隐藏
  // const [navVisible, setNavVisible] = useState(false);
  // 客户端唯一标识（localStorage 持久化）
  const clientId = getClientId()
  // 是否已点赞
  const [likeShow, setLikeShow] = useState(false)
  // 点赞数量
  const [likeCount, setLikeCount] = useState(0)
  // 滚动位置
  const myRef = React.useRef<HTMLDivElement>(null)
  useEffect(() => {
    // 滚动到顶部
    if (myRef.current) {
      window.scrollTo({
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [])
  // 获取单篇文章详情
  const parts = location.pathname.split('/')
  const articleId = parts[parts.length - 1]
  const { articleDetail } = useArticleDetail(articleId)
  const articleItem = (articleDetail as any)?.data
  // 文章访问量（每次进入详情页 +1）
  const [viewCount, setViewCount] = useState(0)
  const { handleUpdateView } = useUpdateArtilceView()
  useEffect(() => {
    if (!articleItem) return
    const initViews = articleItem?.views || 0
    const newViews = initViews + 1
    setViewCount(newViews)
    handleUpdateView({ views: newViews, id: articleId })
  }, [location.pathname, articleItem?.views])
  // 点赞量初始化
  const initialLikeCount = articleItem?.like || 0
  useEffect(() => {
    if (initialLikeCount && !likeCount) {
      setLikeCount(initialLikeCount)
    }
  }, [initialLikeCount])

  // 点赞列表
  const { likeList, isLikeListFetched } = useLikeList()
  const likeListSource = isLikeListFetched && likeList ? likeList.data : ''
  useEffect(() => {
    const filterLike =
      likeListSource &&
      likeListSource.filter((item) => item.userId === clientId && item.articleId === articleId)
    if (filterLike && filterLike.length > 0) {
      // 存在点赞
      setLikeShow(true)
    }
  }, [articleId, likeList, likeListSource, clientId])

  // 点赞
  const handleClickLike = async () => {
    if (likeShow) return // 已点赞，不重复
    setLikeShow(true)
    setLikeCount((prev) => prev + 1)

    const articleName = articleItem?.title
    try {
      await request.post('/iblog/like', {
        articleId,
        articleName,
        userId: clientId,
        userName: '访客',
        userAvatar: '',
        likeNumber: 1
      })
    } catch (error) {
      // 失败时回滚
      setLikeShow(false)
      setLikeCount((prev) => prev - 1)
    }
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTopValue = document.documentElement.scrollTop
  //     if (scrollTopValue > 900) {
  //       const activeItem = document.querySelector('.markdown-navigation .title-anchor.active')
  //       if (activeItem) {
  //         activeItem.scrollIntoView({
  //           behavior: 'smooth',
  //           block: 'center'
  //         })
  //       }
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  return (
    <div
      className="flex flex-col items-center w-1200 mx-auto  mt-20  sm:w-full "
      style={{ scrollBehavior: 'smooth' }}
      ref={myRef}
    >
      <Helmet>
        <title>文章详情 | 夜雨炊烟</title>
      </Helmet>
      <div className="w-full h-80 lg:h-60 lg:w-full">
        {articleItem && (
          <div style={{ userSelect: 'none' }}>
            <div className="flex justify-center items-center flex-col h-72 sm:h-52 sm:mb-16 ">
              <h2 className={`w-full text-center`}>
                <span>{articleItem.title}</span>
              </h2>
              <div className="flex items-center justify-center mt-2">
                <FontAwesomeIcon icon={faClock} size="lg" />
                <span className="px-2 text-lg rounded-lg">
                  {dayjs(articleItem.updateTime * 1000).format('YYYY-MM-DD') === `1970-01-01`
                    ? dayjs(articleItem.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
                    : dayjs(articleItem.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
                </span>
                <FontAwesomeIcon icon={faComments} size="lg" />
                <span className="text-lg pl-2 pr-4">{articleItem.comment}</span>
                <FontAwesomeIcon icon={faEye} />
                <span className="text-lg pl-2">{viewCount || articleItem.views || 0}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-1200 lg:w-full sm:w-full">
        <article className="w-[calc(100%-320px)]  lg:w-full lg:mx-5 sm:w-full sm:mx-0">
          {articleItem && (
            <div>
              <div className="flex flex-row">
                <div className="markdown-body content lg:w-[calc(100%-38px)] lg:mx-auto">
                  <MarkDown content={articleItem.content} />
                  <div className="relative">
                    <div className="h-16 w-[calc(100%-0px)] text-lg lg:w-full lg:flex-col lg:items-start sm:w-full">
                      <div className="flex lg:flex-wrap" style={{ userSelect: 'none' }}>
                        <p className="flex lg:pl-5">
                          <IconFont
                            iconName="icon-biaoqian"
                            className="text-[28px] pr-1"
                          ></IconFont>
                          {(articleItem.tags || []).map((it) => (
                            <span
                              className="inline-block w-auto px-2 h-6 text-center text-[var(--article-content-tags-font)] leading-6 ml-1 rounded-md bg-[var(--article-content-tags-bgcolor)] cursor-pointer hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500"
                              key={it}
                            >
                              {it}
                            </span>
                          ))}
                        </p>
                        <p className="flex pl-5 lg:h-4">
                          <IconFont
                            iconName="icon-grouping"
                            className="text-[28px] pr-1"
                          ></IconFont>
                          <span className="inline-block w-auto h-6 text-center leading-6 px-2 mx-1 text-[var(--article-content-tags-font)] rounded-md bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 cursor-pointer z-11">
                            {articleItem.categories}
                          </span>
                        </p>
                      </div>
                      <div>
                        <div className="h-10 absolute right-0">
                          <div className="ml-3 text-base flex items-center">
                            <p style={{ userSelect: 'none' }}>文章还不错？给作者一个赞~😉</p>
                            <p
                              className="flex items-center ml-2 cursor-pointer text-[var(--bgcolor-navbar-click)] text-base"
                              onClick={handleClickLike}
                              style={{ userSelect: 'none' }}
                            >
                              {likeShow ? (
                                <svg
                                  className="icon w-7 h-7 mb-1 mr-[3px]"
                                  viewBox="0 0 1024 1024"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  p-id="62841"
                                >
                                  <path
                                    d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
                                    p-id="62842"
                                    fill="#d81e06"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  className="icon w-7 h-7 mb-1 mr-[3px]"
                                  viewBox="0 0 1024 1024"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  p-id="62431"
                                >
                                  <path
                                    d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z"
                                    fill="var(--bgcolor-social-default)"
                                    p-id="62432"
                                  ></path>
                                  <path
                                    d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z"
                                    fill="var(--bgcolor-social-default)"
                                    p-id="62433"
                                  ></path>
                                  <path
                                    d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z"
                                    fill="var(--bgcolor-social-default)"
                                    p-id="62434"
                                  ></path>
                                </svg>
                              )}
                              <span style={{ userSelect: 'none' }}> ({likeCount || 0})</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CopyRight content={articleItem?.title || ''} />
                  <Comment title={[articleItem?.title || '']} />
                </div>
              </div>
            </div>
          )}
        </article>

        <aside className="w-300 lg:fixed lg:top-36 lg:right-0 lg:w-0">
          <User />
          <LastUpdate />
          <div style={{ userSelect: 'none' }}>
            {/* PC目录 */}
            <Affix offsetTop={70}>
              <div className="lg:hidden">
                <Toc />
              </div>
            </Affix>
          </div>
          <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
        </aside>
      </div>
    </div>
  )
}

export default ArticleDetail
