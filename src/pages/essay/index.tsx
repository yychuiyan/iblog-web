import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import dayjs from 'dayjs';
import PageDesc from '@/components/sidemenu/PageDesc';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Image, message } from 'antd';
import jwtDecode from 'jwt-decode';
import MarkDown from '@/components/markdown/MarkDownEssay';
import { SoundOutlined } from '@ant-design/icons';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FloatButton } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
interface CoverData {
  thumbUrl: string | undefined;
}
interface DataType {
  like: any | undefined;
  title: any;
  createTime: number;
  updateTime: string;
  content: string;
  cover?: any;
  _id: string;
}
interface EssayData {
  data: DataType[];
  totalCount: number;
  page: number;
  pageSize: number;
}
const Essay = (props: any) => {
  // 随笔列表
  const [list, setList] = useState<any>([]);
  // 分页随笔列表数据
  const [essayList, setEssayList] = useState<any>({});
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 滚动位置
  const myRef = React.useRef();
  // 设置是否可上拉
  const [hasMore, setHasMore] = useState(true);
  // 登录状态
  const [loginStatus, setLoginStatus] = useState(false)
  // 登录数据
  let [loginInfo, setLoginInfo] = useState<any>()
  // 随笔ID存储的数组
  const [essayId, setEssayId] = useState<any>([])
  // 变量来控制滚动加载的节流
  const [isLoading, setIsLoading] = useState(false);
  // 点赞时的单个id
  const [isLikeId, setIsLikeId] = useState("")
  // 回到顶部
  useEffect(() => {
    if (myRef.current) {
      // window.scrollTo(0, myRef.current.offsetTop || 0);
      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);
  // 登录信息 解析token
  useEffect(() => {
    // 获取登录态
    let isLoginInfo = localStorage.getItem('zhj')
    if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
      const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as object | any;
      setLoginInfo(token)
      setLoginStatus(true)
    }
  }, [localStorage])
  // 获取随笔列表数据
  useEffect(() => {
    setHasMore(true);
    props.BlogActions.asyncEssayListAction(currentPage > 1 ? 1 : currentPage, pageSize, '').then((res: EssayData) => {
      // 获取随笔
      let { data, totalCount, page, pageSize } = res.data as unknown as EssayData;
      let newData = data.map((item) => {
        if (Boolean(item.cover)) {
          return {
            createTime: item.createTime,
            updateTime: item.updateTime,
            content: item.content,
            cover: item.cover,
            like: item.like,
            _id: item._id,
          };
        } else {
          return {
            createTime: item.createTime,
            updateTime: item.updateTime,
            content: item.content,
            like: item.like,
            _id: item._id,
          };
        }
      });
      // 获取点赞信息
      props.BlogActions.asyncEssayLikeListAction().then((res: any) => {
        let { data } = res
        // 获取登录态
        let isLoginInfo = localStorage.getItem('zhj')
        if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
          const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as object | any;
          setLoginInfo(token)
          setLoginStatus(true)
          const matchedObjects = [];
          for (const obj of data) {
            const essayId = obj.essayId;
            const matchedObj = newData.find((item: any) => obj.userId === token?._id && item._id === essayId)
            if (matchedObj) {
              matchedObjects.push(matchedObj)
            }
          }
          let essayArr = matchedObjects.map((item: any) => item._id)
          setEssayId(essayArr)
        }
      })
      setList(newData);
      setEssayList(res.data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [props.BlogActions]);

  // todo 初始化时判断是否已存在
  // 点赞
  const handleLike = (essayId: string) => {
    // 获取id 根据id判断效果是否显示
    setIsLikeId(essayId)
    setTimeout(() => {
      setIsLikeId("")
    }, 500)
    // 创建点赞
    props.BlogActions.asyncEssayLikeCreateAction({
      essayId: essayId,
      userId: loginInfo._id,
      userName: loginInfo.username,
      userAvatar: loginInfo.avatar,
      likeNumber: 1,
      id: loginInfo._id,
    }).then((res: any) => {
      if (res.code === 0) {
        // 随笔列表
        props.BlogActions.asyncEssayListAction('', '', '').then((res: EssayData) => {
          // 获取随笔
          let { data } = res.data as unknown as EssayData;
          let newData = data.map((item) => {
            if (Boolean(item.cover)) {
              return {
                createTime: item.createTime,
                updateTime: item.updateTime,
                content: item.content,
                cover: item.cover,
                like: item.like,
                _id: item._id,
              };
            } else {
              return {
                createTime: item.createTime,
                updateTime: item.updateTime,
                content: item.content,
                like: item.like,
                _id: item._id,
              };
            }
          })
          setList(newData)
          // 获取点赞信息
          props.BlogActions.asyncEssayLikeListAction().then((res: any) => {
            let { data } = res
            // 获取登录态
            let isLoginInfo = localStorage.getItem('zhj')
            if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
              const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as object | any;
              setLoginInfo(token)
              setLoginStatus(true)
              const matchedObjects = [];
              for (const obj of data) {
                const essayId = obj.essayId;
                const matchedObj = newData.find((item: any) => obj.userId === token?._id && item._id === essayId)
                if (matchedObj) {
                  matchedObjects.push(matchedObj)
                }
              }
              let essayArr = matchedObjects.map((item: any) => item._id)
              setEssayId(essayArr)
            }
          })
        })
      }
    })
  }

  // 禁止点击
  const handleCannot = () => {
    message.info({
      content: '温馨提示：当前用户未登录',
      icon: <SoundOutlined style={{ color: 'var(--bgcolor-social-default)' }} />,
      className: 'text-[var(--bgcolor-social-default)]'
    })
  }
  useEffect(() => {
    fetchMoreData
  }, [currentPage])
  // 加载更多
  const fetchMoreData = () => {
    if (!hasMore || isLoading) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      props.BlogActions.asyncEssayListAction(currentPage + 1, pageSize, '').then((res: EssayData) => {
            // 获取随笔
          let { data } = res.data as unknown as EssayData;
          let newData = data.map((item) => {
            // return {
            if (Boolean(item.cover)) {
              return {
                createTime: item.createTime,
                updateTime: item.updateTime,
                content: item.content,
                cover: item.cover,
                like: item.like,
                _id: item._id,
              };
            } else {
              return {
                createTime: item.createTime,
                updateTime: item.updateTime,
                content: item.content,
                like: item.like,
                _id: item._id,
              };
            }
          });
        // 获取点赞信息
        props.BlogActions.asyncEssayListAction('', '', '').then((res: EssayData) => {
          // 获取随笔
          let { data, totalCount, page, pageSize } = res.data as unknown as EssayData;
          let newData = data.map((item) => {
            if (Boolean(item.cover)) {
              return {
                createTime: item.createTime,
                updateTime: item.updateTime,
                content: item.content,
                cover: item.cover,
                like: item.like,
                _id: item._id,
              };
            } else {
              return {
                createTime: item.createTime,
                updateTime: item.updateTime,
                content: item.content,
                like: item.like,
                _id: item._id,
              };
            }
          })
          setList(newData)
          // 获取点赞信息
          props.BlogActions.asyncEssayLikeListAction().then((res: any) => {
            let { data } = res
            // 获取登录态
            let isLoginInfo = localStorage.getItem('zhj')
            if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
              const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as object | any;
              setLoginInfo(token)
              setLoginStatus(true)
              const matchedObjects = [];
              for (const obj of data) {
                const essayId = obj.essayId;
                const matchedObj = newData.find((item: any) => obj.userId === token?._id && item._id === essayId)
                if (matchedObj) {
                  matchedObjects.push(matchedObj)
                }
              }
              let essayArr = matchedObjects.map((item: any) => item._id)
              setEssayId(essayArr)
            }
          })
        })
        setIsLoading(false);
        if (newData.length < pageSize) {
          setHasMore(false);
        }
        setList((prevList: any[]) => prevList.concat(newData));
        setCurrentPage(currentPage);
      });
    }, 1500);
  };

  return (
    // @ts-ignore
    <div className="w-1200 mx-auto  lg:mx-5 lg:w-full sm:w-full" ref={myRef}>
      <PageDesc title="随笔" />
      <div className="w-1000  mt-10 pt-5 pb-5 mx-auto bg-base-100 rounded-2xl  lg:w-full sm:w-full">
        {/* 无限滚动，实现上拉加载数据【注意：防止失效，一定要记得加高度。这儿的高度是我随便写的，实际高度是去css里改的】 */}
        <InfiniteScroll
          // 数据长度
          dataLength={list.length}
          next={fetchMoreData}
          // 是否还有可加载滴数据
          hasMore={hasMore}
          // 加载提示信息
          loader={
            <div className="mx-auto text-xl w-52 mt-5 bg-base-100 ">
              <p>正在努力加载中···</p>
            </div>
          }
          // 加载结束提示信息
          endMessage={<div className="divider text-xl mt-10" style={{ userSelect: 'none' }}>我也是有底线的~</div>}
        >
          {list.map((item: {
            _id: string;
            like: number; content: any; cover: CoverData[] | undefined; createTime: number;
          }, index: React.Key | null | undefined) => {
            return (
              <div
                className="relative left-16 h-auto pt-3
                lg:relative lg:left-[1rem] lg:float-left lg:w-full sm:w-full"
                key={index}
              >
                <div className="float-left w-16 h-16 mr-3 mt-2 lg:float-left">
                  <LazyLoadImage key={index} src="https://cos.yychuiyan.com/iblogs/avatar.webp" alt="Image" loading='lazy' effect="blur" className="w-16 h-16 rounded-xl" />
                </div>
                <div
                  className="flex flex-col mt-2 w-[790px] px-2 py-2 shadow-sm bg-base-200 rounded-xl hover:bg-base-300 hover:transition hover:duration-500 cursor-pointer
               lg:float-left lg:flex lg:w-4/5 sm:w-3/5
              "
                >
                  <div>
                    <div className="font-style mx-2 mb-2 text-lg" style={{ whiteSpace: 'pre-wrap' }}>
                      <MarkDown content={item.content} />
                      {/* {item.content} */}
                    </div>
                    {/* <Image src={cover.thumbUrl} key={index} width={190} height={180} style={{ marginRight: '5px' }} /> */}
                    {item.cover !== undefined ? (
                      <div className="ml-2 flex flex-row flex-wrap">
                        {
                          item.cover.map((cover: CoverData, index: number) => <Image src={cover.thumbUrl} key={index} width={190} height={180} style={{ marginRight: '5px' }} />
                          )
                        }
                      </div>
                    ) : (
                      <div className={`w-36`}></div>
                    )}
                  </div>
                  <div className='flex justify-between items-center' style={{ userSelect: "none" }}>
                    <p className="text-base flex justify-end mt-1 pl-2  lg:hidden">
                      {dayjs(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
                    </p>
                    <p className="text-base flex justify-end mt-1 pl-2 hidden lg:block">
                      {dayjs(item.createTime * 1000).format('YYYY-MM-DD')}
                    </p>
                    <div className="text-base flex justify-end mt-1 pr-2">

                      {
                        loginStatus === false ?
                          <div className='flex items-center ml-2 cursor-pointer text-[var(--bgcolor-navbar-click)] text-lg' onClick={handleCannot}>
                            <svg className="icon w-7 h-7 mb-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62431"><path d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" fill="var(--bgcolor-social-default)" p-id="62432"></path><path d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z" fill="var(--bgcolor-social-default)" p-id="62433"></path><path d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z" fill="var(--bgcolor-social-default)" p-id="62434"></path></svg>
                            {/* 点赞 */}
                            <span>({item.like})</span>
                          </div> :
                          <div className='flex items-center ml-2 cursor-pointer text-[var(--bgcolor-navbar-click)] text-base' onClick={() => handleLike(item._id)}>
                            {
                              essayId?.includes(item._id) ? <svg className="icon w-7 h-7 mb-1  mr-[2px]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62841"><path d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z" p-id="62842" fill="#d81e06"></path></svg>
                                :
                                <svg className="icon w-7 h-7 mb-1  mr-[2px]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62431"><path d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" fill="var(--bgcolor-social-default)" p-id="62432"></path><path d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z" fill="var(--bgcolor-social-default)" p-id="62433"></path><path d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z" fill="var(--bgcolor-social-default)" p-id="62434"></path></svg>
                            }
                            <span>({item.like})</span>
                            {
                              isLikeId === item._id && (
                                <div className="emoji_detail_container">
                                  <svg className="icon w-7 h-7 mb-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62841"><path d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z" p-id="62842" fill="#d81e06"></path></svg>
                                </div>
                              )
                            }
                          </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
      <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Essay);
