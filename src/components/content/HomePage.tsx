import React, { useEffect, useState } from 'react'
import MyPagination from '@/components/pagination'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { message } from 'antd'
import { SoundOutlined } from '@ant-design/icons'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import IconFont from '../iconfont'
import { useArticleAllList, useHandleLike, useLikeList } from '@/api/articles'
import { ArticleType, HandleLikeType } from '@/api/articles/type'
import { useNavigate } from 'react-router-dom'
import { TokenType } from '@/types/comm'
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
  // 登录数据
  const [loginInfo, setLoginInfo] = useState<TokenType>()
  // 登录状态
  const [loginStatus, setLoginStatus] = useState(false)
  // 随笔ID存储的数组
  const [articleIds, setArticleIds] = useState([])
  // 点赞时的单个id
  const [isLikeId, setIsLikeId] = useState('')
  // 点赞参数
  const [likeParams, setLikeParams] = useState<HandleLikeType | null>(null)
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
  // 登录信息 解析token
  useEffect(() => {
    // 获取登录态
    const isLoginInfo = localStorage.getItem('zhj')
    if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
      const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as TokenType
      setLoginInfo(token)
      setLoginStatus(true)
    }
  }, [])
  // 获取全部文章
  const {
    articleAllList,
    isArticleAllListFetched,
    mutate: articleListMutate
  } = useArticleAllList(1, 1)
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
  // 点赞事件
  const { handleLike } = useHandleLike(likeParams)
  // 文章点赞列表
  const { likeList, isLikeListFetched } = useLikeList()
  const likeListSource = isLikeListFetched && likeList && likeList.data ? likeList.data : ''
  // 获取登录态
  useEffect(() => {
    if (isLikeListFetched && isArticleAllListFetched) {
      const isLoginInfo = localStorage.getItem('zhj')
      if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
        const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as TokenType
        setLoginInfo(token)
        setLoginStatus(true)
        const matchedObjects = []
        for (const obj of likeListSource as ArticleType[]) {
          const articleId = obj.articleId
          const matchedObj =
            articleAllSourceFormat &&
            articleAllSourceFormat.find(
              (item) => obj.userId === token?._id && item._id === articleId
            )
          if (matchedObj) {
            matchedObjects.push(matchedObj)
          }
        }
        const articleIdsArr = matchedObjects.map((item) => item._id)

        if (isLikeId) {
          articleIdsArr.push(isLikeId)
        }
        setArticleIds(articleIdsArr)
      }
    }
  }, [isArticleAllListFetched, isLikeListFetched])
  // 列表点赞功能
  const handleClickLike = (articleId: string) => {
    // 获取id 根据id判断效果是否显示
    setIsLikeId(articleId)
    setArticleIds((prevState) => [articleId, ...prevState])
    setTimeout(() => {
      setIsLikeId('')
    }, 500)
    const articleFind =
      articleAllSourceFormat && articleAllSourceFormat?.find((item) => item._id === articleId)
    const articleName = articleFind?.title
    const likeParams = {
      articleId: articleId,
      articleName: articleName,
      userId: loginInfo._id,
      userName: loginInfo.username,
      userAvatar: loginInfo.avatar,
      likeNumber: 1
    }
    setLikeParams(likeParams)
    // 点击时触发接口更新
    handleLike()
    setTimeout(() => {
      articleListMutate()
    }, 500)
  }
  // 禁止点击
  const handleCannot = () => {
    message.info({
      content: '温馨提示：还未登录哦！',
      icon: <SoundOutlined style={{ color: 'var(--bgcolor-social-default)' }} />,
      className: 'text-[var(--bgcolor-social-default)]'
    })
  }
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
                          {/* 点赞 */}
                          {loginStatus === false ? (
                            <div
                              className="mx-1 flex items-center cursor-pointer"
                              style={{ userSelect: 'none' }}
                              onClick={handleCannot}
                            >
                              <span className="pr-1">
                                <IconFont
                                  iconName="icon-dianzan"
                                  className=" text-[28px] lg:text-[24px]"
                                ></IconFont>
                              </span>
                              <span>{item.like}</span>
                            </div>
                          ) : (
                            <div
                              className="mx-1 flex items-center cursor-pointer"
                              style={{ userSelect: 'none' }}
                              onClick={() => handleClickLike(item._id)}
                            >
                              {articleIds?.includes(item._id) ? (
                                <span className="pr-1">
                                  <svg
                                    className="icon w-7 h-7 mb-1"
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
                                </span>
                              ) : (
                                <span className="pr-1">
                                  <svg
                                    className="icon w-7 h-7 lg:w-6 lg:h-6"
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
                                </span>
                              )}
                              <span>{item.like}</span>
                              {isLikeId === item._id && (
                                <div className="emoji-container">
                                  <svg
                                    className="icon w-7 h-7 mb-1"
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
                                </div>
                              )}
                            </div>
                          )}

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
