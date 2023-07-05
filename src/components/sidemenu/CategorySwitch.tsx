import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { CategoryData } from '@/types/comm';
const CategorySwitch = (props: any) => {
  // 获取路由
  const { c } = qs.parse(props.location.search.slice(1));
  // 列表
  const [categoryList, setCategoryList] = useState<any>([]);
  useEffect(() => {
    // 获取文章
    let data = props.data;
    let newList = data.map((item: CategoryData) => {
      return {
        categories: item.categories,
        _id: item._id,
      };
    });
    // 分类的数量汇总
    let obj = {};
    for (let i = 0; i < newList.length; i++) {
      let item = newList[i].categories;
      obj[item] = obj[item] + 1 || 1;
    }
    // 将对象封装成数组对象格式
    let newCategories = [];
    let key = Object.keys(obj); // 取出当前对象的索引
    let values = Object.values(obj); // 取出当前对象的值
    let i = 1;
    let arrObj = key.map((item, index) => {
      return {
        count: values[index], // values是一个数组，加index是为了拿到跟索引同个位置的值
        name: item,
        id: i++,
      };
    });
    newCategories = arrObj;
    setCategoryList(newCategories);
  }, [props.data]);

  // 路由跳转
  const handleCategory = (name: string) => {
    props.history.push(`/rblog/category?c=${name}`);
  };
  return (
    <div
      className="h-auto mb-5 overflow-hidden pb-3 bg-base-100 rounded-2xl mx-auto text-lg transition duration-500 ease-in-out  transform hover:translate-y-1 hover:scale-105
      lg:transition-none lg:hover:-translate-y-0 lg:hover:scale-100 lg:hover:ring-1 lg:mx-5
    "
      style={{ userSelect: "none" }}
    >
      <p
        className="flex py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
        <svg className="icon w-7 h-7 pr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="89866"><path d="M992 512c0-12-6-24-18-30l-108-60 108-60c12 0 18-12 18-30 0-12-6-24-18-30L530 68c-12-6-24-6-30 0L50 302c-12 6-18 18-18 30s6 24 18 30l108 60-108 60c-12 6-18 18-18 30s6 24 18 30l108 60-108 60c-12 0-18 12-18 30 0 12 6 24 18 30l444 234c6 0 12 6 18 6 6 0 12 0 18-6l444-234c12-6 18-18 18-30s-6-24-18-30l-108-60 108-60c12-6 18-18 18-30zM140 332L512 140 884 332 512 530 140 332z m744 360L512 884 140 692l90-48 264 138c6 0 12 6 18 6 6 0 12 0 18-6l264-138 90 48z m-372 18L140 512l90-48 264 138c6 0 12 6 18 6 6 0 12 0 18-6l264-138 90 48L512 710z" fill='var(--bgcolor-social-default)' p-id="89867"></path></svg>
        分类信息
      </p>
      <div className='w-[calc(100%+10px)] h-96 overflow-auto '>
        {categoryList.map((item: CategoryData, index: number) => {
          return (
            <p
              className={`flex justify-between  items-center${item.name === c
                ? ' h-8  m-3 px-3 text-base text-[var(--article-content-tags-bgcolor-hover-font)] bg-[var(--article-content-tags-bgcolor-hover)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 rounded-lg cursor-pointer'
                : ' h-8  m-3 px-3  text-base  rounded-lg bg-base-100 hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 cursor-pointer'
                }`}
              key={index}
              onClick={() => handleCategory(item.name)}
            >
              <span>{item.name}</span>
              <span>{item.count}</span>
            </p>
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
export default connect(null, mapDispatchToProps)(withRouter(CategorySwitch));
