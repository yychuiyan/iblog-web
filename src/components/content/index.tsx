import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import './index.css'
import qs from 'qs';
import { message } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
interface DataType {
  like: number;
  comment: string;
  createTime: number;
  isTop: number;
  introduction: string;
  title: string;
  cover: string;
  _id: any;
  page: number,
  pageSize: number,
  status: number,
  publishStatus: number,
  categories: string,
  tags: string[]
}
interface ArticleList {
  isTop: number;
  totalCount: number; page: number; pageSize: number;
  data: DataType[]
}
const Content = (props: any) => {
  // 文章列表
  const [list, setList] = useState<DataType[]>([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 登录数据
  let [loginInfo, setLoginInfo] = useState<any>()
  // 登录状态
  const [loginStatus, setLoginStatus] = useState(false)
  // 随笔ID存储的数组
  const [articleIds, setArticleIds] = useState<any>([])
  // 点赞时的单个id
  const [isLikeId, setIsLikeId] = useState("")
  // 滚动位置
  const myRef = React.useRef();
  const { c } = qs.parse(props.location.search.slice(1));
  const { t } = qs.parse(props.location.search.slice(1));
  useEffect(() => {
    // 滚动到顶部
    if (myRef.current) {
      window.scrollTo({
        //@ts-ignore
        top: myRef.current.offsetTop - 312 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [myRef.current, window.scrollTo])
  // 获取文章列表数据
  useEffect(() => {
    let category, tag;
    Boolean(c) === false ? (category = '') : (category = c);
    Boolean(t) === false ? (tag = '') : (tag = t);

    props.BlogActions.asyncArticleListAction(Boolean(tag) || Boolean(category) ? 1 : currentPage, pageSize, 1, 1, category, tag).then(
      (res: ArticleList) => {
        // 获取文章
        let { data, totalCount, page, pageSize } = res.data as unknown as ArticleList;
        let articleData = data
        setList(articleData);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
        // 获取点赞信息
        props.BlogActions.asyncLikeListAction().then((res: any) => {
          let { data } = res
          // 获取登录态
          let isLoginInfo = localStorage.getItem('zhj')
          if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
            const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as object | any;
            setLoginInfo(token)
            setLoginStatus(true)
            const matchedObjects = [];
            for (const obj of data) {
              const articleId = obj.articleId;
              const matchedObj = articleData.find((item: any) => obj.userId === token?._id && item._id === articleId)

              if (matchedObj) {
                matchedObjects.push(matchedObj)
              }
            }
            let essayArr = matchedObjects.map((item: any) => item._id)
            setArticleIds(essayArr)
          }
        })
        // 滚动到顶部
        if (myRef.current) {
          window.scrollTo({
            //@ts-ignore
            top: myRef.current.offsetTop - 312 || 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    );
  }, [props.BlogActions, props.location.search]);
  // 跳转页数
  const onChangePage = (page: number, pageSize: number) => {
    // 滚动到顶部
    if (myRef.current) {

      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
    let category, tag;
    Boolean(c) === false ? (category = '') : (category = c);
    Boolean(t) === false ? (tag = '') : (tag = t);
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncArticleListAction(page, pageSize, 1, 1, category, tag).then(
      (res: ArticleList) => {
        // 获取列表数据
        let { data } = res.data as unknown as ArticleList;
        setList(data);
        // 切换行
        setCurrentPage(page);
        // 根据页面数据显示页码
        setPageSize(pageSize);
        let articleData = data
        // 获取点赞信息
        props.BlogActions.asyncLikeListAction().then((res: any) => {
          let { data } = res
          // 获取登录态
          let isLoginInfo = localStorage.getItem('zhj')
          if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
            const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as object | any;
            setLoginInfo(token)
            setLoginStatus(true)
            const matchedObjects = [];
            for (const obj of data) {
              const articleId = obj.articleId;
              const matchedObj = articleData.find((item: any) => obj.userId === token?._id && item._id === articleId)
              if (matchedObj) {
                matchedObjects.push(matchedObj)
              }
            }
            let essayArr = matchedObjects.map((item: any) => item._id)
            setArticleIds(essayArr)
          }
        })
      }
    );
  };
  //TODO 列表点赞功能
  // 点赞
  const handleLike = (articleId: string) => {
    // 获取id 根据id判断效果是否显示
    setIsLikeId(articleId)
    setTimeout(() => {
      setIsLikeId("")
    }, 500)
    const articleFind = list?.find(item => item._id === articleId)
    const articleName = articleFind?.title
    props.BlogActions.asyncLikeCreateAction({
      articleId: articleId,
      articleName: articleName,
      userId: loginInfo._id,
      userName: loginInfo.username,
      userAvatar: loginInfo.avatar,
      likeNumber: 1,
      id: loginInfo._id,
    }).then((res: any) => {
      if (res.code === 0) {
        let category, tag;
        Boolean(c) === false ? (category = '') : (category = c);
        Boolean(t) === false ? (tag = '') : (tag = t);
        props.BlogActions.asyncArticleListAction(currentPage, pageSize, 1, 1, category, tag).then(
          (res: ArticleList) => {
            // 获取文章
            let { data, totalCount, page, pageSize } = res.data as unknown as ArticleList;
            let articleData = data
            setList(articleData);
            setTotal(totalCount);
            setCurrentPage(page);
            setPageSize(pageSize);
            // 获取点赞信息
            props.BlogActions.asyncLikeListAction().then((res: any) => {
              let { data } = res
              // 获取登录态
              let isLoginInfo = localStorage.getItem('zhj')
              if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
                const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as object | any;
                setLoginInfo(token)
                setLoginStatus(true)
                const matchedObjects = [];
                for (const obj of data) {
                  const articleId = obj.articleId;
                  const matchedObj = articleData.find((item: any) => obj.userId === token?._id && item._id === articleId)
                  if (matchedObj) {
                    matchedObjects.push(matchedObj)
                  }
                }
                let essayArr = matchedObjects.map((item: any) => item._id)
                setArticleIds(essayArr)
              }
            })
          }
        );
      }
    });
  }
  // 禁止点击
  const handleCannot = () => {
    message.info({
      content: '温馨提示：当前用户未登录',
      icon: <SoundOutlined style={{ color: 'var(--bgcolor-social-default)' }} />,
      className: 'text-[var(--bgcolor-social-default)]'
    })
  }
  const handleTags = (name: string) => {
    props.history.push(`/rblog/tags?t=${name}`);
  };
  const handleCategory = (name: string) => {
    props.history.push(`/rblog/category?c=${name}`);
  };
  const handleArticle = (id: string) => {
    props.history.push(`/rblog/article/detail/${id}`);
  };
  return (
    // @ts-ignore
    <div ref={myRef} style={{ userSelect: "none" }}>
      {list.map((item) => {
        return (
          <div
            className="home_page rounded-2xl bg-base-100
            lg:transition-none lg:hover:-translate-x-0 lg:hover:scale-100 lg:hover:ring-1 lg:mx-5
            "
            key={item._id}
          >
            <div className="">
              <div className="flex items-center h-44 px-2 sm:h-28">
                {
                  item.cover === undefined || item.cover === "" ? "" : <div
                    className="flex items-center relative overflow-hidden ml-2 w-64 h-32 rounded-md cursor-pointer sm:hidden"
                  onClick={() => handleArticle(item._id)}
                >
                  {
                      item.cover === undefined || item.cover === "" ? "" : <LazyLoadImage src={item.cover} alt="Image" loading='lazy' effect="blur" className="image_page h-32 w-64" />
                  }
                </div>
                }
                <div className="flex flex-col h-32 w-full lg:w-full lg:h-24">
                  <div
                    className={`${item.cover === undefined || item.cover === "" ? 'flex flex-col items-center px-2 text-xl cursor-pointer' : 'flex flex-col px-2 text-xl cursor-pointer'}`}
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
                      <p className="px-2 h-12 pt-2 tracking-wider line-clamp-2 overflow-hidden lg:h-12">
                        {item.introduction}
                      </p>
                    </div>
                    <div className="flex items-center justify-between h-8 px-2 lg:pt-1">
                      <div className="">
                        <span
                          className="inline-block w-auto  text-center leading-6 px-1"
                          style={{ userSelect: 'none' }}
                        >
                          {dayjs(item.createTime * 1000).format('YYYY-MM-DD')}
                        </span>
                      </div>
                      <div className="flex items-center h-10 w-auto">
                        <p className="flex items-center sm:hidden">
                          <svg className="icon w-7 h-7" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="101585"><path d="M110.933333 708.266667c-12.8 12.8-12.8 34.133333 0 46.933333 81.066667 93.866667 204.8 149.333333 337.066667 149.333333 132.266667 0 251.733333-55.466667 341.333333-157.866666 55.466667-64 85.333333-149.333333 85.333334-238.933334 0-89.6-29.866667-174.933333-81.066667-238.933333 0-4.266667-4.266667-4.266667-4.266667-8.533333-4.266667-4.266667-4.266667-12.8 0-17.066667l55.466667-59.733333c4.266667-4.266667 4.266667-12.8 0-17.066667l-17.066667-21.333333c-4.266667-4.266667-17.066667-4.266667-21.333333 0L746.666667 213.333333c-4.266667 4.266667-12.8 4.266667-21.333334 0-42.666667-29.866667-93.866667-42.666667-145.066666-42.666666-76.8 0-149.333333 34.133333-204.8 98.133333-55.466667 64-89.6 136.533333-128 209.066667-34.133333 76.8-72.533333 153.6-136.533334 230.4z m469.333334-499.2c42.666667 0 85.333333 12.8 119.466666 34.133333 8.533333 4.266667 8.533333 12.8 4.266667 17.066667L605.866667 384c-8.533333 12.8 8.533333 29.866667 21.333333 17.066667l106.666667-115.2c4.266667-4.266667 12.8-4.266667 17.066666 0l4.266667 4.266666c46.933333 55.466667 72.533333 132.266667 72.533333 209.066667 0 81.066667-25.6 153.6-72.533333 209.066667-81.066667 93.866667-192 145.066667-315.733333 145.066666-115.2 0-221.866667-46.933333-298.666667-123.733333-4.266667-4.266667-4.266667-12.8 0-17.066667 59.733333-76.8 98.133333-149.333333 136.533333-226.133333 38.4-59.733333 72.533333-128 123.733334-187.733333 46.933333-55.466667 110.933333-89.6 179.2-89.6z" fill="var(--bgcolor-social-default)" p-id="101586"></path></svg>
                          {/* 标签: */}
                          {item.tags.map((it, i) => {
                            return (
                              <span
                                className="inline-block w-auto px-2 h-6  text-center leading-6 ml-1 rounded-md  cursor-pointer text-[var(--article-content-tags-font)] bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500"
                                key={it}
                                onClick={() => handleTags(it)}
                              >
                                {it}
                              </span>
                            );
                          })}
                        </p>
                        {/* 分类 */}
                        <p
                          className="flex items-center ml-1 sm:hidden"
                          onClick={() => handleCategory(item.categories)}
                        >
                          <svg className="icon w-7 h-7" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17664" ><path d="M79.857 379.52433333l419.967 230.272a26.925 26.925 0 0 0 12.972 3.324c4.409 0 8.809-1.076 12.814-3.237l415.892-224.366a26.984 26.984 0 0 0 14.167-23.653 26.973 26.973 0 0 0-14.009-23.749L521.694 107.84533333a26.967 26.967 0 0 0-25.787-0.088L80.015 332.12233333a26.984 26.984 0 0 0-14.167 23.653 26.973 26.973 0 0 0 14.009 23.749z m428.759-217.308l363.598 199.365-359.312 193.844-363.598-199.365 359.312-193.844z" fill='var(--bgcolor-social-default)' p-id="17665"></path><path d="M81.139 561.57833333l419.976 230.272a26.925 26.925 0 0 0 12.972 3.324c4.409 0 8.809-1.076 12.814-3.237l415.892-224.366c13.113-7.075 18.005-23.442 10.935-36.555-7.079-13.113-23.442-18.023-36.564-10.935L514.193 737.47933333 107.084 514.26433333c-13.087-7.171-29.467-2.376-36.634 10.685-7.158 13.064-2.38 29.466 10.689 36.629z" fill='var(--bgcolor-social-default)' p-id="17666"></path><path d="M954.914 698.24533333c-7.079-13.117-23.442-18.027-36.564-10.935L515.379 904.70733333 108.27 681.49233333c-13.087-7.162-29.467-2.376-36.634 10.685-7.158 13.065-2.38 29.467 10.689 36.629l419.976 230.272a26.925 26.925 0 0 0 12.972 3.324c4.409 0 8.809-1.076 12.814-3.237l415.892-224.366c13.113-7.074 18.005-23.441 10.935-36.554z" fill='var(--bgcolor-social-default)' p-id="17667"></path></svg>
                          <span className="inline-block w-auto h-6 text-center  leading-6 px-2 mx-1 rounded-md text-[var(--article-content-tags-font)] bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
                            {item.categories}
                          </span>
                        </p>
                        {/* 点赞 */}
                        {
                          loginStatus === false ? <div className="mx-1 flex items-center cursor-pointer" style={{ userSelect: 'none' }} onClick={handleCannot}>
                            <span className="pr-1">
                              <svg className="icon w-7 h-7 lg:w-6 lg:h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62431"><path d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" fill="var(--bgcolor-social-default)" p-id="62432"></path><path d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z" fill="var(--bgcolor-social-default)" p-id="62433"></path><path d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z" fill="var(--bgcolor-social-default)" p-id="62434"></path></svg>
                            </span>
                            <span>{item.like}</span>
                          </div> : <div className="mx-1 flex items-center cursor-pointer" style={{ userSelect: 'none' }} onClick={() => handleLike(item._id)}>
                            {
                              articleIds?.includes(item._id) ? <span className="pr-1">
                                <svg className="icon w-7 h-7 mb-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62841"><path d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z" p-id="62842" fill="#d81e06"></path></svg>
                              </span> : <span className="pr-1">
                                <svg className="icon w-7 h-7 lg:w-6 lg:h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62431"><path d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" fill="var(--bgcolor-social-default)" p-id="62432"></path><path d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z" fill="var(--bgcolor-social-default)" p-id="62433"></path><path d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z" fill="var(--bgcolor-social-default)" p-id="62434"></path></svg>
                              </span>
                            }
                              <span>{item.like}</span>
                              {
                                isLikeId === item._id && (
                                  <div className="emoji-container">
                                    <svg className="icon w-7 h-7 mb-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62841"><path d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z" p-id="62842" fill="#d81e06"></path></svg>
                                  </div>
                                )
                              }
                            </div>
                        }
                        {/* 评论 */}
                        <p className="mx-1  flex items-center cursor-pointer" style={{ userSelect: 'none' }} onClick={() => handleArticle(item._id)}>
                          <span className="pr-1">
                            <svg className="icon w-7 h-7 pt-1 lg:w-5 lg:h-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6730" ><path d="M291.636 385.404c-30.49 0-55.207 25.633-55.207 57.266 0 31.637 24.717 57.272 55.207 57.272 30.486 0 55.203-25.635 55.203-57.272 0-31.632-24.717-57.266-55.203-57.266zM512.461 385.404c-30.49 0-55.208 25.633-55.208 57.266 0 31.637 24.722 57.272 55.208 57.272 30.486 0 55.204-25.635 55.204-57.272 0-31.632-24.718-57.266-55.204-57.266zM733.287 385.404c-30.492 0-55.208 25.633-55.208 57.266 0 31.637 24.716 57.272 55.208 57.272 30.486 0 55.202-25.635 55.202-57.272 0-31.632-24.716-57.266-55.202-57.266z" fill="var(--bgcolor-social-default)" p-id="6731"></path><path d="M843.697 99.077H181.221c-60.972 0-110.41 51.287-110.41 114.539v429.487c0 63.256 50.543 121.56 112.92 121.56h168.257c29.33 31.245 150.716 156.912 150.716 156.912 5.389 5.606 14.124 5.606 19.514 0 0 0 88.87-100.764 146.775-156.912h172.193c62.376 0 112.92-58.308 112.92-121.56V213.615c0.001-63.252-49.433-114.538-110.409-114.538z m55.754 544.221c0 31.669-26.565 64.899-57.799 64.899H672.075c-20.543 0-39.009 21.123-39.009 21.123L514 852.815 394.955 729.32s-22.676-21.123-42.112-21.123H183.267c-31.235 0-57.794-33.23-57.794-64.899V213.205c0-31.677 24.751-57.353 55.28-57.353h663.411c30.53 0 55.287 25.676 55.287 57.353v430.093z" fill="var(--bgcolor-social-default)" p-id="6732"></path></svg>
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
        );
      })}
      <MyPagination
        pageSize={pageSize}
        currentPage={currentPage}
        total={total}
        onChange={onChangePage}
      ></MyPagination>
    </div>
  );
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(withRouter(Content));
