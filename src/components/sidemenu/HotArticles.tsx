import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const HotArticles = (props: any) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    let hotUpdateData = props.data.sort((curr: any, prev: any) => {
      return prev.views - curr.views;
    });
    let newHotdata = hotUpdateData.slice(0, 6);
    setList(newHotdata);
  }, [props.data]);

  const handleLastUpdate = (id: any) => {
    props.history.push(`/rblog/article/detail/${id}`);
  };
  return (
    <div className="mb-5 rounded-2xl bg-base-100 pb-2 mx-auto text-lg  transition duration-500 ease-in-out  transform hover:-translate-y-0 hover:scale-105">
      <p
        className="py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1 "
        style={{ userSelect: 'none' }}
      >
        热门文章
      </p>
      {list.map((item: any) => {
        return (
          <div key={item._id}>
            <span
              className="inline-block mb-1 mt-2 px-2 mx-1 text-base  cursor-pointer line-clamp-1 overflow-hidden hover:font-medium hover:transition hover:duration-500"
              onClick={() => handleLastUpdate(item._id)}
            >
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(HotArticles);
