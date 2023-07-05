import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import dayjs from 'dayjs';
import PageDesc from '@/components/sidemenu/PageDesc';
import { ArticleList } from '@/types/comm'
const TimeLine = (props: any) => {
  // 文章列表
  const [list, setList] = useState<any>([]);
  // 滚动位置
  const myRef = React.useRef();
  useEffect(() => {
    if (myRef.current) {
      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);
  // 获取文章列表数据
  useEffect(() => {
    props.BlogActions.asyncArticleAllListAction(1, 1).then((res: ArticleList) => {
      // 获取文章
      let { data } = res.data as unknown as ArticleList;
      // 日期排序
      let sortTime = data.sort((curr: any, prev: any) => {
        return prev.createTime - curr.createTime;
      });
      // 格式化日期
      sortTime.map((item: any) => {
        item.createYear = dayjs(item.createTime * 1000).format('YYYY');
        item.createTime = dayjs(item.createTime * 1000).format('MM-DD');
      });
      // 分组
      let groupedBy = [];
      for (const item of data) {
        if (groupedBy[item.createYear]) {
          groupedBy[item.createYear].push(item);
        } else {
          groupedBy[item.createYear] = [item];
        }
      }
      // 数据处理
      let newArr = [];
      for (let i in groupedBy) {
        newArr.push({
          year: i,
          yearData: groupedBy[i],
        });
      }

      // 根据年份排序
      let sortData = newArr.sort((curr: any, prev: any) => {
        return prev.year - curr.year;
      });
      setList(sortData);
    });
  }, [props.BlogActions]);
  // 点击文章跳转到详情页面
  const handleClickTime = (id: string) => {
    props.history.push(`/rblog/article/detail/${id}`);
  };
  return (
    <div
      className="flex items-end flex-col w-1200 mx-auto pb-5  lg:w-full sm:w-full lg:mx-5"
      // @ts-ignore
      ref={myRef}
      style={{ userSelect: "none" }}
    >
      <PageDesc title="时间线" />
      <div className="flex justify-center w-1000 min-h-screen mx-auto my-8  bg-base-100 rounded-2xl lg:w-full sm:w-full">
        {list.map((item: any) => {
          return (
            <div key={item} className="lg:w-full lg:px-5">
              <p className="p-3 text-2xl" key={item}>
                {item.year}
              </p>
              <p className="w-900 border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full"></p>
              {item.yearData.map((it: any) => {
                return (
                  <div
                    key={it._id}
                    className="flex items-center text-xl h-10 font-medium rounded-xl my-1 cursor-pointer hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 lg:w-full sm:w-full"
                    onClick={() => handleClickTime(it._id)}
                  >
                    <p className="text-sm pl-2 lg:w-12 lg:h-5 lg:pl-1 lg:pr-0">{it.createTime}</p>
                    <p className="text-sm pl-2">{it.title}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(TimeLine);
