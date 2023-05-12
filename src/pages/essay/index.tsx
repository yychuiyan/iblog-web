import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import dayjs from 'dayjs';
import PageDesc from '@/components/sidemenu/PageDesc';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Image } from 'antd';
import MarkDown from '@/components/markdown/MarkDownEssay';
const Essay = (props: any) => {
  // 随笔列表
  const [list, setList] = useState([]);
  // 分页随笔列表数据
  const [essayList, setEssayList] = useState<any>({});
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  let [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 滚动位置
  const myRef = React.useRef();
  // 设置是否可上拉
  const [hasMore, setHashMore] = useState(true);
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
  // 获取随笔列表数据
  useEffect(() => {
    setHashMore(true);
    setCurrentPage(1);
    props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: any) => {
      // 获取随笔
      let { data, totalCount, page, pageSize } = res.data;
      console.log("data", data);
      let newData = data.map((item: any) => {
        // return {
        if (Boolean(item.cover)) {
          return {
            createTime: item.createTime,
            updateTime: item.updateTime,
            content: item.content,
            cover: item.cover,
            _id: item._id,
          };
        } else {
          return {
            createTime: item.createTime,
            updateTime: item.updateTime,
            content: item.content,
            _id: item._id,
          };
        }
      });
      setList(newData);
      setEssayList(res.data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [props.BlogActions]);

  const fetchMoreData = () => {
    let data = essayList.data
    if (data === undefined) {
      if (data.length < essayList.pageSize) {
        setHashMore(false);
      }
    }
    setHashMore(false);
    setTimeout(() => {
      if (hasMore) {
        let i = 1;
        setCurrentPage((currentPage += i));
        props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: any) => {
          // 获取随笔
          let { data } = res.data;
          let newData = data.map((item: any) => {
            // return {
            if (Boolean(item.cover)) {
              return {
                createTime: item.createTime,
                updateTime: item.updateTime,
                content: item.content,
                cover: item.cover,
                _id: item._id,
              };
            } else {
              return {
                createTime: item.createTime,
                updateTime: item.updateTime,
                content: item.content,
                _id: item._id,
              };
            }
          });
          setList(list.concat(newData));
          setEssayList(res.data);
        });
      }
    }, 500);
  };

  return (
    // @ts-ignore
    <div className="w-1200 mx-auto  lg:mx-5 lg:w-full sm:w-full" ref={myRef}>
      <PageDesc title="随笔" />
      <div className="w-1000  mt-10 pt-5 pb-10 mx-auto bg-base-100 rounded-2xl  lg:w-full sm:w-full">
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
          endMessage={<div className="divider text-xl mt-10">我也是有底线的~</div>}
        >
          {list.map((item: any, index: any) => {
            return (
              <div
                className="relative left-16 h-auto pt-3
              lg:relative lg:left-10 lg:float-left lg:w-full sm:w-full"
                key={index}
              >
                <div className="float-left w-16 h-16 mr-3 mt-2 lg:float-left">
                  <img
                    src="https://cos.yychuiyan.com/iblogs/avatar.webp"
                    alt=""
                    className="w-16 h-16 rounded-xl"
                  />
                </div>
                <div
                  className="flex flex-col mt-2 w-[790px] p-2 shadow-sm bg-base-200 rounded-xl hover:bg-base-300 hover:transition hover:duration-500 cursor-pointer
               lg:float-left lg:flex lg:w-4/5 sm:w-3/5
              "
                >
                  <div>
                    <div className="font-style mx-2 mb-2 text-lg" style={{ whiteSpace: 'pre-wrap' }}>
                      <MarkDown content={item.content} />
                      {/* {item.content} */}
                    </div>
                    {item.cover !== undefined ? (
                      <div className="ml-2 flex flex-row flex-wrap">
                        {
                          item.cover.map((cover: any) => <Image src={cover.thumbUrl} width={190} height={180} style={{ marginRight: '5px' }} />)
                        }
                      </div>
                    ) : (
                      <div className={`w-36`}></div>
                    )}
                  </div>
                  <p className="ext-base flex justify-end mt-1">
                    {dayjs(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
                  </p>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Essay);
