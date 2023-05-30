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
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(8);
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
    >
      <p
        className="py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
        分类信息
      </p>
      <div className=' w-[310px] h-96 overflow-auto'>
        {categoryList.map((item: CategoryData, index: number) => {
          return (
            <p
              className={`flex justify-between items-center${item.name === c
                ? ' h-8  m-3 px-3 text-base bg-base-300 hover:bg-base-300 hover:transition hover:duration-500 rounded-lg cursor-pointer'
                : ' h-8  m-3 px-3  text-base  rounded-lg bg-base-100 hover:bg-base-300 hover:transition hover:duration-500 cursor-pointer'
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
