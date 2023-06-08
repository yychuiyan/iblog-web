import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsUpToLine
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
interface DataType {
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
  isTop: any;
  data: DataType[]
}
const Content = (props: any) => {
  // 文章列表
  const [list, setList] = useState<DataType[]>([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(10)
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 滚动位置
  const myRef = React.useRef();
  // 获取全部数据
  useEffect(() => {
    props.BlogActions.asyncArticleAllListAction(1, 1).then((res: ArticleList) => {
      let { data } = res.data as unknown as ArticleList;

      let topData = data.map((item) => {
        return {
          ...item,
          isTop: Number(item.isTop)
        }
      })
      // 排序
      topData.sort((prev: any, curr: any) => {
        return curr.isTop - prev.isTop
      })
      setTotal(topData.length);
      setList(topData);

    });
  }, [props.BlogActions]);
  // 跳转页数
  const onChangePage = (page: number) => {
    // 滚动到顶部
    if (myRef.current) {
      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }

    // 重新调用接口将参数传递过去
    if (page <= 1) {
      setMinVal(0)
      setMaxVal(10)
      setCurrentPage(page)
      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 90 || 0,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      setMinVal((page - 1) * 10)
      setMaxVal((page - 1) * 10 + 10)
      setCurrentPage(page)
      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };
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
    <div ref={myRef}>
      {list.slice(minVal, maxVal).map((item: DataType) => {
        return (
          <div
            className="
            mb-5 rounded-2xl bg-base-100 transition duration-500 ease-in-out transform hover:scale-x-[102%] hover:scale-y-[102%]
            lg:transition-none lg:hover:-translate-x-0 lg:hover:scale-100 lg:hover:ring-1 lg:mx-5
            "
            key={item._id}
          >
            <div>
              <div className="flex items-center h-44 px-2 sm:h-28">
                <span
                  className={` absolute top-0 left-0 h-au.toExponential(fractionDigits)  text-center rounded-md ${item.isTop === 1 ? 'block' : 'hidden'}`}
                  style={{ userSelect: 'none' }}
                >
                  {/* 置顶 */}
                  <svg
                    // @ts-ignore
                    t="1686202476885"
                    className="icon"
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4777" width="40" height="40"><path d="M80.96 449.194667l37.696-37.717334 19.626667 19.605334-37.717334 37.717333zM197.205333 541.44l116.16-116.138667 13.568 13.568-116.16 116.16zM220.565333 565.162667l116.16-116.16 13.568 13.589333-116.16 116.138667zM173.845333 517.738667l116.16-116.16 13.568 13.589333-116.16 116.138667zM245.354667 587.477333l116.202666-116.096 13.568 13.589334-116.202666 116.096z" fill="var(--article-content-top)" p-id="4778"></path><path d="M339.2 0L0 345.6V1024L1024 0H339.2z m-115.2 283.733333l46.933333 46.933334-14.933333 12.8-4.266667-4.266667-140.8 140.8 4.266667 4.266667-14.933333 14.933333-46.933334-46.933333 170.666667-168.533334z m2.133333 375.466667l-12.8-12.8 29.866667-29.866667L149.333333 520.533333l64-64-12.8-12.8L108.8 533.333333l-10.666667-10.666666 89.6-89.6-10.666666-10.666667 14.933333-14.933333 10.666667 10.666666 91.733333-91.733333 10.666667 10.666667-91.733334 91.733333 12.8 12.8 68.266667-68.266667 96 96 27.733333-27.733333 12.8 12.8-204.8 204.8z m232.533334-236.8l-17.066667 17.066667c-6.4-6.4-14.933333-10.666667-21.333333-14.933334 8.533333-4.266667 14.933333-10.666667 21.333333-17.066666 6.4-6.4 6.4-12.8 0-19.2l-136.533333-136.533334-34.133334 34.133334-14.933333-17.066667L332.8 192l14.933333 14.933333-25.6 27.733334 138.666667 138.666666c14.933333 14.933333 14.933333 32-2.133333 49.066667z m-81.066667-200.533333l38.4-38.4-21.333333-34.133334-46.933334 46.933334-14.933333-14.933334 123.733333-123.733333 12.8 17.066667-59.733333 59.733333 21.333333 34.133333 57.6-57.6 98.133334 98.133334-14.933334 14.933333-83.2-83.2-78.933333 78.933333 85.333333 85.333334-14.933333 14.933333-102.4-98.133333z m138.666667 162.133333c-6.4-2.133333-14.933333-4.266667-25.6-4.266667 19.2-34.133333 25.6-61.866667 23.466666-85.333333-2.133333-21.333333-17.066667-44.8-42.666666-70.4L448 200.533333l14.933333-14.933333 23.466667 23.466667c17.066667 17.066667 29.866667 34.133333 38.4 49.066666 38.4-8.533333 74.666667-14.933333 106.666667-19.2l2.133333 25.6c-34.133333 2.133333-68.266667 8.533333-100.266667 14.933334 2.133333 4.266667 2.133333 8.533333 2.133334 12.8 6.4 23.466667 0 55.466667-19.2 91.733333z" fill="var(--article-content-top)" p-id="4779"></path><path d="M183.765333 346.965333l37.696-37.717333 19.626667 19.584-37.696 37.738667zM132.288 398.037333l37.76-37.674666 19.584 19.626666-37.738667 37.674667z" fill="var(--article-content-top)" p-id="4780"></path></svg>
                </span>
                <div
                  className="flex items-center ml-2 cursor-pointer sm:hidden"
                  onClick={() => handleArticle(item._id)}
                >
                  {
                    item.cover === undefined || item.cover === "" ? "" : <img
                    src={item.cover}
                    alt="文章图片"
                    className="w-56 h-32 rounded-md shadow-base bg-cover bg-no-repeat bg-center"
                  />
                  }
                </div>
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
                      <p className="px-2 h-12 pt-2 tracking-wider line-clamp-2 overflow-hidden text-[var(--article-content-default)] lg:h-12">
                        {item.introduction}
                      </p>
                    </div>
                    <div className="flex items-center justify-between h-9 px-2">
                      <div className="flex">

                        <span
                          className="inline-block w-auto  text-center leading-6 px-1"
                          style={{ userSelect: 'none' }}
                        >
                          {dayjs(item.createTime * 1000).format('YYYY-MM-DD')}
                        </span>
                      </div>
                      <div className="flex items-center h-10  w-auto">
                        {/* <span className="text-lg">点赞({item.like})</span> */}

                        <p className="flex items-center sm:hidden">
                          {/* 标签: */}

                          {item.tags.map((it, i) => {
                            return (
                              <span
                                className="inline-block w-auto px-2 h-6 text-center text-[var(--article-content-tags-font)] leading-6 ml-1 rounded-md bg-[var(--article-content-tags-bgcolor)] cursor-pointer hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500"
                                key={it}
                                onClick={() => handleTags(it)}
                              >
                                {it}
                              </span>
                            );
                          })}
                        </p>
                        <p
                          className="ml-1 sm:hidden"
                          onClick={() => handleCategory(item.categories)}
                        >
                          分类:
                          <span className="inline-block w-auto h-6 text-center leading-6 px-2 mx-1 text-base-100  rounded-md bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
                            {item.categories}
                          </span>
                        </p>
                        <p className="mx-1" style={{ userSelect: 'none' }}>
                          <span className="pr-1">评论:</span>
                          <span>({item.comment})</span>
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
