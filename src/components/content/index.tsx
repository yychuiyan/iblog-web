import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import { withRouter, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import qs from 'qs';

const Content = (props: any) => {
  // 文章列表
  const [list, setList] = useState([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(8);
  // 滚动位置
  const myRef = React.useRef();
  const { c } = qs.parse(props.location.search.slice(1));
  const { t } = qs.parse(props.location.search.slice(1));
  // 获取文章列表数据
  useEffect(() => {
    let category, tag;
    Boolean(c) === false ? (category = '') : (category = c);
    Boolean(t) === false ? (tag = '') : (tag = t);
    props.BlogActions.asyncArticleListAction(currentPage, pageSize, 1, 1, category, tag).then(
      (res: any) => {
        // 获取文章
        let { data, totalCount, page, pageSize } = res.data;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      }
    );
    window.scroll({
      //@ts-ignore
      top: myRef.current.offsetTop - 80 || 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage, pageSize, props.BlogActions, props.location.search]);
  // 跳转页数
  const onChangePage = (page: any, pageSize: any) => {
    // 滚动到顶部
    if (myRef.current) {
      // window.scrollTo(0, myRef.current.offsetTop || 0);
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
      (res: any) => {
        // 获取列表数据
        let { data } = res.data;
        setList(data);
        // 切换行
        setCurrentPage(page);
        // 根据页面数据显示页码
        setPageSize(pageSize);
      }
    );
  };
  const handleTags = (name: any) => {
    props.history.push(`/rblog/tags?t=${name}`);
  };
  const handleCategory = (name: any) => {
    props.history.push(`/rblog/category?c=${name}`);
  };
  const handleArticle = (id: any) => {
    props.history.push(`/rblog/article/detail/${id}`);
  };
  return (
    // @ts-ignore
    <div ref={myRef}>
      {list.map((item: any) => {
        return (
          <div
            className="
            mb-5 rounded-2xl bg-base-100 transition duration-500 ease-in-out transform hover:scale-x-[102%] hover:scale-y-[102%]
            lg:transition-none lg:hover:-translate-x-0 lg:hover:scale-100 lg:hover:ring-1 lg:mx-5
            "
            key={item._id}
          >
            <div className="">
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
                    <div className="flex items-center justify-between h-8 px-2">
                      <div className="">
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

                          {item.tags.map((it: any, i: any) => {
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(withRouter(Content));
