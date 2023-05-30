import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import { withRouter } from 'react-router-dom';
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
                      <p className="px-2 h-12 pt-2 tracking-wider line-clamp-2 overflow-hidden lg:h-12">
                        {item.introduction}
                      </p>
                    </div>
                    <div className="flex items-center justify-between h-9 px-2">
                      <div className="flex">
                        <span
                          className={`h-auto w-10 bg-base-200 text-center rounded-md ${item.isTop === 1 ? 'block' : 'hidden'}`}
                          style={{ userSelect: 'none' }}
                        >置顶</span>
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
                                className="inline-block w-auto px-2 h-6 text-center leading-6 ml-1 rounded-md bg-base-200 cursor-pointer hover:bg-base-300 hover:transition hover:duration-500"
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
                          <span className="inline-block w-auto h-6 text-center leading-6 px-2 mx-1 bg-base-200 rounded-md hover:bg-base-300 hover:transition hover:duration-500  cursor-pointer z-11">
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
