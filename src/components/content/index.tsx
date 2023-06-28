import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import './index.css'
import qs from 'qs';
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
      (res: ArticleList) => {
        // 获取文章
        let { data, totalCount, page, pageSize } = res.data as unknown as ArticleList;
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
  const onChangePage = (page: number, pageSize: number) => {
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
      (res: ArticleList) => {
        // 获取列表数据
        let { data } = res.data as unknown as ArticleList;
        setList(data);
        // 切换行
        setCurrentPage(page);
        // 根据页面数据显示页码
        setPageSize(pageSize);
      }
    );
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
                          <svg className="icon w-7 h-7" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="89866"><path d="M992 512c0-12-6-24-18-30l-108-60 108-60c12 0 18-12 18-30 0-12-6-24-18-30L530 68c-12-6-24-6-30 0L50 302c-12 6-18 18-18 30s6 24 18 30l108 60-108 60c-12 6-18 18-18 30s6 24 18 30l108 60-108 60c-12 0-18 12-18 30 0 12 6 24 18 30l444 234c6 0 12 6 18 6 6 0 12 0 18-6l444-234c12-6 18-18 18-30s-6-24-18-30l-108-60 108-60c12-6 18-18 18-30zM140 332L512 140 884 332 512 530 140 332z m744 360L512 884 140 692l90-48 264 138c6 0 12 6 18 6 6 0 12 0 18-6l264-138 90 48z m-372 18L140 512l90-48 264 138c6 0 12 6 18 6 6 0 12 0 18-6l264-138 90 48L512 710z" fill='var(--bgcolor-social-default)' p-id="89867"></path></svg>
                          <span className="inline-block w-auto h-6 text-center  leading-6 px-2 mx-1 rounded-md text-[var(--article-content-tags-font)] bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
                            {item.categories}
                          </span>
                        </p>
                        {/* 点赞 */}
                        <p className="mx-1 flex items-center" style={{ userSelect: 'none' }}>
                          <span className="pr-1">
                            <svg className="icon w-7 h-7" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62431"><path d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" fill="var(--bgcolor-social-default)" p-id="62432"></path><path d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z" fill="var(--bgcolor-social-default)" p-id="62433"></path><path d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z" fill="var(--bgcolor-social-default)" p-id="62434"></path></svg>
                          </span>
                          <span>{item.like}</span>
                        </p>
                        {/* 评论 */}
                        <p className="mx-1  flex items-center" style={{ userSelect: 'none' }}>
                          <span className="pr-1">
                            <svg
                              className="icon w-6 h-6 pt-1"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="82775"
                            ><path d="M481.578667 968.832l-157.909334-158.293333H85.418667A85.290667 85.290667 0 0 1 0 725.12L0.426667 128.042667C0.426667 80.768 38.4 42.666667 85.845333 42.666667h852.778667c47.189333 0 85.418667 38.101333 85.376 85.418666l-0.426667 597.12c0 47.146667-38.229333 85.333333-85.376 85.333334h-237.781333l-158.549333 158.293333a42.624 42.624 0 0 1-60.288 0z m456.704-243.712L938.666667 128.042667s-852.906667-0.128-852.906667 0.042666c0 0-0.384 597.077333-0.298667 597.077334H341.333333c11.306667 0 22.186667 4.48 30.165334 12.501333l140.330666 140.629333 140.8-140.672a42.624 42.624 0 0 1 30.165334-12.458666h255.488zM277.333333 512a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m234.666667 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m234.666667 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128z" fill="var(--bgcolor-social-default)" p-id="82776"></path></svg>
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
