import React, { useState, useEffect, useId, useRef } from 'react';
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
import { LikeFilled } from '@ant-design/icons';
import jwtDecode from 'jwt-decode';
import { Affix, FloatButton, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownShortWide,
  faArrowUpShortWide,
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
                  <div className="markdown-body  content lg:w-[calc(100%-38px)] lg:mx-auto">
                    <MarkDown content={item.content} />

                    {dataFilter.map((item) => {
                      return (
                        <div className="relative lg:top-5" key={item._id}>
                          <div
                            className="absolute h-16 -top-16  w-[calc(100%-0px)] text-lg
                            lg:w-full lg:flex-col lg:items-start lg:-top-20  sm:w-full
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
                              <p className='h-10 absolute right-0'>
                                <span className='ml-3 text-[var(--bgcolor-navbar-click)] text-base'>觉得文章还不错？给作者一个赞😉</span>
                                {
                                  loginStatus === false ?
                                    <span className='ml-2 cursor-pointer text-[var(--bgcolor-navbar-click)] text-base' onClick={handleCannot}><LikeFilled style={{ fontSize: '20px' }} />点赞({like})</span> :
                                    <span className='ml-2 cursor-pointer text-[var(--bgcolor-navbar-click)] text-base' onClick={handleLike}><LikeFilled style={{ fontSize: '20px' }} />{likeShow ? '已点赞' : '点赞'}({like})</span>
                                }
                              </p>
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
                  <div className='w-[300px]'>
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
            <Affix offsetTop={100}>
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
                    {/* 目录信息 */}
                    <div className='w-[320px]'>
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
              </div>
            </Affix>
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
