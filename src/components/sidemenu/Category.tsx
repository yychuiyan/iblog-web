import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
const Category = (props: any) => {
  const [list, setList] = useState<any>([]);
  useEffect(() => {
    let articleList = props.data;
    let newList = articleList.map((item: any) => {
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
    let newArticles = [];
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
    newArticles = arrObj;

    setList(newArticles);
  }, [props.data]);

  const handleCategory = (name: any) => {
    props.history.push(`/rblog/category?c=${name}`);
  };
  return (
    <div className="h-auto mb-5 pb-2 bg-base-100 rounded-2xl mx-auto text-lg transition duration-500 ease-in-out  transform  hover:scale-x-[104%] hover:scale-y-[102%]">
      <p
        className="py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
        分类信息
      </p>
      {list.map((item: any, index: any) => {
        return (
          <p
            className="flex justify-between items-center h-8 m-3 px-3 text-base bg-base-200 rounded-lg hover:bg-base-300 hover:transition hover:duration-500 cursor-pointer"
            key={index}
            onClick={() => handleCategory(item.name)}
          >
            <span>{item.name}</span>
            <span>
              {item.count}
              <span></span>
            </span>
          </p>
        );
      })}
    </div>
  );
};

export default withRouter(Category);
