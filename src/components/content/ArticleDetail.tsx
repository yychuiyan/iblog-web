import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import dayjs from 'dayjs';
import Comment from '../comment';
import User from '../sidemenu/User';
import LastUpdate from '../sidemenu/LastUpdate';
import MarkNav from 'markdown-navbar'; // markdown 目录
import 'markdown-navbar/dist/navbar.css';
import MarkDown from '../markdown/MarkDown';
import jwtDecode from 'jwt-decode';
import { Affix, FloatButton, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTags,
  faFolder,
  faClock,
  faComments,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import CopyRight from '../copyright';
import './index.css';
interface DataType {
  like: any;
  updateTime: number;
  views: number;
  content: string;
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
  data: DataType[]
}

const ArticleDetail = (props: any) => {
  // 文章列表
  const [list, setList] = useState<DataType[]>([]);
  // 全部文章信息
  const [allData, setAllData] = useState<DataType[]>([]);
  // 目录展示隐藏
  const [navVisible, setNavVisible] = useState(false);
  // 当前展示的文章数据
  const [dataFilter, setDataFilter] = useState<DataType[]>([]);
  // 内容
  const [content, setContent] = useState('');
  // Like默认值
  let [like, setLike] = useState(0)
  // 登录数据
  let [loginInfo, setLoginInfo] = useState<any>()
  // 登录状态
  const [loginStatus, setLoginStatus] = useState(false)
  // 是否已点赞
  const [likeShow, setLikeShow] = useState(false)
  const markNavRef = useRef(null);
  // 获取文章列表数据
  useEffect(() => {
    let articleId = props.match.params.id;
    props.BlogActions.asyncArticleAllListAction(1, 1).then((res: ArticleList) => {
      // 获取文章
      let { data } = res.data as unknown as ArticleList;
      let dataFilter = data.filter((item) => item._id === articleId);
      setDataFilter(dataFilter);
      // 获取文章内容
      let content = dataFilter.map((item) => item.content).join('');
      setContent(content);
      // 访问量
      let view = parseInt(dataFilter.map((item) => (item.views = item.views + 1)).join(''));
      props.BlogActions.asyncArticleViewsAction({
        views: view,
        id: articleId,
      }).then((res: any) => {
        return res;
      });
      let like = parseInt(dataFilter.map((item) => item.like).join(''));
      setLike(like)
      setList(dataFilter);
      setAllData(data);
    });
  }, [props.match.params.id, props.BlogActions]);
  // 登录信息 解析token
  useEffect(() => {
    // 获取登录态
    let isLoginInfo = localStorage.getItem('zhj')
    if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
      const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as object | any;
      setLoginInfo(token)
      setLoginStatus(true)
    }
  }, [localStorage, setLikeShow, list])
  // 获取点赞信息
  props.BlogActions.asyncLikeListAction().then((res: any) => {
    const articleId = props.match.params.id;
    let { data } = res
    let filterLike = data.filter((item: any) => item.userId === loginInfo?._id && item.articleId === articleId)
    if (filterLike.length > 0) {
      // 存在点赞
      setLikeShow(true)
    }
  })
  // todo 初始化时判断是否已存在
  // 点赞
  const handleLike = () => {
    const articleId = props.match.params.id;
    const articleName = list.map(item => item.title).join('')
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
          message.success("谢谢支持~")
          setLike(like + 1)
          setLikeShow(true)
        }
    });
  }
  // 禁止点击
  const handleCannot = () => {
    message.warning('需要先登录哟~')
  }

  useEffect(() => {
    const handleScroll = () => {
      var scrollTopValue = document.documentElement.scrollTop
      if (scrollTopValue > 900) {
        //@ts-ignore
      const activeItem = document.querySelector('.markdown-navigation .title-anchor.active');
        if (activeItem) {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center w-1200 mx-auto  mt-20  sm:w-full "
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="w-full h-80 lg:h-60 lg:w-full">
        {list.map((item, index) => {
          return (
            <div key={item._id} style={{ userSelect: 'none' }}>
              <div className="flex justify-center items-center flex-col h-72 sm:h-52 sm:mb-16 ">
                <h2 className={`w-full text-center`}>
                  <span>{item.title}</span>
                </h2>
                <div className="flex items-center justify-center mt-2">
                  {/* <span>发布时间:</span> */}
                  <FontAwesomeIcon icon={faClock} size="lg" />
                  <span className="px-2 text-lg rounded-lg">
                    {dayjs(item.updateTime * 1000).format('YYYY-MM-DD') === `1970-01-01`
                      ? dayjs(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
                      : dayjs(item.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                  {/* <span>评论:</span> */}
                  <FontAwesomeIcon icon={faComments} size="lg" />
                  <span className="text-lg pl-2 pr-4">{item.comment}</span>
                  {/* <span>浏览量:</span> */}
                  <FontAwesomeIcon icon={faEye} />
                  <span className="text-lg pl-2">{item.views}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-between w-1200 lg:w-full sm:w-full">
        <article className="w-[calc(100%-320px)]  lg:w-full lg:mx-5 sm:w-full sm:mx-0">
          {list.map((item, index) => {
            return (
              <div key={item._id}>
                <div className="flex flex-row">
                  {/* 渲染 */}
                  <div className="markdown-body content lg:w-[calc(100%-38px)] lg:mx-auto">
                    <MarkDown content={item.content} />
                    {dataFilter.map((item) => {
                      return (
                        <div className="relative" key={item._id}>
                          <div
                            className="h-16  w-[calc(100%-0px)] text-lg
                            lg:w-full lg:flex-col lg:items-start  sm:w-full
                            "
                          >
                            <div className='flex lg:flex-wrap'>
                              <p className="pl-5 lg:h-4">
                                <FontAwesomeIcon icon={faFolder} />
                                <span className="inline-block w-auto h-6  text-center  text-md leading-6 mx-2 px-2  rounded-lg bg-base-200 cursor-pointer  hover:bg-base-300 hover:transition hover:duration-500">
                                  {item.categories}
                                </span>
                              </p>
                              <p className="lg:pl-5">
                                <FontAwesomeIcon icon={faTags} />
                                {item.tags.map((it, index) => (
                                  <span
                                    className="inline-block w-auto h-6 text-center text-md leading-6 ml-2 px-2  rounded-lg bg-base-200 cursor-pointer  hover:bg-base-300 hover:transition hover:duration-500"
                                    key={index}
                                  >
                                    {it}
                                  </span>
                                ))}
                              </p>
                            </div>
                            <div>
                              <div className='h-10 absolute right-0'>
                                <p className='ml-3 text-[var(--bgcolor-navbar-click)] text-base flex items-center'>
                                  <span>文章还不错？给作者一个赞~😉</span>
                                {
                                  loginStatus === false ?
                                      <span className='flex items-center ml-2 cursor-pointer text-[var(--bgcolor-navbar-click)] text-lg' onClick={handleCannot}>
                                        <svg className="icon w-7 h-7 mb-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62431"><path d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" fill="var(--bgcolor-social-default)" p-id="62432"></path><path d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z" fill="var(--bgcolor-social-default)" p-id="62433"></path><path d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z" fill="var(--bgcolor-social-default)" p-id="62434"></path></svg>
                                        {/* 点赞 */}
                                        ({like})
                                      </span> :
                                      <span className='flex items-center ml-2 cursor-pointer text-[var(--bgcolor-navbar-click)] text-base' onClick={handleLike}>
                                        {
                                          likeShow ? <svg className="icon w-7 h-7 mb-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62841"><path d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z" p-id="62842" fill="#d81e06"></path></svg>
                                            :
                                            <svg className="icon w-7 h-7 mb-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62431"><path d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" fill="var(--bgcolor-social-default)" p-id="62432"></path><path d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z" fill="var(--bgcolor-social-default)" p-id="62433"></path><path d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z" fill="var(--bgcolor-social-default)" p-id="62434"></path></svg>
                                        }
                                        ({like})
                                      </span>
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <CopyRight content={dataFilter.map((item) => item.title).join('')} />
                    <Comment title={list.map((item) => item.title)} />
                  </div>
                </div>
              </div>
            );
          })}
        </article>

        <aside className="w-300 lg:fixed lg:top-36 lg:right-0 lg:w-0">
          <User data={allData} />
          <LastUpdate data={allData} />
          <div>
            {/* PC目录 */}
            <Affix offsetTop={70} >
              <div className="flex flex-col   top-0 rounded-2xl bg-base-100 lg:hidden">
                <span></span>
                <div className="w-auto  bg-base-100 rounded-3xl">
                  <div
                    className="w-full  border border-solid border-b-none border-t-0 border-l-0 border-r-0"
                    style={{ color: 'var(--color-icon-default)' }}
                  >
                    <p className="flex items-center h-10 text-xl  px-3">目录</p>
                  </div>
                  {/* 目录信息 */}
                  <div className='w-[300px] '>
                    <MarkNav
                      className="markdown-nav"
                      source={content}
                      headingTopOffset={80}
                      ordered={true} //是否显示标题题号1,2等
                      // @ts-ignore
                      ref={markNavRef}
                      getHash={(node: any) => {
                        // 隐藏锚点后缀，只返回标题的 ID 部分
                        return node.getAttribute('id');
                      }}
                    />

                  </div>
                </div>
              </div>
            </Affix>
            {/* 移动端目录 */}
            {/* <Affix offsetTop={100}>
              <div
                className={` rounded-2xl bg-base-100 hidden lg:block lg:z-20 ${navVisible
                  ? 'lg:translate-x-full lg:transform lg:delay-200 lg:duration-200 lg:w-56 sm:w-52 lg:ease-in sm:translate-x-24'
                  : 'lg:translate-x-0 lg:transform lg:delay-200 lg:duration-200 lg:ease-in sm:w-0 sm:translate-x-72 sm:ml-3'
                  }`}
              >
                <div>
                  <div
                    className="absolute -left-10 cursor-pointer lg:-left-[16.5rem] sm:-left-[21.5rem] lg:top-0"
                    onClick={() => {
                      setNavVisible(!navVisible);
                    }}
                  >
                    {navVisible ? (
                      <FontAwesomeIcon icon={faArrowDownShortWide} size="2xl" />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUpShortWide} size="2xl" />
                    )}
                  </div>

                  <div
                    className={`w-72 rounded-3xl mx-auto bg-base-100 lg:relative lg:-left-[13.5rem] lg:w-56 sm:relative sm:-left-[18.5rem] sm:w-52`}
                  >
                    <div
                      className="w-full overflow-hidden border border-solid border-b-none border-t-0 border-l-0 border-r-0"
                      style={{ color: 'var(--color-icon-default)' }}
                    >
                      <p className="flex items-center h-10 text-xl  px-3">目录</p>
                    </div>
                    <div className='w-[320px]'>
                      <MarkNav
                        className="markdown-nav"
                        source={content}
                        headingTopOffset={80}
                        ordered={false}
                        // @ts-ignore
                        ref={markNavRef}
                        getHash={(node: any) => {
                          return node.getAttribute('id');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Affix> */}
          </div>
          <FloatButton.BackTop shape="square" />
        </aside>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(ArticleDetail);
